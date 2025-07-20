/**
 * Registers a new user account with phone number
 * @param {Object} user - User registration data
 * @param {string} user.login - Phone number (used as login)
 * @param {string} user.phone - Phone number
 * @param {string} user.password - Password
 * @param {string} user.langKey - Language preference (e.g., 'en', 'fr', 'ar')
 * @returns {Promise<boolean>} true if registration successful
 * @throws {Object} Error object with message property on registration failure
 */
export const registerWithPhone = async (user) => {
  try {
    await axios_instance.post('/api/register/phone', user);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};
import axios_instance from './axios';

/**
 * Authenticates a user with username and password
 * @param {string} username - The user's username/email
 * @param {string} password - The user's password
 * @param {boolean} rememberMe - Whether to remember the user session
 * @returns {Promise<{
 *   id_token: string,
 *   token_type: string,
 *   expires_in: number,
 *   scope: string,
 *   refresh_token: string
 * }>} Authentication response with JWT token and metadata
 * @throws {Object} Error object with message property on authentication failure
 */
export const login = async (username, password, rememberMe = false) => {
  try {
    const response = await axios_instance.post('/api/authenticate', {
      username,
      password,
      rememberMe,
      expoToken: "" // required by backend, even if empty for web
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Activates a user account using phone activation code
 * @param {string} phone - The user's phone number (not used in request, for reference)
 * @param {string} code - The activation code sent to the user's phone
 * @returns {Promise<boolean>} true if activation successful
 * @throws {Object} Error object with message property on activation failure
 */
export const activatePhone = async (phone, code) => {
  try {
    await axios_instance.get(`/api/activate?key=${encodeURIComponent(code)}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Activation failed' };
  }
};

/**
 * Resends activation code to user's phone
 * @param {string} phone - The phone number to resend activation code to
 * @returns {Promise<boolean>} true if code resend successful
 * @throws {Object} Error object with message property on resend failure
 */
export const resendPhoneActivationCode = async (phone) => {
  try {
    await axios_instance.get(`/api/account/phone-refresh-validation-code?phone=${encodeURIComponent(phone)}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend code' };
  }
};
/**
 * Registers a new user account
 * @param {Object} user - User registration data
 * @param {string} user.login - Username/email
 * @param {string} user.email - Email address
 * @param {string} user.password - Password
 * @param {string} user.langKey - Language preference (e.g., 'en', 'fr', 'ar')
 * @returns {Promise<boolean>} true if registration successful
 * @throws {Object} Error object with message property on registration failure
 */
export const register = async (user) => {
  try {
    await axios_instance.post('/api/register', user);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Activates a user account using the activation key
 * @param {string} key - The activation key sent to user's email
 * @returns {Promise<boolean>} true if activation successful
 * @throws {Object} Error object with message property on activation failure
 */
export const activateAccount = async (key) => {
  try {
    await axios_instance.get(`/api/activate?key=${key}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Activation failed' };
  }
};

/**
 * Resends activation code to user's email
 * @param {string} email - The email address to resend activation code to
 * @returns {Promise<boolean>} true if code resend successful
 * @throws {Object} Error object with message property on resend failure
 */
export const resendActivationCode = async (email) => {
  try {
    await axios_instance.get(`/api/account/email-refresh-validation-code?email=${email}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend code' };
  }
};

/**
 * Authenticates user using Google OAuth token
 * @param {string} token - Google OAuth token
 * @param {string} langKey - Language preference (e.g., 'en', 'fr', 'ar')
 * @returns {Promise<{
 *   id_token: string,
 *   token_type: string,
 *   expires_in: number,
 *   scope: string,
 *   refresh_token: string
 * }>} Authentication response with JWT token and metadata
 * @throws {Object} Error object with message property on authentication failure
 */
export const loginWithGoogle = async (token, langKey) => {
  try {
    const response = await axios_instance.post('/api/google', {
      token,
      expoToken: null,
      langKey,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Google login failed' };
  }
};

/**
 * Authenticates user using Facebook OAuth token
 * @param {string} token - Facebook OAuth token
 * @param {string} langKey - Language preference (e.g., 'en', 'fr', 'ar')
 * @returns {Promise<{
 *   id_token: string,
 *   token_type: string,
 *   expires_in: number,
 *   scope: string,
 *   refresh_token: string
 * }>} Authentication response with JWT token and metadata
 * @throws {Object} Error object with message property on authentication failure
 */
export const loginWithFacebook = async (token, langKey) => {
  try {
    const response = await axios_instance.post('/api/facebook', {
      token,
      expoToken: null,
      langKey,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Facebook login failed' };
  }
};