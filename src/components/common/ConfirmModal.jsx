import React from "react";

const ConfirmModal = ({
  show,
  onConfirm,
  onCancel,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
}) => {
  if (!show) return null;
  return (
    <div className="settings-lang-modal">
      <div className="settings-lang-modal-bg" onClick={onCancel} />
      <div className="settings-lang-modal-content text-center">
        <div className="mb-3">
          <i className="bi bi-question-circle text-orange" style={{ fontSize: 32 }}></i>
        </div>
        <div className="mb-3 fw-bold">{title}</div>
        <div className="mb-3">{message}</div>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" />
            ) : null}
            {loading ? confirmText + "..." : confirmText}
          </button>
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 