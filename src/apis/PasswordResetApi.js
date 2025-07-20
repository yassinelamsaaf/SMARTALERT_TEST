import axios_instance from './axios';

import { isEmail, isPhone } from "@/utils/validation";

// Send reset code (email or phone)
export const sendResetCode = async (login) => {
  let url;
  if (isEmail(login)) {
    url = `/api/account/reset-password/init/mail/${encodeURIComponent(login)}`;
  } else if (isPhone(login)) {
    // Convert 06/07 to 2126/2127 for backend
    let phone = login.replace(/\D/g, '').replace(/^0/, '212');
    url = `/api/account/reset-password/init/phone/${phone}`;
  } else {
    throw { message: 'Format email ou téléphone invalide.' };
  }
  try {
    await axios_instance.post(url);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'envoi du code.' };
  }
};

// Reset password with code
export const resetPassword = async (code, newPassword) => {
  try {
    await axios_instance.post('/api/account/reset-password/finish', {
      key: code,
      newPassword,
    });
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors du changement de mot de passe.' };
  }
};
