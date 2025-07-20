import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { register } from "@/apis/AuthApi";
import { registerWithPhone } from "@/apis/AuthApi";

const SignUpForm = () => {
  const { lang } = useContext(LanguageContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
    agree: true,
    showPassword: false,
    showConfirmPassword: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.agree) {
      setError(t[lang].auth.agreeError || "You must agree to the terms.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t[lang].auth.passwordMismatch || "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Check if input is a phone number (starts with 06 or 07, 10 digits, no @)
      const isPhone =
        !form.emailOrPhone.includes("@") &&
        /^0[67][0-9]{8}$/.test(form.emailOrPhone.trim());
      if (isPhone) {
        await registerWithPhone({
          login: form.emailOrPhone.trim(),
          phone: form.emailOrPhone.trim(),
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          langKey: lang,
        });
        navigate(`/activate-phone?phone=${encodeURIComponent(form.emailOrPhone)}`);
      } else {
        await register({
          login: form.emailOrPhone,
          email: form.emailOrPhone,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          langKey: lang,
        });
        navigate(`/activate?email=${encodeURIComponent(form.emailOrPhone)}`);
      }
    } catch (err) {
      // Map backend error codes to user-friendly messages
      let msg = err?.message || "";
      let errorKey = null;
      if (msg.includes("emailexists")) errorKey = "emailExists";
      else if (msg.includes("loginalreadyused")) errorKey = "loginAlreadyUsed";
      else if (msg.includes("invalid_email")) errorKey = "invalidEmail";
      else if (msg.includes("weak_password")) errorKey = "weakPassword";
      else if (msg.includes("usernotfound")) errorKey = "userNotFound";
      else if (msg.includes("invalid_credentials")) errorKey = "invalidCredentials";
      else if (msg) errorKey = "signupError";
      setError(
        (errorKey && t[lang].authErrors && t[lang].authErrors[errorKey])
          ? t[lang].authErrors[errorKey]
          : (t[lang].auth.signupError || t[lang].authErrors?.default || "Registration failed.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">{t[lang].auth.signupTitle}</h1>
        <p className="mt-10">
          {t[lang].auth.signupSubtitle}{" "}
          <Link to="/login" className="text-blue-1"
          style={{ color: "var(--color-dark-3)" }}>
            {t[lang].auth.signupLink}
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.Name}
          </label>
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-12">
        <div className="form-input ">
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.lastName}
          </label>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="emailOrPhone" value={form.emailOrPhone} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.emailOrPhone || t[lang].auth.email}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input" style={{ position: 'relative' }}>
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.password}
          </label>
          <span
            onClick={() => setForm(f => ({ ...f, showPassword: !f.showPassword }))}
            style={{
              position: 'absolute',
              ...(lang === 'ar' ? { left: 12 } : { right: 12 }),
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: 18,
              color: '#aaa',
              userSelect: 'none',
              zIndex: 2
            }}
            title={form.showPassword ? 'Masquer' : 'Afficher'}
          >
            <i className={!form.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </span>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input" style={{ position: 'relative' }}>
          <input
            type={form.showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.confirmPassword}
          </label>
          <span
            onClick={() => setForm(f => ({ ...f, showConfirmPassword: !f.showConfirmPassword }))}
            style={{
              position: 'absolute',
              ...(lang === 'ar' ? { left: 12 } : { right: 12 }),
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: 18,
              color: '#aaa',
              userSelect: 'none',
              zIndex: 2
            }}
            title={form.showConfirmPassword ? 'Masquer' : 'Afficher'}
          >
            <i className={!form.showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </span>
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            {t[lang].auth.agree}
          </div>
        </div>
      </div> */}
      {/* End .col */}

      {error && (
        <div className="alert alert-danger mt-10 warning-error">{error}</div>
      )}
      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 facebook-btn"
          style={{
            background: "var(--color-dark-3)",
            color: "#fff",
            width: "100%",
            borderRadius: 6,
            fontWeight: 600,
          }}
          disabled={loading}
        >
          {loading ? t[lang].auth.signupLoading || "Inscription..." : t[lang].auth.signupBtn}
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
