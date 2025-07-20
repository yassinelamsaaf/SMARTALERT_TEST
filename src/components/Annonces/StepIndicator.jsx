
const StepIndicator = ({ currentStep }) => (
  <div className="step-indicator d-flex justify-content-center mb-3">
    {[1, 2, 3].map((step) => (
      <div key={step} className="d-flex align-items-center">
        <div 
          className={`step-circle rounded-circle d-flex align-items-center justify-content-center ${
            step <= currentStep ? 'active' : ''
          }`}
        >
          {step}
        </div>
        {step < 3 && (
          <div 
            className={`step-line mx-3 ${step < currentStep ? 'active' : ''}`}
          ></div>
        )}
      </div>
    ))}
  </div>
);


export default StepIndicator;
