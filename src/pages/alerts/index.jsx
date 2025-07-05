// @flow

import AlertProperties from "@/components/alert/AlertProperties";
import Pagination2 from "@/components/car-list/common/INEPagination2.jsx";
import AlertSearchBar from "@/components/common/AlertSearchBar";
import MetaComponent from "@/components/common/MetaComponent";
import Footer2 from "@/components/footer/footer-2";
import Header1 from "@/components/header/header-1";
import INEButton from "@/components/common/MyButton";
import t from "@/i18n/t";

import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAlertsAPI } from "@/apis/mockAPI/AlertsApi.js";
import "../../../public/sass/alerts/alertListPage.scss";
import AlertFilterCard from "@/components/alert/AlertFilterCard";
import { deleteAlerts } from "./mockApi/deleteAlertAPI.jsx";


const metadata = {
  title: "Alerts || SmartAlert",
};



export const AlertListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [cachedAlerts, setCachedAlerts] = useState([])
  
  

  const confirmIconUrl = "https://th.bing.com/th/id/OIP.k7NLCi7Fm4ifePnCxFUnGAHaHw?rs=1&pid=ImgDetMain";
  const cancelIconUrl = "https://th.bing.com/th/id/R.b04e3cc468f869d07a7fc7768adb8664?rik=NDKRTi32SCPvPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fCancel-Button-PNG-Free-Download.png&ehk=IZH6wY5FiVb2WJNh%2fA38Wt1V1XFS8qUdwJVfdU%2fk4R0%3d&risl=&pid=ImgRaw&r=0";

  const getPageFromParams = (params) => {
    const pageParam = params.get("page");
    const pageNum = parseInt(pageParam, 10);
    return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
  };

  // Fetch all alerts once (on mount or when lang changes)
  useEffect(() => {
    setLoadingAlerts(true);
    getAlertsAPI(currentPage, searchInput, cachedAlerts, setCachedAlerts).then(result => {
      console.log({result})
      setTotalPages(result.totalPages)
      setAlerts(result.alerts || []);
      setLoadingAlerts(false);
    });
  }, [lang, searchInput, deleteMode, currentPage]);

  // // Apply search and filter criteria locally
  // useEffect(() => {
  //   let filtered = allAlerts;

  //   // Apply search
  //   if (searchInput) {
  //     const search = searchInput.toLowerCase();
  //     filtered = filtered.filter(alert =>
  //       Object.values(alert).some(
  //         value =>
  //           typeof value === "string" && value.toLowerCase().includes(search)
  //       )
  //     );
  //   }

  //   // Apply filters
  //   Object.entries(filterValues).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null && value !== "") {
  //       filtered = filtered.filter(alert => alert[key] === value);
  //     }
  //   });

  //   // Pagination
  //   const pageSize = 10;
  //   const start = (currentPage - 1) * pageSize;
  //   const end = start + pageSize;
  //   setAlerts(filtered.slice(start, end));
  //   setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
  // }, [allAlerts, searchInput, filterValues, currentPage]);

  // Sync currentPage with URL param
  useEffect(() => {
    const pageInUrl = getPageFromParams(searchParams);
    if (pageInUrl !== currentPage) {
      setCurrentPage(pageInUrl);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.set("page", newPage);
        return params;
      });
    }
  };

  // Handler for search input
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handler for delete mode
  const handleDeleteClick = () => {
    setDeleteMode(true);
    setSelected([]);
  };
  const handleCancelDelete = () => {
    setDeleteMode(false);
    setSelected([]);
  };
  const handleConfirmDelete = async () => {
    if (selected.length > 0) {
      console.log({selected});
      await deleteAlerts(...selected);
      setDeleteMode(false);
      setSelected([]);
      
    }
    handleCancelDelete();
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
      {/* End Page Title */}


      <Header1 />
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container min-h-400">
          {/* Centered search bar at the head of the page */}
          <div className="alert-listpage-searchbar-row">
            <div className="alert-listpage-searchbar-col">
              <AlertSearchBar value={searchInput} onChange={handleSearchInputChange} placeholder={t[lang].alert.show.searching}/>
            </div>
            <div className="btn-cont">
            <INEButton
              icon={deleteMode ? cancelIconUrl : "https://icon-library.com/images/plus-icon-white/plus-icon-white-7.jpg"}
              size={48}
              title={deleteMode ? t[lang].alert.show.cancel : t[lang].alert.show.create}
              disabled={loadingAlerts}
              onClick={deleteMode ? handleCancelDelete : () => navigate("/alerts/add")}
              style={deleteMode ? { background: 'var(--color-yellow-4)' } : {}}
            />
            {/* <INEButton
              icon={deleteMode ? cancelIconUrl : "https://static.vecteezy.com/system/resources/previews/010/141/447/large_2x/filter-icon-sign-symbol-design-free-png.png"}
              size={48}
              className={`btn alert-listpage-filter-btn${Object.values(filterValues).some(v => {
                return v}) ? '--active' : ''}`}
              title={deleteMode ? t[lang].alert.show.cancel : t[lang].alert.show.filter}
              disabled={loadingAlerts}
              onClick={deleteMode ? handleCancelDelete : () => setShowFilter(true)}
              style={deleteMode ? { background: 'var(--color-yellow-4)' } : {}}
            /> */}
            <INEButton
              icon={deleteMode ? confirmIconUrl : "https://th.bing.com/th/id/R.27299b1faed2d63a3e9512bd8cd187ad?rik=%2fVRT3CdCaWVC3w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fdelete-button-png-delete-icon-1600.png&ehk=mRIiUoExO9FPzeoYwqDk%2bfWDlxlcYGmfTbaQ2Pbwyak%3d&risl=&pid=ImgRaw&r=0"}
              size={48}
              className={'btn'}
              title={deleteMode ? t[lang].alert.show.confirm : t[lang].alert.show.delete}
              disabled={loadingAlerts}
              onClick={deleteMode ? handleConfirmDelete : handleDeleteClick}
              style={deleteMode ? { background: 'var(--color-red-1)' } : {}}
              
            />
            </div>
          </div>
          {/* <AlertFilterCard
            show={showFilter}
            onApply={handleApplyFilters}
            onDiscard={() => setShowFilter(false)}
            initialFilters={filterValues}
            t={t}
            lang={lang}
          /> */}
          {/* End Filter Modal */}
          <div className="row y-gap-30 mrx-2em-center alert-listpage-content-row">
            <div className="col-xl-9 d-flex flex-column alert-listpage-content-col">
              {!loadingAlerts && (
                <>
                  <div className="mt-30 mb-30 border-top-light"></div>
                  {/* End mt--30 */}
                  <div className="row y-gap-200">
                    <AlertProperties
                      alerts={alerts}
                      deleteMode={deleteMode}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                  {/* Pagination below the alerts */}
                  <div className="pagination-bottom alert-listpage-pagination">
                    <Pagination2
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* End .row */}
          {loadingAlerts && (
            <div className="loading-overlay alert-listpage-loading-overlay">
              <LoadingAnimation />
            </div>
          )}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}



      <Footer2 />

     
    </>
  );
};


