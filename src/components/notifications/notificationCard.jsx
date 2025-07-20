import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../../i18n/LanguageProvider';
import { extractNotifs, setMyNotifs } from '../../apis/notifAPI';
import t from '@/i18n/t';

export default function NotificationCard() {
  const { lang } = useContext(LanguageContext);
  const [ notifications, setNotifications ] = useState(extractNotifs());
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    setLoading(true);
    setMyNotifs()
      .then(() => {
        const notif = extractNotifs();
        setNotifications(notif);
        console.log("fetched all notifications::", notifications, extractNotifs());
        setLoading(false);
      })
      .catch((err) => {
        // handle error, e.g., set an error state
        console.error('Failed to fetch notifications', err);
        setLoading(false);
      });
  }, []); 


  return (
    <div
      className="notification-container bg-white border rounded-3 shadow-sm"
      style={{ width: '300px', maxHeight:'400px', overflow: 'hidden', zIndex: 1000 }}
    >
      
      <div className="notification-header px-3 py-2 border-bottom bg-light fw-bold" style={{ fontSize: '14px', justifyContent: 'center'}}>
        {t[lang].notifications.all}
       
      </div>
      <div
        className="notification-list d-flex flex-column gap-2 px-2 py-2"
        style={{ maxHeight: '320px', overflowY: 'auto' }}
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification, idx) => (
            <div
              key={idx}
              className={`border rounded-2 p-2 d-flex flex-column${notification.unread ? ' bg-warning bg-opacity-25' : ' bg-white'}`}
              style={{ cursor: 'pointer', fontSize: '13px' }}
            >
              <div className={`fw-bold mb-1${notification.unread ? '' : ' text-secondary'}`}>
                {notification.msg[lang]?.title || notification.msg.fr.title}
                {notification.unread && (
                  <span
                    className="ms-2 align-middle"
                    style={{ display: 'inline-block', width: '7px', height: '7px', backgroundColor: '#ffc107', borderRadius: '50%' }}
                    title="Unread"
                  />
                )}
              </div>
              {notification.msg[lang]?.body && (
                <div className="text-muted small" style={{ lineHeight: '1.3' }}>
                  {notification.msg[lang].body}
                </div>
              )}
            </div>
          ))
        ) : (
          loading ? (
            <div className="text-center text-muted py-3 small">{t[lang].notifications.loading}</div>
          ) : (
          <div className="text-center text-muted py-3 small">
            {t[lang].notifications.noNotification}
          </div>
        ))}
      </div>
      
      <div className="notification-footer px-3 py-2 border-top bg-light">
          
      </div>
      
    </div>
  );
}
