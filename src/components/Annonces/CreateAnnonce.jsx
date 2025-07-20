import { useState, useContext } from 'react';
import Header from './Header';
import StepIndicator from './StepIndicator';
import StepLabels from './StepLabels';
import Navigation from './Navigation';
import AnnonceSteps from './AnnonceSteps';
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const CreateAnnonce = ({ onClose, onSave }) => {
  const { lang } = useContext(LanguageContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Particulier',
    brand: '',
    city: '',
    price: '',
    year: '',
    mileage: 0,
    origin: 'Dédouanée',
    fuel: 'Diesel',
    doors: 3,
    firstHand: 'Oui',
    transmission: 'Manuelle',
    photos: []
  });

  const [dropdowns, setDropdowns] = useState({
    brand: false,
    city: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(key => [key, key === dropdown ? !prev[dropdown] : false]))
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    alert(t[lang].createAnnonce.success || 'Annonce publiée !');
    console.log('Form Data:', formData);
    if (onSave) onSave(formData); // Pass data back
    if (onClose) onClose();       // Close the form
  };

  const renderCurrentStep = () => (
    <AnnonceSteps
      currentStep={currentStep}
      formData={formData}
      onInputChange={handleInputChange}
      dropdowns={dropdowns}
      onToggleDropdown={toggleDropdown}
    />
  );

  return (
    <div className="annonce-form">
      <div className="container py-4" style={{ maxWidth: '600px' }}>
    <div className="form-wrapper"  >
          <Header currentStep={currentStep} onPrevStep={prevStep} onclose={onClose} />
          <StepIndicator currentStep={currentStep} />
          <StepLabels currentStep={currentStep} />
          {renderCurrentStep()}
          <Navigation
            currentStep={currentStep}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onSubmit={handleSubmit}
            onclose={onClose}
            prevTitle={t[lang].createAnnonce.previous}
            nextTitle={t[lang].createAnnonce.next}
            submitTitle={t[lang].createAnnonce.submit}
            cancelTitle={t[lang].createAnnonce.cancel}
          />
         
        </div>
      </div>
    </div>
  );
};

export default CreateAnnonce;