import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import "../../../public/sass/alerts/AlertCard.scss";




// Reusable confirmation modal for delete actions
export const DeleteConfirmModal = ({ show, onConfirm, onCancel, loading, title, confirmText, cancelText, icon }) => {
    const { lang } = useContext(LanguageContext);
    
    if (!show) return null;
    return (
      <div className="settings-lang-modal">
        <div className="settings-lang-modal-bg" onClick={onCancel} />
        <div className="settings-lang-modal-content text-center">
          <div className="mb-3">
            <i className={icon || "bi bi-trash text-orange"} style={{ fontSize: 32 }}></i>
          </div>
          <div className="mb-3 fw-bold">
            {title || t[lang]?.alert?.form?.deleteConfirmTitle || "Confirmer la suppression de l'alerte"}
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-add" style={{backgroundColor: 'var(--color-dark-2)'}} onClick={onConfirm} disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" />
              ) : null}{confirmText || t[lang]?.alert?.form?.deleteConfirmYes || 'Supprimer' + ( deleteConfirmYes && '...')}
            </button>
            <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
              {cancelText || t[lang]?.alert?.form?.deleteConfirmNo || 'Annuler'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  