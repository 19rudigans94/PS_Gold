export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email) return 'Email обязателен';
  if (!emailRegex.test(email)) return 'Некорректный email';
  return '';
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) return 'Пароль обязателен';
  if (password.length < minLength) {
    return `Пароль должен содержать минимум ${minLength} символов`;
  }
  return '';
};

export const validateName = (name, minLength = 2) => {
  if (!name.trim()) return 'Имя обязательно';
  if (name.length < minLength) {
    return `Имя должно содержать минимум ${minLength} символа`;
  }
  return '';
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (password !== confirmPassword) return 'Пароли не совпадают';
  return '';
};
