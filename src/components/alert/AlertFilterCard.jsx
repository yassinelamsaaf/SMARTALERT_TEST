import React, { useState } from "react";
// import "./AlertProperties.scss";
import "../../../public/sass/alerts/filterCard.scss";

const defaultFilters = {
  city: "",
  category: "",
  source: "",
  fuel: "",
  activated: ""
};

const cities = [
  { value: "", label: "All Cities" },
  { value: "Kénitra", label: "Kénitra" },
  { value: "Rabat", label: "Rabat" },
  { value: "Casablanca", label: "Casablanca" },
  { value: "Tanger", label: "Tanger" },
  { value: "Fès", label: "Fès" },
  { value: "Marrakech", label: "Marrakech" },
  { value: "Agadir", label: "Agadir" },
  { value: "Oujda", label: "Oujda" },
];
const categories = [
  { value: "", label: "All Categories" },
  { value: "Cars", label: "Cars" },
];
const sources = [
  { value: "", label: "All Sources" },
  { value: "Avito", label: "Avito" },
  { value: "Moteur.ma", label: "Moteur.ma" },
  { value: "Autocaz", label: "Autocaz" },
];
const fuels = [
  { value: "", label: "All Fuels" },
  { value: "Essence", label: "Essence" },
  { value: "Diesel", label: "Diesel" },
];
const activations = [
  { value: "", label: "All Statuses" },
  { value: "true", label: "Activated" },
  { value: "false", label: "Deactivated" },
];

const AlertFilterCard = ({ show, onApply, onDiscard, initialFilters = {}, t, lang }) => {
  const [filters, setFilters] = useState({ ...defaultFilters, ...initialFilters });

  if (!show) return null;

  return (
    <div className="alert-filter-modal">
      <div className="alert-filter-backdrop" />
      <div className="alert-filter-card bg-white rounded-8 p-30 shadow-2 position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1050, minWidth: 350, maxWidth: 400 }}>
        <h4 className="mb-20">{t ? t[lang].alert.filter.filter_title : "Filter Alerts"}</h4>
        <div className="form-group mb-15">
          <label>{t ? t[lang].alert.filter.city : "City"}</label>
          <select className="form-control" value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}>
            {cities.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="form-group mb-15">
          <label>{t ? t[lang].alert.filter.category : "Category"}</label>
          <select className="form-control" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
            {categories.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="form-group mb-15">
          <label>{t ? t[lang].alert.filter.source : "Source"}</label>
          <select className="form-control" value={filters.source} onChange={e => setFilters(f => ({ ...f, source: e.target.value }))}>
            {sources.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="form-group mb-15">
          <label>{t ? t[lang].alert.filter.fuel : "Fuel"}</label>
          <select className="form-control" value={filters.fuel} onChange={e => setFilters(f => ({ ...f, fuel: e.target.value }))}>
            {fuels.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="form-group mb-25">
          <label>{t ? t[lang].alert.filter.status : "Status"}</label>
          <select className="form-control" value={filters.activated} onChange={e => setFilters(f => ({ ...f, activated: e.target.value }))}>
            {activations.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-light" onClick={onDiscard}>{t ? t[lang].alert.filter.discard : "Discard"}</button>
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => {
            setFilters(defaultFilters);
            }}>Clear</button>
          <button className="btn btn-primary" onClick={() => onApply(filters)}>{t ? t[lang].alert.filter.apply : "Apply"}</button>
        </div>
      </div>
      <style>{`
        .alert-filter-modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 1040;
        }
        .alert-filter-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.3);
          z-index: 1041;
        }
        .alert-filter-card {
          z-index: 1050;
        }
      `}</style>
    </div>
  );
};

export default AlertFilterCard; 