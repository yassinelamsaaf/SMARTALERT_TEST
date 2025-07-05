import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ChipFilters = ({excludedFilters= [], onChipChecked = (label, id, value, criteriaID) => { }, onChipUnchecked = (label) => { } }) => {
  const {pathname} = useLocation()
  const { lang } = useContext(LanguageContext);

  const chipLabels = {
    promo: t[lang].sideBar.promo.title,
    vehicle_origin: t[lang].sideBar.origin.title,
    fuel: t[lang].sideBar.fuel.title,
    doors: t[lang].sideBar.doors.title,
    first_owner: t[lang].sideBar.firstHand.title,
    gear_box: t[lang].sideBar.transmission.title,
  }

  const intialCheckedList = {
    promo: [],
    vehicle_origin: [],
    fuel: [],
    doors: [],
    first_owner: [],
    gear_box: [],
  }

  const [criteriaContent, setCriteriaContent] = useState([])
  const [checkedList, setCheckedList] = useState(intialCheckedList)


  const { criteria, loading, error } = useSelector((state) => state.chipCriteria);

  useEffect(()=> {
    setCheckedList(intialCheckedList)
  }, [pathname])

  useEffect(function loadCriteria() {
    if (!loading && criteria.length > 0) {
      console.log("CHIPS CRITERIA", criteria);
      
      setCriteriaContent(
        (criteria).filter(critereon => !excludedFilters.includes(critereon.label)).map((critereon, index) => {
          return {
            key: index,
            id: critereon.id,
            label: critereon.label,
            name: chipLabels[critereon.label],
            filters: critereon.valeurs.map((value) => {
              return {
                id: value.id,
                label: value.translations[lang] ?? t[lang].sideBar[critereon.label].default ?? value.value,
              }
            }),
          }
        })
      )
    }
  }, [loading, excludedFilters])

  const handleOnChange = (criteria, filter) => {
    if (!checkedList[criteria.label].includes(filter.label)) {
      const tempList = [filter.label]
      setCheckedList({
        ...checkedList,
        [criteria.label]: tempList,
      })
      onChipChecked(criteria.label, filter.id, filter.label, criteria.id)
    } else {
      const tempList = []
      setCheckedList({
        ...checkedList,
        [criteria.label]: tempList,
      })
      onChipUnchecked(criteria.label)
    }
  };

  return (
    criteriaContent.map((criteria, index) => {
      return (
        <div key={index} className="sidebar__item">
          <h5 className="text-18 fw-500 mb-10">{criteria.name}</h5>
          <div className="sidebar-checkbox">
            {criteria.filters.map((filter, index) => (
              <div className="row y-gap-10 items-center justify-between" key={index}>
                <div className="col-auto">
                  <div className="form-checkbox d-flex items-center">
                    <input type="radio" checked={checkedList[criteria.label].includes(filter.label)}
                      name={criteria.id}
                      value={filter.label}
                      onChange={(e) => {
                      }}
                      onClick={(e) => {
                        handleOnChange(criteria, filter)
                      }} />
                    <div className="form-checkbox__mark mx-2">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                    <div className="text-15 ml-10">{filter.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  );
};

export default ChipFilters;
