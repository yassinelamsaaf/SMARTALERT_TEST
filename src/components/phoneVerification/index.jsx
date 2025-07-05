import { useState, useRef, useEffect, useContext, useCallback } from "react";
import "../../../public/sass/components/PhoneVerification.scss";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1/index";
import Footer2 from "@/components/footer/footer-2";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const metadata = {
  title: "Phone Verification || SMARTALERT",
  description: "SMARTALERT Phone Verification",
};

const VERIFICATION_STEPS = {
  PHONE_INPUT: 1,
  CODE_VERIFICATION: 2,
  SUCCESS: 3,
};

const CODE_LENGTH = 6;

const PhoneVerification = () => {
  const [step, setStep] = useState(VERIFICATION_STEPS.PHONE_INPUT);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const { lang } = useContext(LanguageContext);

  const codeInputRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    codeInputRefs.current = codeInputRefs.current.slice(0, CODE_LENGTH);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendTimer]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{7,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ""));
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError(t[lang].PhoneVerification.error_empty);
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError(t[lang].PhoneVerification.error_invalid);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(VERIFICATION_STEPS.CODE_VERIFICATION);
      setResendTimer(60);
      setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 100);
    } catch {
      setError(t[lang].PhoneVerification.error_send_code);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = useCallback(
    (value, index) => {
      if (!/^[0-9]?$/.test(value)) return;

      setError("");
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < CODE_LENGTH - 1) {
        codeInputRefs.current[index + 1]?.focus();
      }

      if (value && newCode.every((digit) => digit !== "")) {
        handleCodeSubmit(null, newCode);
      }
    },
    [code]
  );

  const handleCodeKeyDown = useCallback(
    (e, index) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        codeInputRefs.current[index - 1]?.focus();
      }

      if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        navigator.clipboard.readText().then((text) => {
          const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
          const newCode = [...code];
          for (let i = 0; i < digits.length; i++) {
            newCode[i] = digits[i];
          }
          setCode(newCode);
          const nextIndex = Math.min(digits.length, CODE_LENGTH - 1);
          codeInputRefs.current[nextIndex]?.focus();

          if (digits.length === CODE_LENGTH) {
            handleCodeSubmit(null, newCode);
          }
        });
      }
    },
    [code]
  );

  const handleCodeSubmit = async (e, codeToVerify = code) => {
    if (e) e.preventDefault();

    const codeString = codeToVerify.join("");
    if (codeString.length !== CODE_LENGTH) {
      setError(t[lang].PhoneVerification.error_code_empty);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(VERIFICATION_STEPS.SUCCESS);
    } catch {
      setError(t[lang].PhoneVerification.error_code_invalid);
      setCode(new Array(CODE_LENGTH).fill(""));
      codeInputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendTimer(60);
      setCode(new Array(CODE_LENGTH).fill(""));
    } catch {
      setError(t[lang].PhoneVerification.error_resend);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep(VERIFICATION_STEPS.PHONE_INPUT);
    setCode(new Array(CODE_LENGTH).fill(""));
    setError("");
    setResendTimer(0);
  };

  const renderPhoneStep = () => (
    <>
      <div className="phone-verification__title">
        {t[lang].PhoneVerification.title}
      </div>
      <form onSubmit={handlePhoneSubmit} className="phone-verification__form">
        <input
          type="tel"
          className={`phone-verification__input ${
            error ? "phone-verification__input--error" : ""
          }`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t[lang].PhoneVerification.placeholder}
          disabled={isLoading}
          autoComplete="tel"
          required
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        {error && <div className="phone-verification__error">{error}</div>}
        <button
          type="submit"
          className="phone-verification__button"
          disabled={isLoading || !phone.trim()}
        >
          {isLoading
            ? t[lang].PhoneVerification.sending
            : t[lang].PhoneVerification.add}
        </button>
      </form>
    </>
  );

  const renderCodeStep = () => (
    <>
      <div className="phone-verification__title">
        {t[lang].PhoneVerification.code_sent_title}
      </div>
      <div className="phone-verification__subtitle">
        {typeof t[lang].PhoneVerification.code_sent_subtitle === "function"
          ? t[lang].PhoneVerification.code_sent_subtitle(phone)
          : t[lang].PhoneVerification.code_sent_subtitle}
      </div>
      <form onSubmit={handleCodeSubmit} className="phone-verification__form">
        <div className="phone-verification__code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (codeInputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`phone-verification__code-input ${
                error ? "phone-verification__code-input--error" : ""
              }`}
              value={digit}
              onChange={(e) => handleCodeChange(e.target.value, index)}
              onKeyDown={(e) => handleCodeKeyDown(e, index)}
              disabled={isLoading}
              autoComplete="one-time-code"
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
          ))}
        </div>
        {error && <div className="phone-verification__error">{error}</div>}
        <div className="phone-verification__actions phone-verification__actions--horizontal">
          <button
            type="submit"
            className="phone-verification__button"
            disabled={isLoading || code.some((d) => !d)}
          >
            {isLoading
              ? t[lang].PhoneVerification.verifying
              : t[lang].PhoneVerification.verify}
          </button>
          <div className="phone-verification__secondary-actions">
            <div className="phone-verification__resend">
              {resendTimer > 0 ? (
                <span className="phone-verification__timer">
                  {typeof t[lang].PhoneVerification.resend_wait === "function"
                    ? t[lang].PhoneVerification.resend_wait(resendTimer)
                    : t[lang].PhoneVerification.resend_wait}
                </span>
              ) : (
                <button
                  type="button"
                  className="phone-verification__link"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  {t[lang].PhoneVerification.resend}
                </button>
              )}
            </div>
            <button
              type="button"
              className="phone-verification__link"
              onClick={handleBackToPhone}
              disabled={isLoading}
            >
              {t[lang].PhoneVerification.edit_number}
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <div className="phone-verification__title phone-verification__title--success">
        {t[lang].PhoneVerification.success_title}
      </div>
      <div className="phone-verification__subtitle">
        {typeof t[lang].PhoneVerification.success_subtitle === "function"
          ? t[lang].PhoneVerification.success_subtitle(phone)
          : t[lang].PhoneVerification.success_subtitle}
      </div>
      <button
        className="phone-verification__button"
        onClick={() => {
          console.log("Phone verification completed");
        }}
      >
        {t[lang].PhoneVerification.continue}
      </button>
    </>
  );

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="header-margin"></div>
      <div
        className={`phone-verification${
          lang === "ar" ? " phone-verification--rtl" : ""
        }`}
      >
        <div className="phone-verification__card">
          <div className="phone-verification__header" />
          <div className="phone-verification__body">
            <img
              src="./img/Annonces/phone-illustration.svg"
              alt={t[lang].PhoneVerification.title}
              className="phone-verification__image"
            />
            {step === VERIFICATION_STEPS.PHONE_INPUT && renderPhoneStep()}
            {step === VERIFICATION_STEPS.CODE_VERIFICATION && renderCodeStep()}
            {step === VERIFICATION_STEPS.SUCCESS && renderSuccessStep()}
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default PhoneVerification;
