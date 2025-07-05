import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const PhotoUpload = ({ photos, onPhotoUpload, onRemovePhoto }) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="form-section photo-upload">
      <label className="form-label">{t[lang].photoUpload.label}</label>
      <p className="text-muted small">{t[lang].photoUpload.helper}</p>

      <div className="upload-button w-100" role="button">
        <label className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
          <i className="bi bi-cloud-upload" />
          <span>{t[lang].photoUpload.uploadBtn}</span>
          <small className="text-muted">{t[lang].photoUpload.uploadNote}</small>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onPhotoUpload}
            className="d-none"
          />
        </label>
      </div>

      {photos.length > 0 ? (
        <div className="photo-grid mt-4">
          {photos.map((photo, index) => (
            <div className="photo-item" key={photo.id}>
              <img src={photo.url} alt={`Photo ${index + 1}`} />
              {index === 0 && (
                <span className="badge bg-success">{t[lang].photoUpload.main}</span>
              )}
              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemovePhoto(photo.id)}
              >
                <i className="bi bi-x" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="photo-empty mt-4">
          <i className="bi bi-camera" />
          <p className="mb-1">{t[lang].photoUpload.empty}</p>
          <p className="text-muted small">{t[lang].photoUpload.emptyNote}</p>
        </div>
      )}

      <div className="tips alert alert-info">
        <strong>{t[lang].photoUpload.tipsTitle}</strong>
        <ul>
          {t[lang].photoUpload.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PhotoUpload;