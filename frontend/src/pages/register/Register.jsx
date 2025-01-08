import React from 'react';
import RegisterForm from './components/RegisterForm';
import RegisterHeader from './components/RegisterHeader';
import { useRegister } from './hooks/useRegister';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const Register = () => {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useRegister();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegisterHeader />
        <RegisterForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
