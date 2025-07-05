import { setLoadingFilters } from "@/features/ui/uiSlice";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SourceFilter = ({ onFilterChange = (id) => { }, onFilterClear = () => { } }) => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);
  const [searchValue, setSearchValue] = useState("");
  const [criteriaContent, setCriteriaContent] = useState([])

  const dispatch = useDispatch()
  const { criteria, loading, error } = useSelector((state) => state.sourceCriteria);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    onFilterChange(item.id)
  };

  useEffect(() => {
    setSearchValue("");
  }, [pathname])

  useEffect(function loadCriteria() {
    dispatch(setLoadingFilters(loading))
    if (!loading && criteria.length > 0) {
      setCriteriaContent(
        (criteria).map((critereon, index) => {
          return {
            key: index,
            id: critereon.id,
            name: critereon.translations ? critereon.translations[lang] : critereon.label
          }
        })
      )
    }
  }, [loading])

  const searchContent = criteriaContent.filter((critereon) => critereon.name.toLowerCase().includes(searchValue.toLowerCase()));

  return error ? (
    <></>
  )
    :
    (
      <>
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
                placeholder={t[lang].sideBar.source.placeHolder}
                className="js-search js-dd-focus"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value.length == 0) {
                    onFilterClear()
                  }
                }}
              />
            </div>
          </div>
          {/* End location Field */}

          <div className="shadow-2 dropdown-menu w-100">
            <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
              <ul className="y-gap-5 js-results">
                {searchContent.map((item) => (
                  <li
                    className={`-link d-block text-left rounded-4 px-2 py-1 js-search-option mb-1`}
                    key={item.id}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500 js-search-option-target">
                          {item.name}
                        </div>
                        <div className="text-14 lh-12 text-light-1 mt-5">
                          {item.address}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
};

export default SourceFilter;
