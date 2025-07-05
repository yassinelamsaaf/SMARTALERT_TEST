import { fetchModels, resetModels } from "@/features/filters/modelCriteriaSlice";
import { setLoadingFilters } from "@/features/ui/uiSlice";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BrandFilter = ({ onBrandFilterChange = (id, criteriaID) => { }, onBrandFilterClear = () => { },
  onModelFilterChange = (id, criteriaID) => { }, onModelFilterClear = () => { } }) => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);

  const [searchBrandValue, setSearchBrandValue] = useState(""); // keeps track of the value in the text input
  const [brandCriteriaContent, setBrandCriteriaContent] = useState([]);
  const selectedBrandId = useRef('');

  const [searchModelValue, setSearchModelValue] = useState(""); // keeps track of the value in the text input
  const [modelCriteriaContent, setModelCriteriaContent] = useState([]);
  const dispatch = useDispatch()
  const { criteria, loading, error } = useSelector((state) => state.brandCriteria);
  const { models, isloading } = useSelector((state) => state.modelReducer);

  const handleBrandOptionClick = (item) => {
    setSearchBrandValue(item.name);
    onBrandFilterChange(item, criteria[0].id)
    selectedBrandId.current = item.valeurObject.id
  };

  const handleModelOptionClick = (item) => {
    setSearchModelValue(item.name);
    onModelFilterChange(item, models.id)
  };

  useEffect(()=> {
    setSearchBrandValue("");
    selectedBrandId.current= "";
    setModelCriteriaContent([]);
    setSearchModelValue("")
  },[pathname])

  useEffect(function loadBrandCriteria() {
    dispatch(setLoadingFilters(loading))
    if (!loading && criteria.length > 0) {
      setBrandCriteriaContent(
        (criteria[0].valeurs).map((critereon, index) => {
          return {
            key: critereon.key,
            valeur: critereon.value,
            valeurObject: { id: critereon.id },
            name: critereon.translations ? critereon.translations[lang] : critereon.label
          }
        })
      )
    }
  }, [loading])

  useEffect(function loadModelCriteria() {
    if (selectedBrandId.current.length > 0) {
      dispatch(fetchModels(selectedBrandId.current));
    }
    else {
      dispatch(resetModels());
    }
    setSearchModelValue("")
  }, [selectedBrandId.current])

  useEffect(function setModels() {
    if (!isloading && models?.valeurs?.length > 0) {
      setModelCriteriaContent(
        (models.valeurs).map((critereon, index) => {
          return {
            key: critereon.key,
            valeur: critereon.value,
            valeurObject: { id: critereon.id },
            name: critereon.translations? critereon.translations[lang] : critereon.label
          }
        })
      )
    }
    else if (models?.length == 0) [
      setModelCriteriaContent([])
    ]
  }, [models])

  const searchBrandContent = brandCriteriaContent.filter((critereon) => critereon?.name?.toLowerCase().includes(searchBrandValue?.toLowerCase()));
  const searchModelContent = modelCriteriaContent.filter((critereon) => critereon?.name?.toLowerCase().includes(searchModelValue?.toLowerCase()));

  return error ? (
    <></>
  )
    :
    (
      <>
        <div className="sidebar__item">
          <h5 className="text-18 fw-500 mb-10">{t[lang].sideBar.brand.title}</h5>
          <div className="sidebar-checkbox">
            <div className="searchMenu-loc  js-form-dd js-liverSearch">
              <div
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                data-bs-offset="0,22"
              >
                <div className="text-15 text-light-1 ls-2 lh-16">
                  <input
                    autoComplete="on"
                    type="search"
                    placeholder={t[lang].sideBar.brand.placeHolder}
                    className="js-search js-dd-focus"
                    value={searchBrandValue}
                    onChange={(e) => {
                      setSearchBrandValue(e.target.value)
                    }}
                    onBlur={() => {
                      if (searchBrandValue.length == 0) {
                        selectedBrandId.current = '';
                        onBrandFilterClear()
                        onModelFilterClear()
                      }
                    }}
                  />
                </div>
              </div>
              {/* End location Field */}

              <div className="shadow-2 dropdown-menu w-100 ">
                <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4 max-height-400">
                  <ul className="y-gap-5 js-results">
                    {searchBrandContent.map((item, index) => (
                      <li
                        className={`-link d-block text-left rounded-4 px-2 py-1 js-search-option mb-1`}
                        key={index}
                        role="button"
                        onClick={() => {
                          handleBrandOptionClick(item)
                        }}
                      >
                        <div className="d-flex">
                          <div className="ml-10">
                            <div className="text-15 mb-5 lh-12 fw-500 js-search-option-target">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modelCriteriaContent.length > 0 && (
          <div className="sidebar__item">
            <h5 className="text-18 fw-500 mb-10">{t[lang].sideBar.model.title}</h5>
            <div className="sidebar-checkbox">
              <div className="sidebar-checkbox">
                <div className="searchMenu-loc  js-form-dd js-liverSearch">
                  <div
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    data-bs-offset="0,22"
                  >
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      <input
                        autoComplete="on"
                        type="search"
                        placeholder={t[lang].sideBar.model.placeHolder}
                        className="js-search js-dd-focus"
                        value={searchModelValue}
                        onChange={(e) => {
                          setSearchModelValue(e.target.value)
                        }}
                        onBlur={() => {
                          if (searchModelValue.length == 0) {
                            onModelFilterClear()
                          }
                        }}
                      />
                    </div>
                  </div>
                  {/* End location Field */}

                  <div className="shadow-2 dropdown-menu w-100 ">
                    <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4 max-height-400">
                      <ul className="y-gap-5 js-results">
                        {searchModelContent.map((item, index) => (
                          <li
                            className={`-link d-block text-left rounded-4 px-2 py-1 js-search-option mb-1`}
                            key={index}
                            role="button"
                            onClick={() => {
                              handleModelOptionClick(item)
                            }}
                          >
                            <div className="d-flex">
                              <div className="ml-10">
                                <div className="text-15 mb-5 lh-12 fw-500 js-search-option-target">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </>
    );
};

export default BrandFilter;
