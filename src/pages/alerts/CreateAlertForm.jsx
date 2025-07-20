import { useState, useContext, useMemo } from 'react';
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import OptionSelector from "./OptionSelector";

const BRANDS = [
  'Toyota', 'Renault', 'Peugeot', 'Volkswagen', 'BMW', 'Mercedes',
  'Audi', 'Ford', 'Hyundai', 'Kia', 'Nissan'
];
const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
  'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi'
];
const brandModelsMap = {
  Toyota: ["Corolla", "Yaris", "Camry", "RAV4", "Prius"],
  BMW: ["X1", "X3", "Series 3", "Series 5", "X5"],
  Renault: ["Clio", "Megane", "Captur", "Duster"],
  Peugeot: ["208", "308", "3008", "2008"],
  Volkswagen: ["Golf", "Polo", "Passat", "Tiguan"],
  Mercedes: ["Classe A", "Classe C", "Classe E", "GLA"],
  Audi: ["A1", "A3", "A4", "Q5", "Q3"],
  Ford: ["Fiesta", "Focus", "Kuga", "Mustang"],
  Hyundai: ["i10", "i20", "Tucson", "Santa Fe"],
  Kia: ["Picanto", "Rio", "Sportage", "Sorento"],
  Nissan: ["Micra", "Qashqai", "Juke", "X-Trail"]
};
const FIELD_DEFAULTS = {
  title: '',
  type: 'Particulier',
  brand: '',
  model: '',
  city: '',
  price: '',
  year: '',
  mileage: 0,
  origin: 'Dédouanée',
  fuel: 'Diesel',
  doors: 3,
  firstHand: 'Oui',
  transmission: 'Manuelle',
  photos: [],
  description: ''
};

const REQUIRED_FIELDS = ['title', 'brand', 'model', 'year', 'city', 'price'];


const CreateAlert = ({ onClose, onSave  }) => {
  const { lang } = useContext(LanguageContext);

  const [formData, setFormData] = useState(FIELD_DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});


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
  // Memoization for derived options and values
  const years = useMemo(() => {
    const cy = new Date().getFullYear();
    return Array.from({ length: cy - 1979 }, (_, i) => cy - i);
  }, []);
  const models = useMemo(
    () => (formData.brand ? brandModelsMap[formData.brand] || [] : []),
    [formData.brand]
  );

  // i18n option helpers
  const option = (obj, key, fallback) =>
    t[lang]?.createAnnonce?.[key] || fallback || key;

  const selectOptions = {
    type: [
      { value: 'Particulier', label: option(t, 'particulier', 'Particulier') },
      { value: 'Professionnel', label: option(t, 'professionnel', 'Professionnel') }
    ],
    origin: [
      { value: 'Dédouanée', label: option(t, 'dedouanee', 'Dédouanée') },
      { value: 'Pas Encore Dédouanée', label: option(t, 'pasDedouanee', 'Pas Encore Dédouanée') },
      { value: 'Ww Au Maroc', label: option(t, 'ww', 'Ww Au Maroc') },
      { value: 'Importée Neuve', label: option(t, 'importeeNeuve', 'Importée Neuve') }
    ],
    fuel: [
      { value: 'Diesel', label: option(t, 'diesel', 'Diesel') },
      { value: 'Essence', label: option(t, 'essence', 'Essence') },
      { value: 'Electrique', label: option(t, 'electrique', 'Electrique') },
      { value: 'Hybride', label: option(t, 'hybride', 'Hybride') }
    ],
    transmission: [
      { value: 'Manuelle', label: option(t, 'manuelle', 'Manuelle') },
      { value: 'Automatique', label: option(t, 'automatique', 'Automatique') }
    ]
  };

  // -- Handlers --
  function handleInputChange(field, value) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setValidationErrors(errors => ({ ...errors, [field]: undefined }));
  }

  function handlePhotoUpload(event) {
    const files = Array.from(event.target.files || []);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file
    }));
    const photos = [...formData.photos, ...newPhotos].slice(0, 10);
    handleInputChange('photos', photos);
  }

  function removePhoto(photoId) {
    handleInputChange(
      'photos',
      formData.photos.filter(photo => photo.id !== photoId)
    );
  }

  function validateForm() {
    let errors = {};
    REQUIRED_FIELDS.forEach(field => {
      if (!formData[field]) errors[field] = true;
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Place your network call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onSave) onSave(formData);
      if (onClose) onClose();
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  }

  

  // Completeness calculation
  const completeness = useMemo(() => {
    const total = Object.keys(FIELD_DEFAULTS).length;
    const filled = Object.entries(formData).filter(([k, v]) =>
      Array.isArray(v) ? v.length
      : typeof v === 'number' ? v > 0
      : !!v
    ).length;
    return Math.round((filled / total) * 100);
  }, [formData]);

  // UI
  return (
    <div className="create-annonce">
      <div className="create-annonce__container">
        {/* Header */}
        <div className="create-annonce__header">
          <div className="header-content">
            <div className="header-title">
              <h1>{option(t, 'title', 'Créer une annonce')}</h1>
              <p>{option(t, 'subtitle', 'Publiez votre véhicule en quelques minutes')}</p>
            </div>
            <div className="header-actions">
              <button
                onClick={onClose}
                type="button"
                className="create-annonce__button create-annonce__button--secondary bi bi-x-circle"
              >
                {option(t, 'cancel', 'Annuler')}
              </button>
             
              <button
                onClick={handleSave}
                type="button"
                disabled={loading}
                className={`create-annonce__button create-annonce__button--primary${loading ? ' loading' : ''} bi bi-check-circle`}
              >
                {loading ? 'Enregistrement...' : option(t, 'submit', 'Publier')}
              </button>
            </div>
          </div>
        </div>

        <div className="create-annonce__main-grid">
          {/* Main Content */}
          <div className="create-annonce__main-content">
            {/* ===== Infos véhicule ===== */}
            <div className="create-annonce__card">
              <h2 className="card-header bi bi-car-front-fill">
                {option(t, 'vehicleInfo', 'Informations du véhicule')}
              </h2>
              <div className="create-annonce__form">
                {/* Title */}
                <div className="form-field">
                  <label>
                    {option(t, 'annonceTitle', "Titre de l'annonce")} *
                    {validationErrors.title && <span style={{color: 'red'}}> *</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder={option(t, 'annonceTitle', "Ex: BMW Serie 3 - Excellent état")}
                  />
                </div>
                <div className="form-field">
                  <OptionSelector
  label={option(t, 'type', "Type d'annonceur") + " *"}
  name="type"
  options={selectOptions.type}
  value={formData.type}
  onChange={val => handleInputChange('type', val)}
/>
                </div>
                {/* Brand & Model */}
                <div className="form-group--grid-2">
                  <div className="form-field">
                    <label>
                      {option(t, 'brand', 'Marque')} *
                      {validationErrors.brand && <span style={{color: 'red'}}> *</span>}
                    </label>
                    <select
                      value={formData.brand}
                      onChange={e => {
                        handleInputChange('brand', e.target.value);
                        handleInputChange('model', "");
                      }}
                    >
                      <option value="">{option(t, 'selectBrand', 'Sélectionner une marque')}</option>
                      {BRANDS.map(val => (
                        <option key={val} value={val}>{val}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>
                      {option(t, 'model', 'Modèle')} *
                      {validationErrors.model && <span style={{color: 'red'}}> *</span>}
                    </label>
                    <select
                      value={formData.model}
                      onChange={e => handleInputChange('model', e.target.value)}
                      disabled={!formData.brand}
                    >
                      <option value="">{option(t, 'selectModel', "Sélectionner un modèle")}</option>
                      {models.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Year & City */}
                <div className="form-group--grid-2">
                  <div className="form-field">
                    <label>
                      {option(t, 'year', 'Année')} *
                      {validationErrors.year && <span style={{color: 'red'}}> *</span>}
                    </label>
                    <select
                      value={formData.year}
                      onChange={e => handleInputChange('year', e.target.value)}
                    >
                      <option value="">{option(t, 'selectYear', "Sélectionner une année")}</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>
                      {option(t, 'city', 'Ville')} *
                      {validationErrors.city && <span style={{color: 'red'}}> *</span>}
                    </label>
                    <select
                      value={formData.city}
                      onChange={e => handleInputChange('city', e.target.value)}
                    >
                      <option value="">{option(t, 'selectCity', "Sélectionner une ville")}</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Price */}
                <div className="form-field">
                  <label>
                    {option(t, 'price', 'Prix')} *
                    {validationErrors.price && <span style={{color: 'red'}}> *</span>}
                  </label>
                  <div className="price-input">
                    <input
                      type="number"
                      value={formData.price}
                      onChange={e => handleInputChange('price', Math.max(0, Number(e.target.value)))}
                      placeholder="0"
                      min="0"
                      inputMode="numeric"
                    />
                    <span className="currency-label">MAD</span>
                  </div>
                </div>
                {/* Description */}
                <div className="form-field">
                  <label>
                    {option(t, 'description', "Description")}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    placeholder={option(t, 'descriptionPlaceholder', 'Décrivez votre véhicule...')}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* ===== Détails véhicule ===== */}
            <div className="create-annonce__card">
              <h2 className="card-header bi bi-cogs">{option(t, 'vehicleDetails', 'Détails du véhicule')}</h2>
              <div className="create-annonce__form">
                {/* Mileage (range) */}
                <div className="create-annonce__range-slider">
                  <label>
                    {option(t, 'mileage', 'Kilométrage')} *
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="800000"
                    step="1000"
                    value={formData.mileage}
                    onChange={e => handleInputChange('mileage', Number(e.target.value))}
                    className="range-input"
                  />
                  <div className="range-labels">
                    <span>0 km</span>
                    <span className="current-value">{formData.mileage.toLocaleString()} km</span>
                    <span>800,000 km</span>
                  </div>
                </div>
                {/* Origin & Fuel */}
                <div className="form-group--grid-2">
                           <OptionSelector label={t[lang].createAnnonce.origin} name="origin" value={formData.origin} options={originOptions} onChange={(v) => handleInputChange('origin', v)}  />
        <OptionSelector label={t[lang].createAnnonce.fuel} name="fuel" value={formData.fuel} options={fuelOptions} onChange={(v) => handleInputChange('fuel', v)}  />
        <OptionSelector label={t[lang].createAnnonce.doors} name="doors" value={formData.doors} options={doorOptions} onChange={(v) => handleInputChange('doors', v)} />
        <OptionSelector label={t[lang].createAnnonce.firstHand} name="firstHand" value={formData.firstHand} options={firstHandOptions} onChange={(v) => handleInputChange('firstHand', v)} />
        <OptionSelector label={t[lang].createAnnonce.transmission} name="transmission" value={formData.transmission} options={transmissionOptions} onChange={(v) => handleInputChange('transmission', v)} />
                  
                </div>
              </div>
            </div>

          
          </div>

          {/* Sidebar (Preview, Quick stats) */}
          <div className="create-annonce__sidebar">
            {/* Preview */}
            <div className="create-annonce__card">
              <h3 className="card-header bi bi-eye">{option(t, "preview", "Aperçu")}</h3>
              <div className="create-annonce__preview">
                <div className="preview-card">
                  <div className="preview-image">
                    {formData.photos.length > 0
                      ? <img src={formData.photos[0].url} alt="Vehicle preview" />
                      : <div className="bi bi-car" aria-label="No vehicle image"></div>
                    }
                  </div>
                  <h4 className="preview-title">{formData.title || option(t, "annonceTitle", "Titre de l'annonce")}</h4>
                  <p className="preview-subtitle">{`${formData.brand} ${formData.model} • ${formData.year}`}</p>
                  <p className="preview-location">
                    <span className="bi bi-geo-alt" /> {formData.city || option(t, 'city', 'Ville')}
                  </p>
                  <p className="preview-price">
                    {formData.price ? `${Number(formData.price).toLocaleString()} MAD` : option(t, 'price', 'Prix')}
                  </p>
                  <p className="preview-details">
                    {`${formData.mileage.toLocaleString()} km • ${formData.fuel}`}
                  </p>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="create-annonce__card">
              <h3 className="card-header">
                {option(t, "quickStats", "Statistiques rapides")}
              </h3>
              <div className="create-annonce__stats">
                <div className="stats-list">
                  <div className="stats-item">
                    <span className="stats-label">{option(t, 'photos', 'Photos')}</span>
                    <span className="stats-value">{formData.photos.length}/10</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">{option(t, 'completeness', 'Complétude')}</span>
                    <span className="stats-value">{completeness}%</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">{option(t, 'type', 'Type')}</span>
                    <span className="stats-value">{formData.type}</span>
                  </div>
                </div>
              </div>
                          {/* ===== Photos ===== */}

            </div>
              <div className="create-annonce__card">
              <h2 className="card-header bi bi-camera">{option(t, "uploadPhotos", "Photos du véhicule")}</h2>
              <div className="create-annonce__photo-upload">
                <div className="upload-area">
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo-upload" tabIndex={0}>
                    <div className="upload-icon bi bi-image"></div>
                    <p className="upload-text">{option(t, "addPhotos", "Ajouter des photos")}</p>
                    <p className="upload-limit">{option(t, "photoLimit", "Maximum 10 photos")}</p>
                  </label>
                </div>
                {formData.photos.length > 0 &&
                  <div className="photo-grid">
                    {formData.photos.map(photo => (
                      <div key={photo.id} className="photo-item">
                        <img src={photo.url} alt="Vehicle" />
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="photo-remove bi bi-x-circle"
                          type="button"
                          aria-label={option(t, 'deletePhoto', 'Supprimer')}
                        />
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div> {/* --container-- */}
    </div>
  );
};

export default CreateAnnonce;
