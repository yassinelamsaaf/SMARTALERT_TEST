import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import INEButton from "@/components/common/MyButton";
import "@/../public/sass/alerts/alertInfo.scss";
import { getAlertInfo } from "@/apis/AlertsApi.js";
import { getToken } from "@/utils/auth";
import { extractAlertInfo } from "@/utils/alerts";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import AlertInfoField from "@/components/alert/AlertInfoField";
import AlertInfoRangeField from "@/components/alert/AlertInfoRangeField";
import { deleteOneAlert } from "./mockApi/deleteAlertAPI";
import ConfirmModal from "@/components/common/ConfirmModal";


const metadata = {
    title: "Alert || SmartAlert",
  };

// Icon mapping for each info key
const icons = {
  brand: "car-front",
  model: "car-front-fill",
  city: "geo-alt",
  sector: "geo",
  origin: "flag",
  fuel: "fuel-pump",
  transmission: "gear",
  doors: "door-closed",
  firsthand: "award",
  anneemin: "calendar2-minus",
  anneemax: "calendar2-plus",
  kilometragemin: "speedometer2",
  kilometragemax: "speedometer",
  prixmin: "cash-coin",
  prixmax: "cash-stack",
};


export const AlertInfo = () => {
  const { lang } = useContext(LanguageContext);
  const { id } = useParams();
  const [alert, setAlert] = useState(null)
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    console.log("here i am, here i stand, im a programmer that doesnt use the AI heavily");
    setLoading(true);
    console.log({id})
    getAlertInfo(id, lang).then(alert => {
      
      console.log({alertInfo: alert});
      setAlert(alert || null);
      if (alert) {
        const extractedInfo = extractAlertInfo(alert, lang);
        setInfo(extractedInfo);
      }
      setLoading(false);
    }).catch((e) => {
      console.log("something went wrong", e);
      setAlert(null);
      setInfo({});
      setLoading(false);
    });
  }, [id]);

  const handleRemove = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!alert) return;
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const alertId = alert.alert?.id || alert.id || id;
      const result = await deleteOneAlert(alertId);
      if (result.success) {
        setShowConfirm(false);
        setDeleteLoading(false);
        navigate("/alerts");
      } else {
        setDeleteError((t[lang].alert?.info?.deleteError || "Failed to delete alert:") + " " + (result.error || ""));
      }
    } catch (e) {
      setDeleteError((t[lang].alert?.info?.deleteError || "Failed to delete alert:") + " " + (e.message || e));
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleNavigate = () => {
    // Use the global alert ID (_id) for searching instead of the current alert ID
    const searchAlertId = alert.alert.id || alert.id || id;
    console.log('Navigating with alert ID:', searchAlertId);
    console.log('Alert object:', alert);
    
    // Check if the alert has a "first use" criteria specified
    const hasFirstUseCriteria = info.firsthand && info.firsthand !== "any" && info.firsthand !== "---";
    
    // Check if the first use value indicates "yes" (new car)
    const isNewCar = hasFirstUseCriteria && (
      info.firsthand === "oui" || 
      info.firsthand === "نعم" || 
      info.firsthand.toLowerCase() === "oui" || 
      info.firsthand.toLowerCase() === "نعم"
    );
    
    // Navigate based on the first use criteria
    if (isNewCar) {
      // If first use is "yes" (oui/نعم), navigate to neuve page
      navigate(`/neuve?alert=${searchAlertId}`);
    } else {
      // If no first use criteria or first use is "no" (non/لا), navigate to occasion page
      navigate(`/occasion?alert=${searchAlertId}`);
    }
  };

  // Helper to extract a value from searches or direct attribute
  const getSearchValue = (keyList, fallbackPaths = []) => {
    if (!alert?.alert) return undefined;
    const keys = Array.isArray(keyList) ? keyList : [keyList];
    // 1. Try in searches
    if (alert.alert.searches) {
      const found = alert.alert.searches.find(s => s.key && keys.includes(s.key.toLowerCase()));
      if (found && found.valeur) return found.valeur;
    }
    // 2. Try fallback direct paths (array of [object, property])
    for (const [obj, prop] of fallbackPaths) {
      if (obj && obj[prop]) return obj[prop];
    }
    return undefined;
  };

  // Helper to show value or '*'
  const showVal = (val) => {
    if (!val || val === "0" || val === "any" || val === "-") return <span className="alert-info-any">{t[lang].alert.info.all}</span>;
    return val;
  };

  if (loading) return (
    <div className="alert-info-loading-container">
      <div className="alert-info-loading-spinner"></div>
      <p className="alert-info-loading-text">{t[lang].alert.info.loading}</p>
    </div>
  );
  
  if (!alert) return (
    <div className="alert-info-notfound-container">
      <div className="alert-info-notfound-icon">
        <i className="bi bi-exclamation-triangle-fill"></i>
      </div>
      <h2 className="alert-info-notfound-title">{t[lang].alert.info.notFound.main}</h2>
      <p className="alert-info-notfound-text">{t[lang].alert.info.notFound.desc}</p>
    </div>
  );

  // Format date as YYYY/MM/DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d)) return "-";
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header1 />
      
      <div className="alert-info-page-container">
        <div className="alert-info-main-card">
          {/* Header Section */}
          <div className="alert-info-header">
            <div className="alert-info-header-content">
              <div className="alert-info-title-section">
                <h1 className="alert-info-main-title">{alert.label}</h1>
                <div className="alert-info-subtitle">
                  <span className="alert-info-date-badge">
                    <i className="icon-calendar"></i>
                    {formatDate(alert.createdAt)}
                  </span>
                  <span className="alert-info-id-badge">
                    ID: #{id}
                  </span>
                </div>
              </div>
              <div className="alert-info-header-actions">
                <INEButton
                  icon="icon-trash"
                  onClick={handleRemove}
                  size={48}
                  alt="Delete Alert"
                  title="Delete Alert"
                  className="alert-info-delete-btn"
                  isIconClass={true}
                />
                <INEButton
                  icon="icon-search"
                  onClick={handleNavigate}
                  size={48}
                  alt="Search Cars"
                  title="Search Cars"
                  className="alert-info-search-btn"
                  isIconClass={true}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="alert-info-content-section">
            

            <div className="alert-info-fields-grid">
              {(() => {
                const keys = Object.keys(info).filter(key => !["anneemin","anneemax","kilometragemin","kilometragemax","prixmin","prixmax"].includes(key));
                return keys.map((key, idx) => {
                  const field = (
                    <AlertInfoField
                      key={key}
                      keyName={key}
                      icons={icons}
                      label={t[lang].alert?.info?.[key] || key}
                      value={info[key] && info[key] !== "any" && info[key] !== "---" ? info[key] : <span className="alert-info-any">{t[lang].alert?.info?.all || "Tous"}</span>}
                    />
                  );
                  return field;
                });
              })()}
            </div>
            <div className="alert-info-ranges-grid">
              <AlertInfoRangeField
                label={t[lang].alert?.info?.annee || "Année"}
                minLabel={t[lang].alert?.info?.min || "min"}
                maxLabel={t[lang].alert?.info?.max || "max"}
                minValue={info.anneemin && info.anneemin !== "any" && info.anneemin !== "---" ? info.anneemin : <span className="alert-info-any">{"1980"}</span>}
                maxValue={info.anneemax && info.anneemax !== "any" && info.anneemax !== "---" ? info.anneemax : <span className="alert-info-any">{"2025"}</span>}
              />
              <AlertInfoRangeField
                label={t[lang].alert?.info?.mileage || "Kilométrage"}
                minLabel={t[lang].alert?.info?.min || "min"}
                maxLabel={t[lang].alert?.info?.max || "max"}
                minValue={info.kilometragemin && info.kilometragemin !== "any" && info.kilometragemin !== "---" ? info.kilometragemin : <span className="alert-info-any">{"0"}</span>}
                maxValue={info.kilometragemax && info.kilometragemax !== "any" && info.kilometragemax !== "---" ? info.kilometragemax : <span className="alert-info-any">{"800.000"}</span>}
              />
              <AlertInfoRangeField
                label={t[lang].alert?.info?.price || "Prix"}
                minLabel={t[lang].alert?.info?.min || "min"}
                maxLabel={t[lang].alert?.info?.max || "max"}
                minValue={info.prixmin && info.prixmin !== "any" && info.prixmin !== "---" ? info.prixmin : <span className="alert-info-any">{"0"}</span>}
                maxValue={info.prixmax && info.prixmax !== "any" && info.prixmax !== "---" ? info.prixmax : <span className="alert-info-any">{"1.000.000"}</span>}
              />
            </div>
          </div>

          {/* Footer Section */}
          <div className="alert-info-footer">
            <div className="alert-info-footer-content">
              <div className="alert-info-footer-info">
                <p className="alert-info-footer-text">
                  Click the search button to find vehicles matching your criteria
                </p>
              </div>
              <div className="alert-info-footer-actions">
                <button 
                  className="alert-info-secondary-btn"
                  onClick={() => navigate("/alerts")}
                >
                  <i className="icon-arrow-left"></i>
                  Back to Alerts
                </button>
                <button 
                  className="alert-info-primary-btn"
                  onClick={handleNavigate}
                >
                  <i className="icon-search"></i>
                  Search Vehicles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => { setShowConfirm(false); setDeleteError(""); }}
        title={t[lang].alert?.info?.confirmDeleteTitle || t[lang].alert?.info?.confirmDelete || "Confirm delete"}
        message={t[lang].alert?.info?.confirmDelete || "Are you sure you want to delete this alert?"}
        confirmText={t[lang].alert?.info?.deleteConfirmYes || "Yes"}
        cancelText={t[lang].alert?.info?.deleteConfirmNo || "No"}
        loading={deleteLoading}
      >
        {deleteError && <div className="alert alert-danger mt-2">{deleteError}</div>}
      </ConfirmModal>
    </>
  );
};

