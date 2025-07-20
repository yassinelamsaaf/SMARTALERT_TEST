import axios_instance from './axios';

/**
 * Deletes the current user's account
 * @returns {Promise<boolean>} true if account deletion successful
 * @throws {Object} Error object with message property on deletion failure
 */
export const deleteAccount = async () => {
  try {
    await axios_instance.get('/api/account/delete');
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Account deletion failed' };
  }
};

/**
 * Updates the current user's account information
 * @param {Object} userData - User data to update
 * @param {string} [userData.firstName] - User's first name
 * @param {string} [userData.lastName] - User's last name
 * @param {string} [userData.email] - User's email address
 * @param {string} [userData.langKey] - User's language preference
 * @param {string} [userData.imageUrl] - User's profile image URL
 * @returns {Promise<{
 *   id: string,
 *   login: string,
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   imageUrl: string,
 *   activated: boolean,
 *   langKey: string,
 *   createdBy: string,
 *   createdDate: string,
 *   lastModifiedBy: string,
 *   lastModifiedDate: string,
 *   authorities: Array<string>
 * }>} Updated user account information
 * @throws {Object} Error object with message property on update failure
 */
export const updateAccount = async (userData) => {
  const res = await axios_instance.post('/api/account', userData);
  return res.data;
};
