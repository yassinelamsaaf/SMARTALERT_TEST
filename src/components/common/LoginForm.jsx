import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { login } from "@/apis/AuthApi";
import { setToken } from "@/utils/auth";

const LoginForm = () => {
  const { lang } = useContext(LanguageContext);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let loginData;
      // Check if input is a phone number (starts with 06 or 07, 10 digits, no @)
      const isPhone =
        !emailOrPhone.includes("@") &&
        /^0[67][0-9]{8}$/.test(emailOrPhone.trim());

      if (isPhone) {
        // Call login API with phone number
        loginData = await login(emailOrPhone.trim(), password );
      } else {
        // Call login API with email
        loginData = await login(emailOrPhone, password);
      }
      if (loginData && loginData.id_token) {
        setToken(loginData.id_token);
        navigate("/");
      } else {
        setError(t[lang].auth.loginError || "Identifiants invalides.");
      }
    } catch (err) {
      setError(t[lang].auth.loginError || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">{t[lang].auth.loginTitle}</h1>
        <p className="mt-10">
          {t[lang].auth.loginSubtitle}{" "}
          <Link to="/signup" className="text-blue-1"
          style={{ color: "var(--color-dark-3)" }}>
            {t[lang].auth.loginLink}
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            required
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
            autoComplete="username"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.emailOrPhone || t[lang].auth.email}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input" style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.password}
          </label>
          <span
            onClick={() => setShowPassword(v => !v)}
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
            title={showPassword ? 'Masquer' : 'Afficher'}
          >
            <i className={!showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </span>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <Link
          to="/forgot-password"
          className="text-14 fw-500"
          style={{ color: "var(--color-dark-3)" }}
        >
          {t[lang].auth.forgot}
        </Link>
      </div>
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
          {loading ? t[lang].auth.loggingIn || "Connexion..." : t[lang].auth.loginBtn}
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default LoginForm;
