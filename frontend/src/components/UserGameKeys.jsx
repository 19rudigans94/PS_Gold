import React, { useState, useEffect } from 'react';
import { getUserGameKeys, resendKeyData } from '../services/gameKeyService';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

function UserGameKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const data = await getUserGameKeys();
      setKeys(data);
    } catch (error) {
      toast.error('Ошибка при загрузке ключей');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (keyId) => {
    setShowPasswords(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleResendKey = async (keyId) => {
    try {
      await resendKeyData(keyId);
      toast.success('Данные для доступа отправлены на ваш email');
    } catch (error) {
      toast.error('Ошибка при отправке данных');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!Array.isArray(keys) || keys.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">У вас пока нет цифровых ключей</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Мои цифровые ключи
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {keys.map((key) => (
            <li key={key.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {key.game.title}
                  </h4>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">
                      Логин: {key.login}
                    </p>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-gray-600">
                        Пароль: {showPasswords[key.id] ? key.password : '••••••••'}
                      </p>
                      <button
                        onClick={() => togglePasswordVisibility(key.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords[key.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleResendKey(key.id)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Отправить на email
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserGameKeys;
