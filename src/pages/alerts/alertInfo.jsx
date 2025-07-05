import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import INEButton from "@/components/common/MyButton";
import "@/../public/sass/alerts/alertInfo.scss";
import { getAlertInfo } from "@/apis/mockAPI/AlertsApi.js";
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
    navigate(`/occasion?alert=${searchAlertId}`);
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

  if (loading) return <div className="alert-info-loading">Loading...</div>;
  if (!alert) return <div className="alert-info-notfound">Alert not found.</div>;

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
        {/* End Page Title */}

        <div className="header-margin"></div>
        {/* header top margin */}

        <Header1 />
        {/* End Header 1 */}
        <div className="alert-info-container">
          {/* Alert Title and Creation Date */}
          <div className="alert-info-title-block" style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="alert-info-title" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{alert.label}</h2>
            <div className="alert-info-date" style={{ fontSize: '1.2rem', color: '#2563eb', fontWeight: 500, letterSpacing: 1, background: 'rgba(37,99,235,0.07)', display: 'inline-block', padding: '6px 22px', borderRadius: 16, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
              {formatDate(alert.createdAt)}
            </div>
          </div>
        <div className="alert-info-content alert-info-car-details">
          {/* Render all other fields except the paired ones */}
          {Object.keys(info).filter(key => !["anneemin","anneemax","kilometragemin","kilometragemax","prixmin","prixmax"].includes(key)).map((key) => (
            <AlertInfoField
              key={key}
              label={t[lang].alert?.info?.[key] || key}
              value={info[key] && info[key] !== "any" && info[key] !== "---" ? info[key] : <span className="alert-info-any">{t[lang].alert?.info?.all || "Tous"}</span>}
            />
          ))}
          {/* Special paired fields: annee, mileage, price */}
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
        {/* Fixed-position buttons */}
        <div className="alert-info-remove-btn-wrapper">
            <INEButton
            icon="https://th.bing.com/th/id/R.27299b1faed2d63a3e9512bd8cd187ad?rik=%2fVRT3CdCaWVC3w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fdelete-button-png-delete-icon-1600.png&ehk=mRIiUoExO9FPzeoYwqDk%2bfWDlxlcYGmfTbaQ2Pbwyak%3d&risl=&pid=ImgRaw&r=0"
            onClick={handleRemove}
            size={56}
            alt="Remove"
            title="Remove Alert"
            className="shadow btn-danger my-squared-btn--scale"
            />
        </div>
        <div className="alert-info-navigate-btn-wrapper">
            <INEButton
            icon="https://cdn-icons-png.flaticon.com/512/271/271228.png"
            onClick={handleNavigate}
            size={56}
            alt="Navigate"
            title="Go to..."
            className="shadow btn-primary my-squared-btn--scale"
            />
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

