import { deleteAlert } from "@/apis/AlertsApi";
import { useState, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { default_value, extractAlertInfo } from "@/utils/alerts";
import { useNavigate } from "react-router-dom";
import "../../../public/sass/alerts/AlertCard.scss";
import { DeleteConfirmModal } from "./deleteConfirmModal";



export const AlertCard = ({ alert, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const info = extractAlertInfo(alert, lang);
  console.log(info);
  

  const handleDeleteAlert = async () => {
    setDeleting(true);
    try {
      await deleteAlert(alert.alert.id);
      if (onDelete) onDelete(alert.id);
      setShowConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  // Search navigation logic inspired by alertInfo.jsx
  const handleSearchAlert = () => {
    const searchAlertId = alert.alert.id || alert.id;
      navigate(`/occasion?alert=${searchAlertId}`);
    
  };

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // Group fields for display
  const vehicleFields = [
    "brand",
    "model",
    "fuel",
    "transmission",
    "doors",
    "firsthand",
    "origin",
    "source"
  ];
  

  // Helper to determine if a field is default
  const isDefault = (val) => val === default_value;

  // Filtered fields for display logic (quick-info)
  const displayBrand = !isDefault(info.brand);
  const displayModel = !isDefault(info.model);
  const displayCity = !isDefault(info.city);
  const displaySector = !isDefault(info.sector);


  return (
    <div key={alert.id} className={`alert-card${expanded ? " expanded" : ""}`}>
      <div
        className={`alert-header${expanded ? " expanded" : ""}`}
        onClick={toggleExpanded}
      >
        <div className="alert-header-content">
          <div className="alert-main-info">
            <div className="chevron-icon">
              {expanded ? (
                <i className="bi bi-chevron-down"></i>
              ) : (
                <i className="bi bi-chevron-right"></i>
              )}
            </div>
            <div className="alert-summary">
              <h3 className="alert-name">{alert.label}</h3>
              <div className="alert-quick-info">
                  {displayBrand && (
                    <span className="info-item alert-card__quickinfo-bubble" key="brand">{info.brand}</span>
                  )}
                  {displayModel && (
                    <span className="info-item alert-card__quickinfo-bubble" key="model">{info.model}</span>
                  )}
                  {displayCity && (
                    <span className="info-item alert-card__quickinfo-bubble" key="city">{info.city}</span>
                  )}
                  {displaySector && (
                    <span className="info-item alert-card__quickinfo-bubble" key="sector">{info.sector}</span>
                  )}
                  <span className="info-item" key="sector" style={{opacity:0}}>f</span>
                </div>
            </div>
          </div>
          <div className="alert-actions-section">
            <span className="created-date">
              {t[lang]?.alert?.info?.createdAt || "Créée le"}: {alert.createdAt instanceof Date
                ? alert.createdAt.toLocaleDateString()
                : alert.createdAt.slice(0, 10)}
            </span>
            <div className="alert-actions">
              <button
                className="btn-action btn-search"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchAlert();
                }}
                title={t[lang]?.alert?.info?.search || "Rechercher"}
                disabled={deleting}
              >
                <i className="bi bi-search"></i>
              </button>
              <button
                className="btn-action btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                title={t[lang]?.alert?.info?.delete || "Supprimer"}
                disabled={deleting}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {expanded && (
          
        <div className="alert-details">
        <div className="details-grid">
            <div className="detail-section">
              <h4 className="section-title">
                {t[lang]?.alert?.info?.head?.main || "Critères d'alerte"}
              </h4>
              <div className="detail-items">
                <div className="detail-item" key="brand">
                  <span className="detail-label">{t[lang]?.alert?.info?.brand || "Marque"}</span>
                  <span className="detail-value">{(info["brand"] === default_value ? t[lang].alert?.info?.all : info["brand"])}</span>
                </div>               
                {displayBrand && (
                  <div className="detail-item" key="model">
                    <span className="detail-label">{t[lang]?.alert?.info?.model || "Modèle"}</span>
                    <span className="detail-value">{(info["model"] === default_value ? t[lang].alert?.info?.all : info["model"])}</span>
                  </div>
                )}
                {/* The rest of vehicle fields */}
                {vehicleFields.filter(f => !["brand", "model"].includes(f)).map((field) => (
                  <div className="detail-item" key={field}>
                    <span className="detail-label">{t[lang]?.alert?.info?.[field] || field }</span>
                    <span className="detail-value">{(info[field] === default_value ? t[lang].alert?.info?.all : info[field])}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detail-section">
              <h4 className="section-title">
                {t[lang]?.alert?.info?.location || t[lang]?.alert?.info?.city || "Localisation"}
              </h4>
              <div className="detail-items">
                  <div className="detail-item" key="city">
                    <span className="detail-label">{t[lang]?.alert?.info?.city || "Ville"}</span>
                    <span className="detail-value">{(info["city"] === default_value ? t[lang].alert?.info?.all : info["city"])}</span>
                  </div>
                {displayCity && (
                  <div className="detail-item" key="sector">
                    <span className="detail-label">{t[lang]?.alert?.info?.sector || "Secteur"}</span>
                    <span className="detail-value">{(info["sector"] === default_value ? t[lang].alert?.info?.all : info["sector"])}</span>
                  </div>
                )}
              </div>
              <hr className="sep"/>
              <h4 className="section-title">
                {t[lang]?.alert?.info?.ranges || "Plages"}
              </h4>
              <div className="detail-items">
                {/* Year range */}
                <div className="detail-item">
                  <span className="detail-label">
                    {t[lang]?.alert?.info?.annee || "Année"}
                  </span>
                  <span className="detail-value">
                    {info.anneemin && info.anneemin !== "any" && info.anneemin !== "---" ? info.anneemin : "1980"}
                    ~
                    {info.anneemax && info.anneemax !== "any" && info.anneemax !== "---" ? info.anneemax : "2025"}
                  </span>
                </div>
                {/* Mileage range */}
                <div className="detail-item">
                  <span className="detail-label">
                    {t[lang]?.alert?.info?.mileage || "Kilométrage"}
                  </span>
                  <span className="detail-value">
                    {info.kilometragemin && info.kilometragemin !== "any" && info.kilometragemin !== "---" ? info.kilometragemin : "0"}
                    ~
                    {info.kilometragemax && info.kilometragemax !== "any" && info.kilometragemax !== "---" ? info.kilometragemax : "800000"}
                  </span>
                </div>
                {/* Price range */}
                <div className="detail-item">
                  <span className="detail-label">
                    {t[lang]?.alert?.info?.price || "Prix"}
                  </span>
                  <span className="detail-value">
                    {info.prixmin && info.prixmin !== "any" && info.prixmin !== "---" ? info.prixmin : "0"}
                    ~
                    {info.prixmax && info.prixmax !== "any" && info.prixmax !== "---" ? info.prixmax : "1000000"}
                  </span>
                </div>
              </div>
            </div>
            
        </div>
      </div>
      )}
      <DeleteConfirmModal
        show={showConfirm}
        onConfirm={handleDeleteAlert}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
        // title={"hello here"}
      />
    </div>
  );
};