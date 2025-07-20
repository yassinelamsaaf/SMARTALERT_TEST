import React, { useState, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const AddPhoneForm = () => {
  const { lang } = useContext(LanguageContext);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Simulate sending code
  const handleSendCode = (e) => {
    e.preventDefault();
    // Only allow French mobile numbers: 06XXXXXXXX or 07XXXXXXXX
    if (!phone.match(/^(06|07)\d{8}$/)) {
      setError(t[lang].accountSettings.addPhone.errorFormat);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
      setCountdown(30);
      setSuccess(true);
    }, 1000);
  };

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Simulate code validation
  const handleValidateCode = (e) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      setError(t[lang].accountSettings.addPhone.errorCode);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCodeSuccess(true);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <form>
      <div className="mb-20">
        <div className="alert mb-15 text-15 warning-error">
          <strong>{t[lang].accountSettings.addPhone.instruction}</strong>
        </div>
        <div className="text-15 mb-10">
          {t[lang].accountSettings.addPhone.subInstruction}
        </div>
      </div>
      <div className="col-12 mb-20">
        <div className="form-input" style={{display:'flex', alignItems:'center', gap:12}}>
          <input
            id="phone-input"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            disabled={codeSent}
          />
          {!codeSent && (
            <label className="lh-1 text-16 text-light-1" htmlFor="phone-input">{t[lang].accountSettings.addPhone.label} <span style={{color:'#aaa', fontSize:13}}>{t[lang].accountSettings.addPhone.example}</span></label>
          )}
          <button
            className={`button h-60 px-24 py-5 mc-to-w-btn${(loading || (codeSent && countdown > 0) || !phone.match(/^(06|07)\d{8}$/)) ? ' disabled' : ''}`}
            style={{
              minWidth:180,
              fontWeight:600,
              paddingLeft:24,
              paddingRight:24,
              height:'60px',
              opacity: (loading || (codeSent && countdown > 0) || !phone.match(/^(06|07)\d{8}$/)) ? 0.6 : 1,
              cursor: (loading || (codeSent && countdown > 0) || !phone.match(/^(06|07)\d{8}$/)) ? 'not-allowed' : 'pointer'
            }}
            onClick={e => {
              if (codeSent && countdown === 0 && !loading && phone.match(/^(06|07)\d{8}$/)) {
                // Allow resend
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setCountdown(30);
                  setSuccess(true);
                }, 1000);
                return;
              }
              handleSendCode(e);
            }}
            disabled={loading || (codeSent && countdown > 0) || !phone.match(/^(06|07)\d{8}$/)}
            type="button"
          >
            {codeSent && countdown > 0
              ? t[lang].accountSettings.addPhone.resend.replace("{countdown}", countdown)
              : t[lang].accountSettings.addPhone.sendCode}
            <i className="icon-plus mr-10 ml-10" />
          </button>
        </div>
        {codeSent && (
          <span
            className="text-15 text-dark-3 mt-10"
            style={{fontWeight:500, marginLeft:2, cursor:'pointer', textDecoration:'underline', display:'inline-block'}}
            onClick={() => {
              setCodeSent(false);
              setVerificationCode("");
              setCodeSuccess(false);
              setError("");
            }}
          >
            {t[lang].accountSettings.addPhone.modify}
          </span>
        )}
      </div>
      {codeSent && (
        <div className="col-12 mb-20">
          <div className="form-input" style={{marginBottom:12}}>
            <label className="lh-1 text-16 text-light-1" htmlFor="code-input">{t[lang].accountSettings.addPhone.codeLabel}</label>
            <input
              id="code-input"
              type="text"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              required
              maxLength={6}
              style={{fontSize:16, padding:'8px 14px'}}
            />
          </div>
          <button
            className="button h-50 px-24 py-5 mc-to-w-btn"
            style={{minWidth:180, fontWeight:600}}
            onClick={handleValidateCode}
            disabled={loading || verificationCode.length !== 6 || codeSuccess}
            type="button"
          >
            {t[lang].accountSettings.addPhone.validate}
          </button>
          {codeSuccess && <div className="alert alert-success mt-2">{t[lang].accountSettings.addPhone.verified}</div>}
        </div>
      )}
      {error && <div className="alert alert-danger mt-2" style={{marginTop:12}}>{error}</div>}
    </form>
  );
};

export default AddPhoneForm;
