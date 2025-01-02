import React from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';

function FormInput({
  name,
  type = 'text',
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  showPasswordToggle = false,
  onPasswordToggle,
}) {
  const baseInputClass = "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";
  const errorInputClass = "border-red-300 focus:border-red-500 focus:ring-red-500";

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`${baseInputClass} ${error ? errorInputClass : ''} ${
            showPasswordToggle ? 'pr-10' : ''
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onPasswordToggle}
          >
            {type === 'password' ? (
              <Eye className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  showPasswordToggle: PropTypes.bool,
  onPasswordToggle: PropTypes.func,
};

FormInput.defaultProps = {
  type: 'text',
  required: false,
  showPasswordToggle: false,
  placeholder: '',
};

export default FormInput;
