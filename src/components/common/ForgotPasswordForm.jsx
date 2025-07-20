import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

import { sendResetCode } from "@/apis/PasswordResetApi";

const ForgotPasswordForm = () => {
  const { lang } = useContext(LanguageContext);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await sendResetCode(emailOrPhone);
      setSuccess(
        t[lang].auth.resetCodeSentMsg ||
          "Le code de réinitialisation du mot de passe a été envoyé à votre email."
      );
      setTimeout(() => navigate("/reset-password", { state: { emailOrPhone } }), 800);
    } catch (err) {
      setError(t[lang].auth.loginError || "Erreur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">{t[lang].auth.forgot}</h1>
        <p className="mt-10">{t[lang].auth.resetCodeSentMsg}</p>
      </div>
      <div className="col-12">
        <div className="form-input ">
          <input
            type="text"
            required
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            autoComplete="username"
          />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.emailOrPhone || t[lang].auth.email}
          </label>
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
          {loading ? t[lang].auth.loggingIn || "Envoi..." : t[lang].auth.resetCodeBtn || "Envoyer le code de réinitialisation"}
        </button>
      </div>
      {error && <div className="alert alert-danger mt-10 warning-error">{error}</div>}
      {success && <div className="alert alert-success mt-10">{success}</div>}
    </form>
  );
};

export default ForgotPasswordForm;
