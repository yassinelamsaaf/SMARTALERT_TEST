import { 
  mockfindUserById, 
  mockupdateUser, 
  mockdeleteUser,
  mockgetUsers 
} from '../mockDATA/users';

/**
 * Deletes the current user's account
 * @returns {Promise<boolean>} true if account deletion successful
 * @throws {Object} Error object with message property on deletion failure
 */
export const deleteAccount = async () => {
  try {
    // Get current user from localStorage (simulating session)
    const currentUserId = localStorage.getItem('current-user-id');
    
    if (!currentUserId) {
      throw { message: 'No authenticated user found' };
    }
    
    // Verify user exists before deletion
    const user = mockfindUserById(currentUserId);
    if (!user) {
      throw { message: 'User not found' };
    }
    
    // Delete the user from mock database
    const success = mockdeleteUser(currentUserId);
    
    if (!success) {
      throw { message: 'Failed to delete user account' };
    }
    
    // Clear session data
    localStorage.removeItem('current-user-id');
    
    return true;
  } catch (error) {
    throw error.message ? error : { message: 'Account deletion failed' };
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
  try {
    // Get current user from localStorage (simulating session)
    const currentUserId = localStorage.getItem('current-user-id');
    
    if (!currentUserId) {
      throw { message: 'No authenticated user found' };
    }
    
    // Verify user exists before update
    const existingUser = mockfindUserById(currentUserId);
    if (!existingUser) {
      throw { message: 'User not found' };
    }
    
    // Validate email uniqueness if email is being updated
    if (userData.email && userData.email !== existingUser.email) {
      const users = mockgetUsers();
      const emailExists = users.some(user => 
        user.email === userData.email && user.id !== currentUserId
      );
      if (emailExists) {
        throw { message: 'Email address is already in use' };
      }
    }
    
    // Update the user in mock database
    const updatedUser = mockupdateUser(currentUserId, userData);
    
    if (!updatedUser) {
      throw { message: 'Failed to update user account' };
    }
    
    // Return user data without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error) {
    throw error.message ? error : { message: 'Account update failed' };
  }
};
