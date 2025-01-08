import React from 'react';
import ProfileInfo from './ProfileInfo';
import PasswordChange from './PasswordChange';

const ProfileForm = ({
  formData,
  errors,
  isLoading,
  isEditing,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ProfileInfo
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
      />

      {isEditing && (
        <>
          <PasswordChange
            formData={formData}
            errors={errors}
            onChange={onChange}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
