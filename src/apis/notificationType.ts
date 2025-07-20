// TypeScript type for notification object

export interface NotificationMessage {
  notification: JSON<{
    title: {ar: string, en: string, fr: string},
    body: {ar: string, en: string, fr: string},
}>; // JSON string with title/body in multiple languages
  time: number;
  alert: JSON<{
    payloadId: string,
    newsSize: number,
    id: string,
    activated: boolean  
  }>; // JSON string with payloadId
}

export interface Notification {
  id: string;
  label: string | null;
  message: NotificationMessage;
  type: string | null;
  sentAt: string;
  alert: string | null;
  announcements: string | null;
}

type JSON<T> = string