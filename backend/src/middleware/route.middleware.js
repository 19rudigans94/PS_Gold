import { Router } from 'express';
import { protect, admin } from './auth.middleware.js';

export class RouteBuilder {
  constructor() {
    this.router = Router();
  }

  // Публичный маршрут
  public(method, path, ...handlers) {
    this.router[method](path, ...handlers);
    return this;
  }

  // Защищенный маршрут (требует авторизации)
  protected(method, path, ...handlers) {
    this.router[method](path, protect, ...handlers);
    return this;
  }

  // Административный маршрут (требует прав админа)
  adminOnly(method, path, ...handlers) {
    this.router[method](path, protect, admin, ...handlers);
    return this;
  }

  // Добавление промежуточного ПО для всех маршрутов
  useMiddleware(...middleware) {
    this.router.use(...middleware);
    return this;
  }

  // Получение построенного маршрутизатора
  build() {
    return this.router;
  }
}

// Создание нового построителя маршрутов
export const createRoutes = () => new RouteBuilder();
