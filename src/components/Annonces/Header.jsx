import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Header = ({ currentStep, onPrevStep , onclose }) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="d-flex align-items-center mb-4 form-header">
      <button 
        type="button" 
        className="btn btn-link  p-0 me-3"
        onClick={currentStep==1 ? onclose : onPrevStep}
      >
        <i className="bi bi-arrow-left fs-4" style={{ color: currentStep == 1 ? 'red' : 'var(--color-dark-3)' }}></i>
      </button>
      <h4 className=" mb-0 flex-grow-1">{t[lang].createAnnonce.header}</h4>
    </div>
  );
};

export default Header;