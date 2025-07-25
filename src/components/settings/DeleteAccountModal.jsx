import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useAuthUser } from "@/utils/useAuthUser";
import { deleteAccount } from "@/apis/UserApi";
import { login } from "@/apis/AuthApi";

const DeleteAccountModal = () => {
  const { lang } = useContext(LanguageContext);
  const { handleLogout, user } = useAuthUser();
  const [show, setShow] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState("");
  const [isSocialUser, setIsSocialUser] = useState(false);

  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener("openDeleteModal", open);
    return () => window.removeEventListener("openDeleteModal", open);
  }, []);

  useEffect(() => {
    // Check if user is a social login user using localStorage flag
    if (show && user) {
      const isSocial = localStorage.getItem("isSocialUser") === "true";
      console.log("Is social user from localStorage:", isSocial);
      setIsSocialUser(isSocial);
    }
  }, [show, user]);
  if (!show) return null;
  return (
    <div className="settings-lang-modal">
      <div className="settings-lang-modal-bg" onClick={() => setShow(false)} />
      <div className="settings-lang-modal-content text-center">
        <div className="mb-3">
          <i className="bi bi-trash text-orange" style={{ fontSize: 32 }}></i>
        </div>
        <div className="mb-3 fw-bold">
          {t[lang].settings.deleteConfirmTitle}
        </div>
        {!isSocialUser ? (
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder={t[lang].settings.deletePasswordPlaceholder || "Mot de passe"}
              value={deletePassword}
              onChange={e => { setDeletePassword(e.target.value); setDeletePasswordError(""); }}
              disabled={deleteLoading}
              autoFocus
            />
            {deletePasswordError && <div className="alert alert-danger mt-2">{deletePasswordError}</div>}
          </div>
        ) : (
          <div className="mb-3 text-muted">
          </div>
        )}
        {deleteError && <div className="alert alert-danger">{deleteError}</div>}
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-danger" onClick={async () => {
            setDeleteLoading(true);
            setDeleteError("");
            setDeletePasswordError("");
            try {
              // For social users, skip password verification
              if (!isSocialUser) {
                await login(user?.username, deletePassword);
              }
              await deleteAccount();
              setTimeout(() => {
                setShow(false);
                handleLogout();
              }, 1500);
            } catch (e) {
              if (!isSocialUser && e?.message?.toLowerCase().includes("invalid")) {
                setDeletePasswordError(t[lang].settings.deletePasswordError || "Mot de passe incorrect.");
              } else {
                setDeleteError(t[lang].settings.deleteError);
              }
            } finally {
              setDeleteLoading(false);
            }
          }} disabled={deleteLoading || (!isSocialUser && !deletePassword)}>
            {deleteLoading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" />
            ) : null}
            {deleteLoading ? t[lang].settings.deleteConfirmYes + "..." : t[lang].settings.deleteConfirmYes}
          </button>
          <button className="btn btn-secondary" onClick={() => setShow(false)} disabled={deleteLoading}>
            {t[lang].settings.deleteConfirmNo}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccountModal;
