import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DigitalGames = () => {
    const [gameKeys, setGameKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGameKeys();
    }, []);

    const fetchGameKeys = async () => {
        try {
            const response = await axios.get('/api/game-keys/my-keys');
            setGameKeys(response.data);
        } catch (error) {
            toast.error('Ошибка при загрузке цифровых копий');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendKey = async (keyId) => {
        try {
            await axios.post(`/api/game-keys/resend/${keyId}`);
            toast.success('Данные отправлены на вашу почту');
        } catch (error) {
            toast.error('Ошибка при отправке данных');
            console.error(error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Мои цифровые копии</h2>
            {gameKeys.length === 0 ? (
                <p className="text-gray-600">У вас пока нет купленных цифровых копий игр</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {gameKeys.map((key) => (
                        <div key={key._id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center space-x-4">
                                {key.game.imageUrl && (
                                    <img 
                                        src={key.game.imageUrl} 
                                        alt={key.game.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold">{key.game.title}</h3>
                                    <p className="text-sm text-gray-600">Логин: {key.login}</p>
                                    <button
                                        onClick={() => handleResendKey(key._id)}
                                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Отправить данные на почту
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DigitalGames;
