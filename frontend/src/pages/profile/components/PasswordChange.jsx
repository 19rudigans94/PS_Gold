import React from 'react';
import PasswordInput from './PasswordInput';

const PasswordChange = ({ formData, errors, onChange }) => {
  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-medium mb-4">Изменить пароль</h2>
      
      <div className="space-y-4">
        <PasswordInput
          id="currentPassword"
          name="currentPassword"
          label="Текущий пароль"
          value={formData.currentPassword}
          error={errors.currentPassword}
          onChange={onChange}
        />

        <PasswordInput
          id="newPassword"
          name="newPassword"
          label="Новый пароль"
          value={formData.newPassword}
          error={errors.newPassword}
          onChange={onChange}
        />

        <PasswordInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Подтвердите новый пароль"
          value={formData.confirmNewPassword}
          error={errors.confirmNewPassword}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PasswordChange;
