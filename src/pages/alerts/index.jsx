import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import "../../../public/sass/alerts/alerts.scss";
import MetaComponent from '@/components/common/MetaComponent';
import { LanguageContext } from '@/i18n/LanguageProvider';
import { AlertCard } from '@/components/alert/alertCard2';
import { DeleteConfirmModal } from '@/components/alert/deleteConfirmModal';
import t from '@/i18n/t';
import { getAlertsAPI, deleteAllAlerts } from '@/apis/AlertsApi.js';
import { LoadingAnimation } from '@/components/animation/LoadingAnimation';

const metadata = {
  title: "Alerts || SmartAlert",
};

export const AlertListPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [forced, setForced] = useState(false);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [cachedAlerts, setCachedAlerts] = useState([]);
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);

  useEffect(() => {
    setLoadingAlerts(true);
    getAlertsAPI(cachedAlerts, setCachedAlerts, forced, setForced).then(result => {
      console.log(result.alerts)
      setAlerts(result.alerts || []);
      setLoadingAlerts(false);
    });
    // eslint-disable-next-line
  }, [lang, forced]);

  const handleAddAlert = () => {
    navigate('/alerts/add');
  };

  // Remove alert from state after deletion
  const handleDeleteAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const handleDeleteAll = () => {
    setShowDeleteAllModal(true);
  };
  const handleConfirmDeleteAll = async () => {
    setDeleteAllLoading(true);
    await deleteAllAlerts();
    setAlerts([]);
    setDeleteAllLoading(false);
    setShowDeleteAllModal(false);
  };
  const handleCancelDeleteAll = () => {
    setShowDeleteAllModal(false);
  };

  

  // // Handler for filter apply
  // const handleApplyFilters = (filters) => {
  //   setFilterValues(filters);
  //   setCurrentPage(1);
  //   setShowFilter(false);
  // };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header1 />
      <section className="layout-pt-md layout-pb-lg">
        <div className="container min-h-400">
          <div className="alerts-page">
            <div className="alerts-header">
              <div className="header-container">
                <div className="header-content">
                  <div className="header-info">
                    <h1 className="page-title">{t[lang].alert?.show?.title || 'Mes Alertes'}</h1>
                    <p className="alert-count">
                      {t[lang].alert?.show?.count || "Nombre d'alertes créées"} : {alerts.length}
                    </p>
                  </div>
                  <div className='btn-list'>
                    <button className="btn btn-add mc-to-w-btn" onClick={handleDeleteAll}>
                      <i className="bi bi-trash"></i>
                      {t[lang].alert?.form?.deleteAll || 'Supprimer tous'}
                    </button>
                    <button className="btn btn-add mc-to-w-btn" onClick={handleAddAlert}>
                      <i className="bi bi-plus"></i>
                      {t[lang].alert?.show?.create || 'Ajouter une alerte'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="alerts-content">
              <div className="alerts-container">
                {!loadingAlerts && alerts.map((alertObj) => {
                  return (
                    <AlertCard
                      key={alertObj.id}
                      alert={alertObj}
                      onDelete={handleDeleteAlert}
                    />
                  );
                })}
                {loadingAlerts && (
                  <div className="loading-overlay alert-listpage-loading-overlay">
                    <LoadingAnimation />
                  </div>
                )}
              </div>
              {alerts.length === 0 && !loadingAlerts && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="bi bi-search"></i>
                  </div>
                  <h3 className="empty-title">
                    {t[lang].alert?.show?.emptyTitle || 'Aucune alerte créée'}
                  </h3>
                  <p className="empty-description">
                    {t[lang].alert?.show?.emptyDescription || 'Commencez par créer votre première alerte de voiture.'}
                  </p>
                  <button className="btn btn-add" onClick={handleAddAlert}>
                    <i className="bi bi-plus"></i>
                    {t[lang].alert?.show?.createFirst || 'Créer ma première alerte'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
      <DeleteConfirmModal
        show={showDeleteAllModal}
        onConfirm={handleConfirmDeleteAll}
        onCancel={handleCancelDeleteAll}
        loading={deleteAllLoading}
        title={t[lang]?.alert?.form?.deleteConfirmAllTitle}
        confirmText={t[lang]?.alert?.form?.deleteConfirmYes}
        cancelText={t[lang]?.alert?.form?.deleteConfirmNo} 
        />
    </>
  );
};

