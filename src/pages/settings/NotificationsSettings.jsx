import React, { useState } from 'react';
import Switch from '@/components/common/Switch';
import { pushNotification } from '@/apis/notificationsParametersApi';

const NotificationsSettings = ({ onClose }) => {
  const [phoneEnabled, setPhoneEnabled] = useState(() => {
    const stored = localStorage.getItem('notifications_phone');
    return stored === null ? true : stored === 'true';
  });
  const [gmailEnabled, setGmailEnabled] = useState(() => {
    const stored = localStorage.getItem('notifications_gmail');
    return stored === null ? true : stored === 'true';
  });
  const [error, setError] = useState("");


  const handleConfirm = () => {
    localStorage.setItem('notifications_phone', phoneEnabled);
    localStorage.setItem('notifications_gmail', gmailEnabled);

    pushNotification({
        pushNotif: phoneEnabled,      // show the phone switch only if validated
        emailNotif: gmailEnabled                 // always show email switch
    }).then((done)=>{
        if(done) onClose();
        else {
            setError('Failed to save notification settings');
            setTimeout(() => setError(''), 2000);
            return;
        }
    });

    
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
      <div className="bg-white shadow-4 rounded-4 px-5 py-3" style={{ minWidth: 320, maxWidth: 420 }}>
        <h4 className="mb-3 text-orange">Notifications</h4>
        <div className="mb-2 d-flex align-items-center justify-content-between">
          <span>Phone Notifications</span>
          <Switch checked={phoneEnabled} onChange={() => setPhoneEnabled(v => !v)} />
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span>Gmail Notifications</span>
          <Switch checked={gmailEnabled} onChange={() => setGmailEnabled(v => !v)} />
        </div>
        <button className="btn bg-orange text-white w-100" onClick={handleConfirm}>
          Confirm
        </button>
        {error && <div className="text-danger mt-2 small">{error}</div>}
      </div>
    </div>
  );
};

export default NotificationsSettings; 