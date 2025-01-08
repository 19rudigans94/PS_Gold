import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        games: {
          include: {
            game: true
          }
        },
        payment: true
      }
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении заказов' 
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        games: {
          include: {
            game: true
          }
        },
        payment: true
      }
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Заказ не найден' 
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Ошибка при получении заказа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении заказа' 
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        games: {
          include: {
            game: true
          }
        },
        payment: true
      }
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Ошибка при получении заказов пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении заказов' 
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { games } = req.body;
    let totalAmount = 0;

    // Проверяем наличие игр и рассчитываем общую сумму
    const gameDetails = await Promise.all(
      games.map(async (item) => {
        const game = await prisma.game.findUnique({
          where: { id: item.gameId }
        });

        if (!game) {
          throw new Error(`Игра с ID ${item.gameId} не найдена`);
        }

        if (!game.inStock || game.availableCopies < item.quantity) {
          throw new Error(`Недостаточно копий игры ${game.title}`);
        }

        totalAmount += game.price * item.quantity;
        return { game, quantity: item.quantity };
      })
    );

    // Создаем заказ в транзакции
    const order = await prisma.$transaction(async (prisma) => {
      // Создаем заказ
      const newOrder = await prisma.order.create({
        data: {
          userId: req.user.id,
          totalAmount,
          status: 'pending',
          games: {
            create: gameDetails.map(({ game, quantity }) => ({
              gameId: game.id,
              quantity,
              price: game.price
            }))
          }
        },
        include: {
          games: {
            include: {
              game: true
            }
          }
        }
      });

      // Обновляем количество доступных копий
      await Promise.all(
        gameDetails.map(({ game, quantity }) =>
          prisma.game.update({
            where: { id: game.id },
            data: {
              availableCopies: {
                decrement: quantity
              }
            }
          })
        )
      );

      return newOrder;
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Ошибка при создании заказа' 
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        games: {
          include: {
            game: true
          }
        }
      }
    });

    // Если заказ отменен, возвращаем копии игр в наличие
    if (status === 'cancelled') {
      await Promise.all(
        order.games.map((item) =>
          prisma.game.update({
            where: { id: item.gameId },
            data: {
              availableCopies: {
                increment: item.quantity
              }
            }
          })
        )
      );
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Ошибка при обновлении статуса заказа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении статуса заказа' 
    });
  }
};
