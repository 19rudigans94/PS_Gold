import React from 'react';
import ProfileForm from './components/ProfileForm';
import { useProfile } from './hooks/useProfile';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const Profile = () => {
  const {
    formData,
    errors,
    isLoading,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit
  } = useProfile();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Профиль</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isEditing ? 'Отменить' : 'Редактировать'}
          </button>
        </div>

        <ProfileForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          isEditing={isEditing}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Profile;
