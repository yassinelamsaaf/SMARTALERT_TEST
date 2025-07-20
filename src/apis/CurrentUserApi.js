import axios_instance from './axios';

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
  const res = await axios_instance.get('/api/account');
  // console.log("Current user data:", res.data);
  return res.data;
};
