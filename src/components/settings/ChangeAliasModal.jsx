import React, { useState, useEffect, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { getCurrentUser } from "@/apis/mockAPI/CurrentUserApi";
import { updateAccount } from "@/apis/mockAPI/UserApi";

const ChangeAliasModal = () => {
  const { lang } = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const openHandler = () => {
      setShow(true);
      setError("");
      setSuccess(false);
      setLoading(false);
      getCurrentUser().then((user) => {
        setAlias(user.firstName || "");
      });
    };
    window.addEventListener("openAliasModal", openHandler);
    return () => window.removeEventListener("openAliasModal", openHandler);
  }, []);

  const handleClose = () => {
    setShow(false);
    setAlias("");
    setError("");
    setSuccess(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await updateAccount({ firstName: alias });
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        window.location.reload(); // Refresh to update UI
      }, 1000);
    } catch (err) {
      setError(err.message || t[lang].settings.aliasChangeError);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="settings-lang-modal">
      <div className="settings-lang-modal-bg" onClick={handleClose} />
      <div className="settings-lang-modal-content text-center">
        <div className="mb-3">
          <i className="bi bi-person-circle text-orange" style={{ fontSize: 32 }}></i>
        </div>
        <div className="mb-3 fw-bold">
          {t[lang].settings.changeAlias}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="aliasInput" className="form-label">
              {t[lang].settings.aliasLabel}
            </label>
            <input
              id="aliasInput"
              type="text"
              className="form-control border-orange"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          {success && (
            <div className="text-success mb-2">
              {t[lang].settings.aliasChangeSuccess}
            </div>
          )}
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              {t[lang].settings.logoutConfirmNo}
            </button>
            <button
              type="submit"
              className="btn bg-orange border-orange text-white"
              disabled={loading || !alias.trim()}
            >
              {loading ? "..." : t[lang].settings.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAliasModal;
