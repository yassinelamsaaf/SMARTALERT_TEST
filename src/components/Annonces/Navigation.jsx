import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Navigation = ({ currentStep, onPrevStep, onNextStep, onSubmit, onclose,
      nextTitle, prevTitle, cancelTitle, submitTitle, stepsNumber}) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="form-navigation d-flex justify-content-between ">
      <button
        type="button"
        onClick={onclose}
      >
        {cancelTitle}
      </button>
      <div className="d-flex flex-wrap gap-2">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrevStep}
          >
            {prevTitle}
          </button>
        )}
        <button
          type="button"
          onClick={currentStep === stepsNumber ? onSubmit : onNextStep}
          style={{ minWidth: '120px' }}
        >
          {currentStep === stepsNumber ? submitTitle : nextTitle}
        </button>
      </div>
    </div>
  );
};

export default Navigation;