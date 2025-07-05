import { mockfindUserById } from '../mockDATA/users';

/**
 * Retrieves the current authenticated user's information
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
 * }>} Current user's account information
 * @throws {Object} Error object with message property on API failure
 */
export const getCurrentUser = async () => {
  try {
    // Get current user from localStorage (simulating session)
    const currentUserId = localStorage.getItem('current-user-id');

    if (!currentUserId) {
      throw { message: 'No authenticated user found' };
    }

    const user = mockfindUserById(currentUserId);

    if (!user) {
      throw { message: 'User not found' };
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error.message ? error : { message: 'Failed to get current user' };
  }
  const res = await axios_instance.get('/api/account');
  // console.log("Current user data:", res.data);
  return res.data;
};
