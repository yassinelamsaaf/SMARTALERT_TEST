import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const StepLabels = ({ currentStep }) => {
  const { lang } = useContext(LanguageContext);
  const labels = t[lang].stepLabels;

  return (
    <div className="step-labels d-flex justify-content-between text-center mb-4">
      {labels.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        return (
          <div className="flex-fill" key={step}>
            <small className={`d-block${isActive ? ' fw-bold' : ' text-muted'}`}>
              {label}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default StepLabels;