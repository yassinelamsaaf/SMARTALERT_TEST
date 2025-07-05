import SourceFilter from "./SourceFilter";
import CityFilter from "./CityFilter";
import BrandFilter from "./BrandFilter";
import SliderFilters from "../sidebar/SliderFilters";
import ChipFilters from "../sidebar/ChipFilters";
import { useContext, useEffect, useState } from "react";

import UsedCarsApi from "@/apis/UsedCarsApi";
import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Sidebar = ({ setCars = (cars) => { }, onLoadingCarsChange = (status) => { }, onSearchDataChange = (data) => { }, onAlertChange = (alert) => { } }) => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [excludedFilters, setExcludedFilters] = useState([])
  const [searchData, setSearchData] = useState({})

  const isLoadingFilters = useSelector((state) => state.ui.isLoadingFilters)
  const onSearchClick = () => {
    let data = {}
    const { city, sources, ...searches } = searchData;
    data.label = "alert/" + (Math.random() * 100_000).toFixed(0);
    data.city = city;
    data.sources = sources;
    data.searches = Object.values(searches);
    console.log("data", data);

    if (Object.keys(searchData).length === 0) {
      return;
    };
    if (pathname == '/occasion') {
      onLoadingCarsChange(true);
      UsedCarsApi.search(data, lang)
        .then((response) => {
          // onLoadingCarsChange(false)
          if (response)
            onAlertChange(response)
        }
        )
    }
    // 
    // ( ? UsedCarsApi : NewCarsApi).search(data, lang).then(
    //   (response) => {
    //     onLoadingCarsChange(false)
    //     if (response)
    //       if (pathname == '/occasion') {
    //         onAlertChange(response)
    //       }
    //       else {
    //         setCars(response)
    //       }
    if (searchParams.get("page"))
      searchParams.delete("page")
    else
      searchParams.set("page", 1)
    setSearchParams(searchParams)
    //   }
    // )
  }
  useEffect(function onRouteSChange() {
    if (pathname == '/occasion') {
      setExcludedFilters(['promo'])
    }
    else if (pathname == '/neuve') {
      setExcludedFilters(['mileage', 'regdate', 'vehicle_origin', 'fuel', 'doors', 'first_owner', 'gear_box'])
    }
    setSearchData({})
    onSearchDataChange({})

  }, [pathname])


  return (
    <>
      {pathname != '/neuve' && (
        <>
          <div className="sidebar__item">
            <h5 className="text-18 fw-500 mb-10">{t[lang].sideBar.source.title}</h5>
            <div className="sidebar-checkbox">
              <SourceFilter onFilterChange={(id) => {
                let temp = {
                  ...searchData,
                  sources: [{
                    id,
                  }],
                }
                setSearchData(temp)
                onSearchDataChange(temp)
              }}
                onFilterClear={() => {
                  const { sources, ...rest } = searchData;
                  setSearchData(rest)
                  onSearchDataChange(rest)

                }} />
            </div>
            {/* End Sidebar-checkbox */}
          </div>
          {/* End Source filter */}

          <div className="sidebar__item">
            <h5 className="text-18 fw-500 mb-10">{t[lang].sideBar.city.title}</h5>
            <div className="sidebar-checkbox">
              <CityFilter
                onCityFilterChange={(id) => {
                  let temp = {
                    ...searchData,
                    city: {
                      id,
                    },
                  }
                  setSearchData(temp)
                  onSearchDataChange(temp)

                }}
                onFilterClear={() => {
                  const { city, ...rest } = searchData;
                  setSearchData(rest)
                  onSearchDataChange(rest)

                }} />
            </div>
            {/* End Sidebar-checkbox */}
          </div>
          {/* End City filter */}
        </>
      )}

      <BrandFilter
        onBrandFilterChange={(brand, criteriaID) => {
          let temp = {
            ...searchData,
            brand: {
              label: "brand",
              ...brand,
              criteria: { id: criteriaID }
            },
          }
          setSearchData(temp)
          onSearchDataChange(temp)

        }}
        onBrandFilterClear={() => {
          const { brand, model, ...rest } = searchData;
          setSearchData(rest)
          onSearchDataChange(rest)

        }}
        onModelFilterChange={(model, criteriaID) => {
          let temp = {
            ...searchData,
            model: {
              label: "model",
              ...model,
              criteria: { id: criteriaID }
            },
          }
          setSearchData(temp)
          onSearchDataChange(searchData)

        }}
        onModelFilterClear={() => {
          const { model, ...rest } = searchData;
          setSearchData(rest)
          onSearchDataChange(rest)

        }}
      />
      {/* </div> */}
      {/* End Sidebar-checkbox */}
      {/* </div> */}
      {/* End Brand filter */}

      <SliderFilters excludedFilters={excludedFilters} onFilterChange={(label, range, criteriaID) => {
        let temp = {
          ...searchData,
          [label + "_min"]: {
            label: "min",
            valeur: range.min,
            criteria: { id: criteriaID }
          },
          [label + "_max"]: {
            label: "max",
            valeur: range.max,
            criteria: { id: criteriaID }
          },
        }
        setSearchData(temp)
        onSearchDataChange(temp)

      }} />
      {/* End Sliders filter */}

      <ChipFilters excludedFilters={excludedFilters} onChipChecked={(label, id, value, criteriaID) => {
        let temp = {
          ...searchData,
          [label]: {
            valeur: value,
            valeurObject: { id },
            criteria: { id: criteriaID }
          },
        }
        setSearchData(temp)
        onSearchDataChange(temp)

      }}
        onChipUnchecked={(label) => {
          const { [label]: excludedVal, ...rest } = { ...searchData };
          setSearchData(rest)
          onSearchDataChange(rest)

        }} />
      {/* End Chip filter */}

      <div className="col-12">
        <button
          type="button"
          // className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          className="button -dark-2 py-15 px-35 h-60 col-12 rounded-4 bg-brown-2 text-white"
          onClick={() => {
            onSearchClick()
          }}>
          <i className="icon-search text-20 mx-2" />
          {t[lang].sideBar.search}
        </button>
      </div>
      {isLoadingFilters && (
        <div className="loading-overlay">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
};

export default Sidebar;
