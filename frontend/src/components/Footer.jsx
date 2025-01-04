import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const { siteName, contactEmail, settings } = useSettings();
  
  const currentYear = new Date().getFullYear();

  console.log('Email:', settings.general.email);
  console.log('Support Email:', settings.general.supportEmail);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{siteName || 'Game Rental'}</h3>
            <p className="text-gray-400">
              Ваш надежный партнер в мире видеоигр
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-gray-400 hover:text-white">
                  Игры
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              {settings.general.phoneNumber && (
                <li>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{settings.general.phoneNumber}</span>
                  </div>
                </li>
              )}
              {settings.general.supportEmail && (
                <li>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{settings.general.supportEmail}</span>
                  </div>
                </li>
              )}
              {settings.general.address && (
                <li>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{settings.general.address}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {siteName || 'Game Rental'}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;