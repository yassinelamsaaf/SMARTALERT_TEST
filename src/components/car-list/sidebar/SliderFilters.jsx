import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext, useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SliderFilters = ({ excludedFilters=[], onFilterChange = (label, range, criteriaID) => { } }) => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);
  const [criteriaContent, setCriteriaContent] = useState([])
  const slidersLabels = {
    price: t[lang].sideBar.price.title,
    mileage: t[lang].sideBar.mileage.title,
    regdate: t[lang].sideBar.year.title,
  }

  const { criteria, loading, error } = useSelector((state) => state.sliderCriteria);

  useEffect(()=> {
    if (criteria.length > 0) {
      setCriteriaContent(
        (criteria).filter(critereon => !excludedFilters.includes(critereon.label)).map((critereon, index) => {
          return {
            key: index,
            id: critereon.id,
            label: critereon.label,
            name: slidersLabels[critereon.label],
            minValue: critereon.minValue,
            maxValue: critereon.maxValue,
            min: critereon.minValue,
            max: critereon.maxValue,
          }
        })
      )
    }
  }, [pathname])

  useEffect(function loadCriteria() {
    if (!loading && criteria.length > 0) {
      setCriteriaContent(
        (criteria).filter(critereon => !excludedFilters.includes(critereon.label)).map((critereon, index) => {
          return {
            key: index,
            id: critereon.id,
            label: critereon.label,
            name: slidersLabels[critereon.label],
            minValue: critereon.minValue,
            maxValue: critereon.maxValue,
            min: critereon.minValue,
            max: critereon.maxValue,
          }
        })
      )
    }
  }, [loading, excludedFilters])

  const handleOnChange = (sliderKey, value) => {
    setCriteriaContent(criteriaContent.map(criteria => {
      if (criteria.key === sliderKey) {
        criteria.min = value.min;
        criteria.max = value.max
        onFilterChange(criteria.label, value, criteria.id)
      }
      return criteria
    }))
  };

  return (
      criteriaContent.map((criteria, index) => {
        return (
          <div key={index} className="sidebar__item pb-30">
            <h5 className="text-18 fw-500 mb-10">{criteria.name}</h5>
            <div className="row x-gap-10 y-gap-30">
              <div className="col-12">
                <div className="js-price-rangeSlider">
                  <div className="text-14 fw-500"></div>

                  <div className="d-flex justify-between mb-20">
                    <div className="text-15 text-dark-1">
                      <span className="js-lower mx-1">{criteria.min}</span>-
                      <span className="js-upper mx-1">{criteria.max}</span>
                    </div>
                  </div>

                  <div className="px-5" style={{direction: "ltr"}}>
                    <InputRange
                      formatLabel={(value) => ``}
                      minValue={Number(criteria.minValue)}
                      maxValue={Number(criteria.maxValue)}
                      value={{ min: Number(criteria.min), max: Number(criteria.max) }}
                      onChange={(value) => handleOnChange(criteria.key, value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    );
};

export default SliderFilters;
