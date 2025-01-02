import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import Modal from './Modal';

function AuthCartModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавление в корзину"
    >
      <div className="p-4">
        <div className="space-y-6">
          <p className="text-gray-600">
            Для добавления товаров в корзину необходимо войти в систему
          </p>
          
          <div className="space-y-4">
            <Link
              to="/login"
              className="flex items-center justify-center w-full btn btn-primary"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Войти
            </Link>
            
            <Link
              to="/register"
              className="flex items-center justify-center w-full btn btn-secondary"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AuthCartModal;