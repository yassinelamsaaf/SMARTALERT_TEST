import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import OptionSelector from './OptionSelector';
import PhotoUpload from './PhotoUpload';
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const AnnonceSteps = ({ currentStep, formData, onInputChange, dropdowns, onToggleDropdown }) => {
  const { lang } = useContext(LanguageContext);

  const brands = ['Tout', 'Toyota', 'Renault', 'Peugeot', 'Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Hyundai', 'Kia', 'Nissan'];
  const cities = ['Tout', 'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi'];
  const currentYear = new Date().getFullYear();
 const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
  const brandModelsMap = {
    Toyota: ["Corolla", "Yaris", "Camry"],
    BMW: ["X1", "X3", "Series 3", "Series 5"],
    Renault: ["Clio", "Megane", "Captur"],
    Peugeot: ["208", "308", "3008"],
    Volkswagen: ["Golf", "Polo", "Passat"],
    Mercedes: ["Classe A", "Classe C", "Classe E"],
    Audi: ["A1", "A3", "A4", "Q5"],
    Ford: ["Fiesta", "Focus", "Kuga"],
    Hyundai: ["i10", "i20", "Tucson"],
    Kia: ["Picanto", "Rio", "Sportage"],
    Nissan: ["Micra", "Qashqai", "Juke"]
  };


  const typeOptions = [
    { value: 'Particulier', label: t[lang].createAnnonce.particulier },
    { value: 'Professionnel', label: t[lang].createAnnonce.professionnel }
  ];

  const originOptions = [
    { value: 'Dédouanée', label: t[lang].createAnnonce.dedouanee },
    { value: 'Pas Encore Dédouanée', label: t[lang].createAnnonce.pasDedouanee },
    { value: 'Ww Au Maroc', label: t[lang].createAnnonce.ww },
    { value: 'Importée Neuve', label: t[lang].createAnnonce.importeeNeuve }
  ];

  const fuelOptions = [
    { value: 'Diesel', label: t[lang].createAnnonce.diesel },
    { value: 'Essence', label: t[lang].createAnnonce.essence },
    { value: 'Electrique', label: t[lang].createAnnonce.electrique },
    { value: 'Hybride', label: t[lang].createAnnonce.hybride }
  ];

  const doorOptions = [
    { value: 3, label: t[lang].createAnnonce.threeDoors },
    { value: 5, label: t[lang].createAnnonce.fiveDoors }
  ];

  const firstHandOptions = [
    { value: 'Oui', label: t[lang].createAnnonce.oui },
    { value: 'Non', label: t[lang].createAnnonce.non }
  ];

  const transmissionOptions = [
    { value: 'Manuelle', label: t[lang].createAnnonce.manuelle },
    { value: 'Automatique', label: t[lang].createAnnonce.automatique }
  ];

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file
    }));
    const updatedPhotos = [...formData.photos, ...newPhotos].slice(0, 10);
    onInputChange('photos', updatedPhotos);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = formData.photos.filter(photo => photo.id !== photoId);
    onInputChange('photos', updatedPhotos);
  };

  if (currentStep === 1) {
    return (
      <div className="annonce-step annonce-step-1">
        <div className="mb-4">
          <label className="form-label fw-bold">
            {t[lang].createAnnonce.annonceTitle} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={t[lang].createAnnonce.annonceTitle}
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="btn-group w-100" role="group">
            {typeOptions.map(option => (
              <React.Fragment key={option.value}>
                <input
                  type="radio"
                  className="btn-check"
                  name="type"
                  id={option.value}
                  checked={formData.type === option.value}
                  onChange={() => onInputChange('type', option.value)}
                />
                <label className="btn btn-outline-danger" htmlFor={option.value}>
                  {option.label}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Dropdown 
          label={t[lang].createAnnonce.brand + " *"}
          value={formData.brand}
          options={brands}
          onSelect={(brand) => {
            onInputChange('brand', brand);
            onInputChange('model', ""); // reset model when brand changes
            onToggleDropdown('brand');
          }}
          isOpen={dropdowns.brand}
          onToggle={() => onToggleDropdown('brand')}
          icon="bi bi-car-front"
        />

        {formData.brand && brandModelsMap[formData.brand] && (
          <div className="mb-4">
            <label className="form-label fw-bold">{t[lang].createAnnonce.model}</label>
            <select
              className="form-select form-select-lg"
              value={formData.model}
              onChange={(e) => onInputChange('model', e.target.value)}
            >
              <option value="">{t[lang].createAnnonce.selectModel}</option>
              {brandModelsMap[formData.brand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        <Dropdown
          label={t[lang].createAnnonce.city}
          value={formData.city}
          options={cities}
          onSelect={(city) => {
            onInputChange('city', city);
            onToggleDropdown('city');
          }}
          isOpen={dropdowns.city}
          onToggle={() => onToggleDropdown('city')}
          icon="bi bi-geo-alt"
        />

         <div className="mb-4">
          <label className="form-label fw-bold">{t[lang].createAnnonce.price}</label>
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder={t[lang].createAnnonce.price}
            value={formData.price}
            min={0}
            onChange={(e) => onInputChange('price', Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="mb-4">
  <label className="form-label fw-bold">{t[lang].createAnnonce.year}</label>
  <select
    className="form-select form-select-lg"
    value={formData.year}
    onChange={(e) => onInputChange('year', e.target.value)}
  >
    <option value="">{t[lang].createAnnonce.year}</option>
    {years.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>
</div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="annonce-form ">
            <div className="range-wrapper mb-4">
              <label className="form-label fw-bold d-flex justify-content-between align-items-center mb-2">
                <span>{t[lang].createAnnonce.mileage}</span>
                <small className="text-muted">
                  {t[lang].createAnnonce.min}: 0 | {t[lang].createAnnonce.max}: 800,000
                </small>
              </label>

              <input
                type="range"
                className="form-range custom-range"
                min="0"
                max="800000"
                step="1000"
                value={formData.mileage}
                onChange={(e) => onInputChange('mileage', e.target.value)}
              />

              <div className="text-center mt-2">
                <span className="badge  rounded-pill px-3 py-2 fs-6 shadow-sm">
                  {Number(formData.mileage).toLocaleString()} km
                </span>
              </div>
            </div>



        <OptionSelector label={t[lang].createAnnonce.origin} name="origin" value={formData.origin} options={originOptions} onChange={(v) => onInputChange('origin', v)}  />
        <OptionSelector label={t[lang].createAnnonce.fuel} name="fuel" value={formData.fuel} options={fuelOptions} onChange={(v) => onInputChange('fuel', v)}  />
        <OptionSelector label={t[lang].createAnnonce.doors} name="doors" value={formData.doors} options={doorOptions} onChange={(v) => onInputChange('doors', v)} />
        <OptionSelector label={t[lang].createAnnonce.firstHand} name="firstHand" value={formData.firstHand} options={firstHandOptions} onChange={(v) => onInputChange('firstHand', v)} />
        <OptionSelector label={t[lang].createAnnonce.transmission} name="transmission" value={formData.transmission} options={transmissionOptions} onChange={(v) => onInputChange('transmission', v)} />
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="annonce-step annonce-step-3">
        <PhotoUpload
          photos={formData.photos}
          onPhotoUpload={handlePhotoUpload}
          onRemovePhoto={removePhoto}
          label={t[lang].createAnnonce.uploadPhotos}
        />
      </div>
    );
  }

  return null;
};

AnnonceSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  dropdowns: PropTypes.object.isRequired,
  onToggleDropdown: PropTypes.func.isRequired
};

export default AnnonceSteps;