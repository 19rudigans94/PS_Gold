import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

function Button({
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'md',
}) {
  const baseClass = "relative inline-flex justify-center items-center border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = [
    baseClass,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <>
          {Icon && (
            <span className="mr-2">
              {typeof Icon === 'function' ? <Icon className="h-5 w-5" /> : Icon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  className: '',
  variant: 'primary',
  fullWidth: false,
  size: 'md',
};

export default Button;
