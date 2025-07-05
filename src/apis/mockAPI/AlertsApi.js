import { getToken } from '@/utils/auth';
import axios_instance from '../axios';
import { mockdeleteAlerts, mockgetAlerts } from '../mockDATA/alerts';


const PAGE_SIZE = 3;
const CACHE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
let lastCacheUsage = Date.now();

/**
 * Filters and paginates alerts based on search input and page number
 * @param {Array} alerts - Array of alert objects
 * @param {string} searchInput - Search term to filter alerts by label
 * @param {number} page - Page number for pagination
 * @returns {{
 *   alerts: Array<{
 *     id: string,
 *     label: string,
 *     activated: boolean,
 *     color: string,
 *     createdAt: string,
 *     updatedAt: string
 *   }>,
 *   totalPages: number
 * }} Filtered alerts and total pages count
 */
function filterAndPaginate(alerts, searchInput, page) {
  // return {
  //   alerts,
  //   totalPages
  // };
  console.log({page})
  let filtered = alerts;
  if (searchInput) {
    const search = searchInput.toLowerCase();
    filtered = filtered.filter(alert =>
      typeof alert.label === 'string' && alert.label.toLowerCase().includes(search)
    );
  }
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  console.log({totalPages})
  return {
    alerts: filtered.slice(start, end),
    // alerts,
    totalPages
  };
}

/**
 * Retrieves user's current alerts with pagination and search functionality
 * @param {number} page - Page number (default: 1)
 * @param {string} searchInput - Search term to filter alerts (default: '')
 * @param {Array} CAlerts - Cached alerts array
 * @param {Function} setCAlerts - Function to update cached alerts
 * @returns {Promise<{
 *   alerts: Array<{
 *     id: string,
 *     label: string,
 *     activated: boolean,
 *     color: string,
 *     createdAt: string,
 *     updatedAt: string
 *   }>,
 *   totalPages: number
 * }>} Paginated alerts and total pages count
 * @throws {Object} Error object with message property on API failure
 */
export const getAlertsAPI = async (
  page = 1,
  searchInput = '',
  CAlerts = [],
  setCAlerts = () => {}
) => {
  return {alerts: mockgetAlerts(), totalPages: 3};
  try {
    const now = Date.now();
    // If cache hasn't been used for CACHE_TIMEOUT_MS, reset it
    if (CAlerts.length > 0 && now - lastCacheUsage > CACHE_TIMEOUT_MS) {
      setCAlerts([]);
      CAlerts = [];
    }
    lastCacheUsage = now;

    
    if (CAlerts.length === 0) {
      const token = getToken();
      const response = await axios_instance.get('/api/currentAlerts', {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
      setCAlerts(response.data);
      return filterAndPaginate(response.data, searchInput, page);
    } else {
      return filterAndPaginate(CAlerts, searchInput, page);
    }
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Retrieves detailed information for a specific alert
 * @param {string} alertId - The ID of the alert to retrieve
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<{
 *   id: string,
 *   label: string,
 *   activated: boolean,
 *   color: string,
 *   product: {
 *     id: string,
 *     name: string
 *   },
 *   searches: Array<{
 *     label: string,
 *     key: string,
 *     valeur: any,
 *     valeurObject: any,
 *     criteria: { id: string }
 *   }>,
 *   city?: { id: string, name: string },
 *   secteur?: { id: string, name: string },
 *   sources?: Array<{ id: string, name: string }>,
 *   createdAt: string,
 *   updatedAt: string
 * }>} Detailed alert information
 * @throws {Object} Error object on API failure
 */
export async function getAlertInfo(alertId, lang) {

  return mockgetAlerts().find(alert => alert.id == alertId)
  console.log({alertId})
    
    const token = getToken();
    return axios_instance
    .get(
      `/api/payloads/${alertId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      let data = response.data;
      console.log('alert info:::', data);

      return data;
    }).catch(err => {throw err});
}

/**
 * Deletes a specific alert
 * @param {string} alertId - The ID of the alert to delete
 * @returns {Promise<{
 *   deleting: boolean,
 *   deleteDialog: boolean
 * }>} Deletion status object
 */
export async function deleteAlert(
  alertId, //: string
) {
    return mockdeleteAlerts(alertId);
    const token = getToken();
    return axios_instance
        .delete(
        `/api/alerts/${alertId}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        )
    .then(async () => {
      let res = {
        deleting: true,
        deleteDialog: true,
      };
      return res;
    })
    .catch(() => {
      let err = {
        deleting: false,
        deleteDialog: false,
      };
      return err;
    });
}

// /**
//  * Deletes all alerts for the current user
//  * @returns {Promise<{
//  *   deleting: boolean,
//  *   deleteDialog: boolean
//  * }>} Deletion status object
//  */
// export async function deleteAllAlerts() {
//     const token = getToken();
//   // console.log(token)
//   return axios_instance
//     .delete(
//       `/api/alerts/all`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then(async () => {
      
//       let res = {
//         deleting: true,
//         deleteDialog: true,
//       };
//       return res;
//     })
//     .catch(() => {
//       let res = {
//         deleting: false,
//         deleteDialog: false,
//       };
//       return res;
//     });
// }

// /**
//  * Updates the activation status of an alert
//  * @param {string} alertId - The ID of the alert to update
//  * @param {boolean} activated - The new activation status
//  * @returns {Promise<{
//  *   id: string,
//  *   label: string,
//  *   activated: boolean,
//  *   color: string,
//  *   createdAt: string,
//  *   updatedAt: string
//  * }>} Updated alert object
//  * @throws {Object} Error object on API failure
//  */
// export async function updateAlertActivation(alertId, activated) {
//     const token = getToken();
  
//   return axios_instance
//     .post(
//       `/api/alerts/update-activated/${alertId}`,
//       {
//         id: alertId,
//         activated
//       }
//       , {
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((alert) => {
//       return alert.data;
//     })
//     .catch((err) => {
//       console.log(err)
//     });

// }

