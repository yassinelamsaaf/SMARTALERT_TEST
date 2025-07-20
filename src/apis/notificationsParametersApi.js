import { getToken } from "@/utils/auth";
import axios_instance from "./axios";


/**
 * Sends the user's notification preferences to the backend API.
 *
 * @param {{
 * [key: string]: [boolean, boolean];
 * }} switches - An object where each key is a user identifier and the value is an array of two booleans: [phoneEnabled, gmailEnabled].
 * @returns {Promise<boolean>} Resolves to true if the request succeeds, false otherwise.
 */
export async function pushNotification(switches) {
    const token = getToken();
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return axios_instance
      .post(
        `/api/notification`,
        switches,
        headers
      )
      .then(async () => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
  