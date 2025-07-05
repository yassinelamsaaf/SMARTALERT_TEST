import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { login } from "@/apis/mockAPI/AuthApi";
import { setToken } from "@/utils/auth";

const LoginForm = () => {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      // Store JWT token (adapt if backend returns it in a different property)
      if (data && data.id_token) {
        setToken(data.id_token);
        navigate("/");
      } else {
        setError(t[lang].auth.loginError || "Erreur d'authentification.");
      }
    } catch (err) {
      setError(
        err?.message || t[lang].auth.loginError || "Erreur d'authentification."
      );
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.email}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.password}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <a
          href="#"
          className="text-14 fw-500"
          style={{ color: "var(--color-dark-3)" }}
        >
          {t[lang].auth.forgot}
        </a>
      </div>
      {/* End .col */}
      {error && (
        <div className="alert alert-danger mt-10">{error}</div>
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
