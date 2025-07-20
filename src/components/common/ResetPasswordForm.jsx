import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { resetPassword } from "@/apis/PasswordResetApi";
import CodeInput from "./CodeInput";

const ResetPasswordForm = () => {
  const { lang } = useContext(LanguageContext);
  const [codeArr, setCodeArr] = useState(["", "", "", "", "", ""]);
  const code = codeArr.join("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Optionally, get email from location.state if you want to prefill or use it

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (codeArr.join("").length !== 6) {
      setError(t[lang].auth.codeIncomplete || "Veuillez entrer le code complet.");
      return;
    }
    if (password.length < 8) {
      setError(t[lang].auth.passwordLength || "Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== passwordRepeat) {
      setError(t[lang].auth.passwordMismatch || "Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(code, password);
      setSuccess(t[lang].auth.passwordResetSuccess || "Votre mot de passe a été réinitialisé avec succès.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.message || t[lang].auth.activationError || "Code ou mot de passe invalide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#F15A29", fontWeight: 700, marginBottom: 12 }}>
          {t[lang].auth.codeSentTitle || "Le code a été envoyé!"}
        </h2>
        <p style={{ color: "#444", marginBottom: 24 }}>
          {t[lang].auth.codeSentDesc || "Entrez le code envoyé à votre email."}
        </p>
      </div>
      <div className="col-12">
        <CodeInput value={codeArr} onChange={setCodeArr} lang={lang} />
      </div>
      <div className="col-12">
        <div className="form-input" style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
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
            }}
            title={showPassword ? 'Masquer' : 'Afficher'}
          >
            <i className={!showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </span>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input" style={{ position: 'relative' }}>
          <input
            type={showPasswordRepeat ? "text" : "password"}
            required
            value={passwordRepeat}
            onChange={e => setPasswordRepeat(e.target.value)}
            autoComplete="new-password"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.confirmPassword || "Confirmer le mot de passe"}
          </label>
          <span
            onClick={() => setShowPasswordRepeat(v => !v)}
            style={{
              position: 'absolute',
              ...(lang === 'ar' ? { left: 12 } : { right: 12 }),
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: 18,
              color: '#aaa',
              userSelect: 'none',
            }}
            title={showPasswordRepeat ? 'Masquer' : 'Afficher'}
          >
            <i className={!showPasswordRepeat ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </span>
        </div>
      </div>
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
          {loading ? t[lang].auth.verifying || "Vérification..." : t[lang].auth.verifyBtn || "VÉRIFIER"}
        </button>
      </div>
      {error && <div className="alert alert-danger mt-10 warning-error">{error}</div>}
      {success && <div className="alert alert-success mt-10">{success}</div>}
    </form>
  );
};

export default ResetPasswordForm;
