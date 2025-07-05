import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Navigation = ({ currentStep, onPrevStep, onNextStep, onSubmit }) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="d-flex justify-content-between mt-4 form-navigation">
      {currentStep > 1 && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onPrevStep}
        >
          {t[lang].createAnnonce.previous}
        </button>
      )}
      <button
        type="button"
        className={`btn btn-group btn-danger ${lang === "ar" ? "me-auto" : "ms-auto"}`}
        onClick={currentStep === 3 ? onSubmit : onNextStep}
        style={{ minWidth: '120px' }}
      >
        {currentStep === 3 ? t[lang].createAnnonce.submit : t[lang].createAnnonce.next}
      </button>
    </div>
  );
};

export default Navigation;