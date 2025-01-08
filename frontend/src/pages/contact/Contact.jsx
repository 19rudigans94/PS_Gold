import React from 'react';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import { useContact } from './hooks/useContact';

const Contact = () => {
  const { formData, handleChange, handleSubmit } = useContact();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <ContactInfo />
        <ContactForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

    </div>
  );
};

export default Contact;
