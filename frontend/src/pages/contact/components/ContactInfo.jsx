import React from 'react';

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Наш адрес</h3>
        <p className="text-gray-600">
          ул. Примерная, д. 123<br />
          г. Москва, 123456
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Контакты</h3>
        <p className="text-gray-600">
          Email: support@gamegold.com<br />
          Телефон: +7 (999) 123-45-67
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
