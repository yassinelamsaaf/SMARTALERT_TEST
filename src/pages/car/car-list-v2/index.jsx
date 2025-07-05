import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import Pagination from "@/components/car-list/common/S_Pagination";
import Sidebar from "@/components/car-list/car-list-v2/S_Sidebar";
import CarPropertes from "@/components/car-list/car-list-v2/CarPropertes";
import TopHeaderFilter from "@/components/activity-list/activity-list-v2/S_TopHeaderFilter";

import { useContext, useEffect, useState } from "react";

import UsedCarsApi from "@/apis/UsedCarsApi"
import NewCarsApi from "@/apis/NewCarsApi"
import { useLocation, useSearchParams } from "react-router-dom";
import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const metadata = {
  title: "Occasion || SmartAlert",
};

const CarListPage2 = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useContext(LanguageContext);

  const [searchData, setSearchData] = useState({})
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [endReached, setEndReached] = useState(false);

  useEffect(function searchDataChanged() {
    console.log("search data changed", new Date().getMinutes(), new Date().getSeconds(),
      new Date().getMilliseconds(), searchData);

  }, [searchData])

  useEffect(function getCars() {
    const abortController = new AbortController()
    const page = searchParams.get("page") ?? 1;
    const alert = searchParams.get("alert") ?? null;
    
    setLoadingCars(true);
    (pathname === "/occasion" ?
      UsedCarsApi.getUsedCars(page - 1, alert, lang, abortController)
      : NewCarsApi.getNewCars(page - 1, searchData, lang, abortController)
    )
      .then(cars => {
        setCars(cars);
        setLoadingCars(false);
        if (pathname === "/occasion") {
          if (endReached && cars.length > 3) {
            setEndReached(false)
          }
          if (!endReached && cars.length <= 3) {
            setEndReached(true)
          }
        }
        else if (pathname === "/neuve") {
          if (endReached && cars.length == 20) {
            setEndReached(false)
          }
          if (!endReached && cars.length < 20) {
            setEndReached(true)
          }
        }
      });
      return () => abortController.abort();
  }, [pathname, searchParams.get("page"), searchParams.get("alert")])
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container min-h-400">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none filters-sidebar-container">
                <Sidebar
                  onEndReached={(status) => { setEndReached(status) }}
                  onLoadingCarsChange={(status) => {
                    setLoadingCars(status)
                  }}
                  onSearchDataChange={(data) => {
                    setSearchData(data)
                  }}
                  setCars={(cars) => {
                    setCars(cars)
                  }} onAlertChange={(alert) => {
                    searchParams.set("alert", alert);

                    if (searchParams.get("page")) {
                      searchParams.delete("page")
                    }
                    else
                      searchParams.set("page", 1);
                    setSearchParams(searchParams);
                    window.scrollTo(0, 0)
                  }} />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    {t[lang].cars.filterTitle}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40 xl:d-block filters-sidebar-container">
                    <Sidebar
                      onEndReached={(status) => { setEndReached(status) }}
                      onLoadingCarsChange={(status) => {
                        setLoadingCars(status)
                      }}
                      onSearchDataChange={(data) => {
                        setSearchData(data)
                      }}
                      setCars={(cars) => {
                        setCars(cars)
                      }} onAlertChange={(alert) => {
                        searchParams.set("alert", alert);

                        if (searchParams.get("page")) {
                          searchParams.delete("page")
                        }
                        else
                          searchParams.set("page", 1);
                        setSearchParams(searchParams);
                        window.scrollTo(0, 0)
                      }} />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}
            <div className="col-xl-9 ">
              <TopHeaderFilter />
              {!loadingCars && (
                <>
                  <div className="mt-30 mb-30 border-top-light"></div>
                  {/* End mt--30 */}
                  <div className="row y-gap-20">
                    <CarPropertes cars={cars} />
                  </div>
                  {/* End .row */}
                  <Pagination
                    nextDisabled={endReached}
                    onPageChange={(new_page_num) => {
                      searchParams.set("page", new_page_num)
                      setSearchParams(searchParams)
                      window.scrollTo(0, 0)
                    }} />
                  {/* End .col for right content */}
                </>
              )}
            </div>
          </div>
          {/* End .row */}
          {loadingCars && (
            <div className="loading-overlay">
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

export default CarListPage2;
