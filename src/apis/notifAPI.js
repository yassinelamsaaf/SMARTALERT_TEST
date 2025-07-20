import { getToken } from '@/utils/auth';
import axios from 'axios';
import axios_instance from './axios';


/**
 * Fetch notifications from the API, parse notification and alert fields in message to JSON objects.
 * @returns {Promise<{
 * id: string,
 * label: string | null,
 * message: {
 *    notification: string,
 *    time: number,
 *    alert: string,
 * },
 * type: string | null,
 * sentAt: string,
 * alert: string | null,
 * announcements: string | null,
}[]>}
 */
export async function getNotifsApi() {
  const token = getToken();
if(!token) return []
  const response = await axios_instance.get('/api/currentNotifications?page=0&sort=sent_at,desc&size=20',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('all notifications::', response.data.map((noti)=>{
  //   return noti.message.alert;
  // }));
  return response.data;
  const notifications = response.data;

  // Map and parse notification.message.notification and notification.message.alert
  return notifications.map((notif) => {
    let parsedNotification = notif.message.notification;
    let parsedAlert = notif.message.alert;
    try {
      parsedNotification = JSON.parse(notif.message.notification);
    } catch (e) {}
    try {
      parsedAlert = JSON.parse(notif.message.alert);
    } catch (e) {}
    return {
      ...notif,
      message: {
        ...notif.message,
        notification: parsedNotification,
        alert: parsedAlert,
      },
    };
  });
}


/**
 * Store notifications in localStorage, deduplicated by payloadId (latest only), with unread status based on last seen time.
 * Output type and structure matches the documented return type.
 */
export async function setMyNotifs() {
  const notifications = await getNotifsApi();
  const SEVEN_DAYS = 604_800_000;
  if (!Array.isArray(notifications)) return;

  // Deduplicate by payloadId, keeping the latest (by message.time)
  const latestByPayload = {};
  for (const notif of notifications) {
    let notification, alert;
    try {
      notification = typeof notif.message.notification === 'string' ? JSON.parse(notif.message.notification) : notif.message.notification;
    } catch (e) {
      notification = { title: { ar: '', en: '', fr: '' }, body: { ar: '', en: '', fr: '' } };
    }
    try {
      alert = typeof notif.message.alert === 'string' ? JSON.parse(notif.message.alert) : notif.message.alert;
    } catch (e) {
      alert = { payloadId: undefined };
    }
    const payloadId = alert?.payloadId;
    const time = notif.message.time;
    if (!payloadId) continue;
    if (!latestByPayload[payloadId] || time > latestByPayload[payloadId].notif.message.time) {
      latestByPayload[payloadId] = { notif, notification, alert };
    }
  }

  // Get notifMessages (last seen times) from localStorage
  let notifMessages = localStorage.getItem("notifMessages");
  if (!notifMessages) notifMessages = {};
  else notifMessages = JSON.parse(notifMessages);

  // Build result array
  const result = [];
  for (const payloadId in latestByPayload) {
    const { notif, notification } = latestByPayload[payloadId];
    const time = notif.message.time;
    let unread = true;
    if (
      notifMessages[payloadId]?.time != null &&
      time <= notifMessages[payloadId]?.time
    ) {
      unread = false;
    }
    // Update notifMessages with the latest time
    notifMessages[payloadId] = { time };
    result.push({
      msg: {
        ar: {
          title: notification.title?.ar || '',
          body: notification.body?.ar || '',
        },
        fr: {
          title: notification.title?.fr || '',
          body: notification.body?.fr || '',
        }
      },
      unread,
    });
  }

  // Remove notifications older than 7 days
  const now = Date.now();
  for (const payloadId in notifMessages) {
    if (!notifMessages[payloadId]?.time || !(now - notifMessages[payloadId]?.time < SEVEN_DAYS)) {
      delete notifMessages[payloadId];
    }
  }

  // extract the notif from the localstorage, if the result contain a notification that is already in the local storage, set the unread to false
  const n = extractNotifs();
  const bodies = !n ? [] : n.map((res)=>{
    return res.msg.fr.body;
  })
  result.forEach((_n)=>{
    if(bodies.includes(_n.msg.fr.body)){
      _n.unread = false;
    } else {
      _n.unread = true;
    }
  })

  localStorage.setItem("notifMessages", JSON.stringify(notifMessages));
  localStorage.setItem("myNotifications", JSON.stringify(result));
}

/**
 * Fetch notifications from the API, parse notification and alert fields in message to JSON objects.
 * @returns {{
 *    msg: {
 *      ar: {
 *        title: string,
 *        body: string,
 *      },
 *      fr: {
 *        title: string,
 *        body: string,
 *      }
 *    },
 *    unread: boolean,
 *  }[]}
*/
export function extractNotifs() {
  return JSON.parse(localStorage.getItem("myNotifications"));
}