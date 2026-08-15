export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
export const isStrongPassword = (password) =>
  password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
