// Utility functions for input validation
export function isEmail(input) {
  return /^\S+@\S+\.\S+$/.test(input);
}

export function isPhone(input) {
  return /^(06|07)[0-9]{8}$/.test(input.replace(/\D/g, ''));
}
