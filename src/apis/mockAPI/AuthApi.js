import { 
  mockauthenticateUser, 
  mockauthenticateWithGoogle, 
  mockauthenticateWithFacebook,
  mockcreateUser,
  mockupdateUser,
  mockfindUserByEmail,
  getMockAuthResponse
} from '../mockDATA/users';

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
    const authResult = mockauthenticateUser(username, password);
    
    if (!authResult) {
      throw { message: 'Invalid credentials or account not activated' };
    }
    
    // Store current user ID in localStorage (simulating session)
    localStorage.setItem('current-user-id', authResult.user.id);
    
    // Return auth response in the expected format
    return getMockAuthResponse(authResult.user, authResult.token);

    const response = await axios_instance.post('/api/authenticate', {
      username,
      password,
      rememberMe,
      expoToken: "" // required by backend, even if empty for web
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.message ? error : { message: 'Login failed' };
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
    // Check if user already exists
    const existingUser = mockfindUserByEmail(user.email);
    if (existingUser) {
      throw { message: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser = mockcreateUser({
      login: user.login,
      email: user.email,
      password: user.password,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      langKey: user.langKey || 'en',
    });
    
    return true;

    await axios_instance.post('/api/register', user);
    return true
  } catch (error) {
    throw error.message ? error : { message: 'Registration failed' };
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

    // In mock implementation, we'll simulate finding user by a simple key
    // In real implementation, this would be a proper activation key
    const users = JSON.parse(localStorage.getItem("mock-users-db") || "[]");
    const userToActivate = users.find(user => !user.activated);
    
    if (!userToActivate) {
      throw { message: 'Invalid activation key or user already activated' };
    }
    
    // Activate the user
    mockupdateUser(userToActivate.id, { activated: true });
    
    return true;
  } catch (error) {
    throw error.message ? error : { message: 'Activation failed' };
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const user = mockfindUserByEmail(email);
    
    if (!user) {
      throw { message: 'User not found' };
    }
    
    if (user.activated) {
      throw { message: 'User account is already activated' };
    }
    
    // In mock implementation, we just simulate success
    // In real implementation, this would send an email
    console.log(`Mock: Activation code resent to ${email}`);
    
    return true;
  } catch (error) {
    throw error.message ? error : { message: 'Failed to resend code' };
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const authResult = mockauthenticateWithGoogle(token, langKey);
    
    if (!authResult) {
      throw { message: 'Google authentication failed' };
    }
    
    // Store current user ID in localStorage (simulating session)
    localStorage.setItem('current-user-id', authResult.user.id);
    
    // Return auth response in the expected format
    return getMockAuthResponse(authResult.user, authResult.token);
    const response = await axios_instance.post('/api/google', {
      token,
      expoToken: null,
      langKey,
    });
    return response.data;
  } catch (error) {
    throw error.message ? error : { message: 'Google login failed' };
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const authResult = mockauthenticateWithFacebook(token, langKey);
    
    if (!authResult) {
      throw { message: 'Facebook authentication failed' };
    }
    
    // Store current user ID in localStorage (simulating session)
    localStorage.setItem('current-user-id', authResult.user.id);
    
    // Return auth response in the expected format
    return getMockAuthResponse(authResult.user, authResult.token);
    const response = await axios_instance.post('/api/facebook', {
      token,
      expoToken: null,
      langKey,
    });
    return response.data;
  } catch (error) {
    throw error.message ? error : { message: 'Facebook login failed' };
  }
};