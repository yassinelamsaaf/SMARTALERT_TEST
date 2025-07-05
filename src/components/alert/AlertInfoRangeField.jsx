import React from "react";

const MinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
    <path d="M4 15h12" />
    <circle cx="10" cy="10" r="9" stroke="#2563eb" fill="#e0e7ff" />
  </svg>
);

const MaxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem'}}>
    <path d="M4 5h12" />
    <circle cx="10" cy="10" r="9" stroke="#db2777" fill="#fce7f3" />
  </svg>
);

const MainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.75rem', marginLeft: '0.75rem'}}>
    <circle cx="12" cy="12" r="10" fill="#e0e7ff"/>
    <line x1="12" y1="16" x2="12" y2="12" />  
    <circle cx="12" cy="8.5" r="1.2" fill="#2563eb"/>
  </svg>
);

const AlertInfoRangeField = ({ label, minLabel, maxLabel, minValue, maxValue }) => (
  <div className="alert-info-row alert-info-row-range stunning-gradient-bg glassmorphism-card shadow-xl rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between transition-transform hover:scale-105 border-2 border-blue-200 mb-4">
    <div className="alert-info-label stunning-label text-2xl font-bold flex items-center gap-4">
      <MainIcon />
      <span className="label-text">{label}</span>
    </div>
    <div className="alert-info-range-values flex gap-8 mt-4 md:mt-0">
      <div className="alert-info-range-min flex flex-col items-center">
        <span className="alert-info-range-label text-sm font-semibold text-blue-500 flex items-center gap-2">
          <MinIcon /> {minLabel}
        </span>
        <span className="alert-info-value text-lg font-mono font-bold bg-white/80 px-4 py-2 rounded-xl shadow-inner transition-colors duration-300">
          {minValue}
        </span>
      </div>
      <div className="alert-info-range-divider w-8 h-1 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full self-center md:self-auto"></div>
      <div className="alert-info-range-max flex flex-col items-center">
        <span className="alert-info-range-label text-sm font-semibold text-pink-500 flex items-center gap-2">
          <MaxIcon /> {maxLabel}
        </span>
        <span className="alert-info-value text-lg font-mono font-bold bg-white/80 px-4 py-2 rounded-xl shadow-inner transition-colors duration-300">
          {maxValue}
        </span>
      </div>
    </div>
  </div>
);

export default AlertInfoRangeField; 