import React, { useContext, useEffect, useState } from "react";
import Footer2 from "@/components/footer/footer-2";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import "@/../public/sass/alerts/createAlert.scss";
import "@/../public/sass/components/createForm.scss";
import { useNavigate } from "react-router-dom";
import { getNames, getModels, getCity, getSect,
    getSources, getChips, getSliders, sendData, getProduct } from "@/apis/addAlertsApi.js";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import OptionSelector from "@/components/Annonces/OptionSelector";
import SwitchSelector from './switchSelector';

import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { LoadingAnimation } from '@/components/animation/LoadingAnimation';

const metadata = {
  title: "Add Alerts || SmartAlert",
};

export default function CreateAlert() {
  const lang = useContext(LanguageContext);
  const navigate = useNavigate();
  // Essentials
  const [productId, setProductId] = useState('');
  
  
  /**
   * @typedef {Object} Brand
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} Model
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} City
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} Sector
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} Source
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} ChipValue
   * @property {string} value
   * @property {Object.<string, string>} [translations]
   */
  /**
   * @typedef {Object} Chip
   * @property {string|number} id
   * @property {string} label
   * @property {ChipValue[]} valeurs
   */
  /**
   * @typedef {Object} Slider
   * @property {string|number} id
   * @property {string} label
   * @property {number|string} minValue
   * @property {number|string} maxValue
   */
  /**
   * @typedef {Object} FormChip
   * @property {string} value
   * @property {string} label
   */
  /**
   * @typedef {Object} FormSlider
   * @property {{min: number, max: number}} value
   */
  /**
   * @typedef {Object} FormState
   * @property {{value?: string, label?: string}|string} brand
   * @property {{value?: string, label?: string}|string} model
   * @property {{value?: string, label?: string}|string} city
   * @property {{value?: string, label?: string}|string} sector
   * @property {{value?: string, label?: string}|string} source
   * @property {Object.<string, FormChip>} chips
   * @property {Object.<string, FormSlider>} sliders
   * @property {string} label
   */

  /** @type {[Brand[], Function]} */
  const [brands, setBrands] = useState([]);
  
  /** @type {[Model[], Function]} */
  const [models, setModels] = useState([]);
  
  /** @type {[City[], Function]} */
  const [cities, setCities] = useState([]);
  
  /** @type {[Sector[], Function]} */
  const [sectors, setSectors] = useState([]);
  
  /** @type {[Source[], Function]} */
  const [sources, setSources] = useState([]);
  
  // Chips & Sliders
  /** @type {[Chip[], Function]} */
  const [chips, setChips] = useState([]);
  
  /** @type {[Slider[], Function]} */
  const [sliders, setSliders] = useState([]);
  
  // Form values
  /** @type {[FormState, Function]} */
  const [form, setForm] = useState({
    brand: "",
    model: "",
    city: "",
    sector: "",
    source: "",
    chips: {},
    sliders: {},
    label: "",
  });
  const [openingLoading, setOpeningLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // Remove useEffect for steps
  // useEffect(()=>{
  //   setSteps(t[lang.lang || lang].alert.form.steps);
  // }, [])

  useEffect(()=>{
    getProduct().then((id)=>{
      console.log({prod: id})
      setProductId(id);
    })
  }, [])

  // Fetch all data on mount
  useEffect(() => {
    setLoading(true);
    getProduct().then((id) => {
      setProductId(id);
      Promise.all([
        getNames(id, lang),
        getCity(lang),
        getSources(lang),
        getChips(id, 'fr'),
        getSliders(id, 'fr'),
      ]).then(([brands, cities, sources, chips, sliders]) => {
        setBrands(brands);
        setCities(cities);
        setSources(sources);
        console.log({chips});
        setChips(chips);
        setSliders(sliders);
        setLoading(false);
        setOpeningLoading(false);
      }).catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
        setOpeningLoading(false);
      });
    }).catch(err => {
      console.error('Error getting product:', err);
      setLoading(false);
      setOpeningLoading(false);
    });
  }, [lang]);

  // Fetch models when brand changes
  useEffect(() => {
    if (!form.brand || !form.brand.value) {
      setModels([]);
      return;
    }
    setLoading(true);
    getModels(form.brand.value, 'fr').then(models => {
      console.log('models:', models);
      setModels(models);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching models:', err);
      setLoading(false);
    });
  }, [form.brand]);

  // Fetch sectors when city changes
  useEffect(() => {
    if (!form.city || !form.city.value) {
      setSectors([]);
      return;
    }
    setLoading(true);
    getSect(form.city.value, 'fr').then(sectors => {
      console.log('sectors:', sectors);
      setSectors(sectors);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching sectors:', err);
      setLoading(false);
    });
  }, [form.city]);

  const handleChange = (field, value, id, label='') => {
    // Store both value and label for maintainability
    setForm(f => ({ ...f, [field]: value && id ? { id, value, label } : '' }));
  };

  const handleChipChange = (chipId, chipName, value) => {
    const _new = !form.chips[chipName] || form.chips[chipName].value !== value 
    console.log({form: form.chips})
    setForm(f => ({
      ...f,
      chips: {
        ...f.chips,
        [chipName]: _new && value ? { id: chipId, value } : undefined,
      },
    }));
  };

  const handleSliderChange = (sliderId, sliderName, value) => {
    setForm(f => ({
      ...f,
      sliders: {
        ...f.sliders,
        [sliderName]: value ? { id: sliderId, value } : undefined,
      },
    }));
  };

  const handleLabelChange = (value) => {
    setForm(f => ({ ...f, label: value ? { value } : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const color = '#FF8800'; // or get from user input
    const productId = await getProduct();
    const done = await sendData(productId, form, form.label, color, lang);
    
    setLoading(false);
    if (!done) {
      // Show notification to user
      alert(t[lang.lang||lang].alert.form.opfailed);
      return;
    }
    navigate("/alerts");
  };
  let a = 0
  return (
    openingLoading ? (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(255,255,255,0.8)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingAnimation />
        </div>
    ) : (
      <>
    <MetaComponent meta={metadata} />
    <div className="header-margin" style={{height: "1vh"}}></div>
    <Header1 />
    <div className="create-annonce">
      <div className="create-annonce__container">
        {/* Header */}
        <div className="create-annonce__header">
          <div className="header-content">
            <div className="header-title">
              <h1>{t[lang.lang || lang].alert.form.createTitle}</h1>
              <p>{t[lang.lang || lang].alert.form.subtitle || ''}</p>
            </div>
            <div className="header-actions">
              <button
                onClick={() => navigate('/alerts')}
                type="button"
                className="create-annonce__button create-annonce__button--secondary bi bi-x-circle"
              >
                {t[lang.lang || lang].createAnnonce.cancel}
              </button>
              <button
                type="submit"
                form="alert-form"
                className="create-annonce__button create-annonce__button--primary bi bi-check-circle"
                disabled={loading}
              >
                {loading ? (t[lang.lang || lang]?.loading || 'Loading...') : t[lang.lang || lang].alert.form.submit}
              </button>
            </div>
          </div>
        </div>
        <div className="create-annonce__main-grid">
          {/* Main Content */}
          <div className="create-annonce__main-content">
            <div className="create-annonce__card">
              <h2 className="card-header bi bi-bell-fill">
                {t[lang.lang || lang].alert.form.createTitle}
              </h2>
              <form id="alert-form" className="create-annonce__form" onSubmit={handleSubmit}>
                {/* Label */}
                <div className="form-group m-12">
                  <label>{t[lang.lang || lang].alert.form.alertLabel}</label>
                  <input className="form-control" 
                    value={form.label.value || ''} 
                    onChange={e => handleLabelChange(e.target.value)} 
                    required placeholder={t[lang.lang || lang].alert?.form?.labelPlaceHolder} 
                    style={{marginBottom: "17px"}}/>
                </div>
                {/* Essentials */}
                  <div className="form-group--grid-2">
                    <div className="form-field">
                      <label>{t[lang.lang || lang].alert?.form['source']|| 'source'}</label>
                      <select className="form-control" value={form.source?.value || ''} onChange={e => {
                        const selected = sources.find(s => s.value === e.target.value);
                        handleChange('source', selected?.value, selected?.value, selected?.label);
                      }} required disabled={sources.length === 0}>
                        {sources.length === 0 && <option value="">{t[lang.lang || lang].alert?.form.noOption || 'Pas d\'options'}</option>}
                        {sources.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label>{t[lang.lang || lang].alert?.form['brand'] || 'brand'}</label>
                      <select className="form-control" value={form.brand?.value || ''} onChange={e => {
                        const selected = brands.find(b => b.value === e.target.value);
                        handleChange('brand', selected?.value, selected?.value, selected?.label);
                      }} required disabled={brands.length === 0}>
                        {brands.length === 0 && <option value="">{t[lang.lang || lang].alert?.form.noOption || 'Pas d\'options'}</option>}
                        {brands.map(b => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Model only shown after brand is selected */}
                  {form.brand && form.brand.value && (
                    <div className="form-field" >
                      <label>{t[lang.lang || lang].alert?.form['Model']}</label>
                      <select className="form-control" value={form.model?.value || ''} onChange={e => {
                        const selected = models.find(m => m.value === e.target.value);
                        handleChange('model', selected?.value, selected?.value, selected?.label);
                      }} required disabled={models && models.length === 0}>
                        {models?.length === 0 && <option value="">{t[lang.lang || lang].alert?.form.noOption || 'Pas d\'options'}</option>}
                        {models?.map(m => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="form-group--grid-2">
                    <div className="form-field">
                      <label>{t[lang.lang || lang].alert?.form['City'] || 'city'}</label>
                      <select className="form-control" value={form.city?.value || ''} onChange={e => {
                        const selected = cities.find(c => c.value === e.target.value);
                        handleChange('city', selected?.value, selected?.value, selected?.label);
                      }} required disabled={cities.length === 0}>
                        {cities.length === 0 && <option value="">{t[lang.lang || lang].alert?.form.noOption || 'Pas d\'options'}</option>}
                        {cities.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    {/* Sector only shown after city is selected */}
                    {form.city && form.city.value && (
                      <div className="form-field">
                        <label>{t[lang.lang || lang].alert?.form['sector']|| 'Sector'}</label>
                        <select className="form-control" value={form.sector?.value || ''} onChange={e => {
                          const selected = sectors.find(s => s.value === e.target.value);
                          handleChange('sector', selected?.value, selected?.value, selected?.label);
                        }} required disabled={sectors.length === 0}>
                          {sectors.length === 0 && <option value="">{t[lang.lang || lang].alert?.form.noOption || 'Pas d\'options'}</option>}
                          {sectors.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                {/* Chips */}
                <div className="form-group--grid-2">
                  {chips.map(chip => {
                    if (chip.valeurs.length === 1) {
                      // Render a styled switch for boolean chips (true/false)
                      const isActive = form.chips[chip.label]?.value === "true" || form.chips[chip.label]?.value === true;
                      return (
                        <SwitchSelector
                          key={chip.id}
                          label={t[lang.lang]?.alert?.form?.[chip.label] || chip.label}
                          // checked={isActive}
                          onChange={checked => handleChipChange(chip.id, chip.label, checked ? "true" : "")}
                          activeLabel={t[lang.lang]?.alert?.form?.active || 'Active'}
                          inactiveLabel={t[lang.lang]?.alert?.form?.inactive || 'Inactive'}
                          id={`switch-${chip.label}`}
                        />
                      );
                    }
                    return (
                      <OptionSelector
                        label={t[lang.lang]?.alert?.form?.[chip.label] || chip.label}
                        key={chip.id}
                        name={chip.label}
                        value={form.chips[chip.label]?.value || ""}
                        options={chip.valeurs.map(optionObject => ({
                          label: optionObject.translations?.[lang.lang] || optionObject.value,
                          value: optionObject.value
                        }))}
                        onChange={v => handleChipChange(chip.id, chip.label, v)}
                      />
                    );
                  })}
                </div>
                {/* Sliders */}
                <div className="form-group">
                  {sliders.map((slider, sliderIdx) => {
                    const translatedLabel = t[lang.lang || lang]?.alert?.info?.[slider.label] || slider.label;
                    const minValue = Number(slider.minValue);
                    const maxValue = Number(slider.maxValue);
                    const sliderValue = form.sliders[slider.label]?.value || { min: minValue, max: maxValue };
                    return (
                      <div key={slider.id} style={{ marginBottom: 20 }}>
                        <label>{translatedLabel}</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 }}>
                          <input
                            type="number"
                            min={minValue}
                            max={sliderValue.max}
                            value={sliderValue.min}
                            onChange={e => {
                              let val = Number(e.target.value);
                              if (val > sliderValue.max) val = sliderValue.max;
                              if (val < minValue) val = minValue;
                              handleSliderChange(slider.id, slider.label, { min: val, max: sliderValue.max });
                            }}
                            className="form-control"
                            style={{ width: 90 }}
                          />
                          <span style={{ fontSize: 14, color: '#666' }}>{t[lang.lang || lang].alert?.form?.to}</span>
                          <input
                            type="number"
                            min={sliderValue.min}
                            max={maxValue}
                            value={sliderValue.max}
                            onChange={e => {
                              let val = Number(e.target.value);
                              if (val < sliderValue.min) val = sliderValue.min;
                              if (val > maxValue) val = maxValue;
                              handleSliderChange(slider.id, slider.label, { min: sliderValue.min, max: val });
                            }}
                            className="form-control"
                            style={{ width: 90 }}
                          />
                        </div>
                        <div style={{ padding: '0 10px' }} 
                        className="rg-c">
                          <InputRange
                            minValue={minValue}
                            maxValue={maxValue}
                            value={sliderValue}
                            onChange={(value) => handleSliderChange(slider.id, slider.label, value)}
                            formatLabel={() => ''}
                            // classNames='rg-c'
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
          </div>
          {/* Sidebar (Preview, Quick stats) */}
          <div className="create-annonce__sidebar">
            <div className="create-annonce__card">
              <h3 className="card-header bi bi-eye">{t[lang.lang || lang].alert.form.preview || 'Aperçu'}</h3>
              <div className="create-annonce__preview">
                <div className="preview-card">
                  <h4 className="preview-title">{form.label.value || t[lang.lang || lang].alert.form.alertLabel}</h4>
                  <p className="preview-subtitle">{[form.brand?.label, form.model?.label].filter(Boolean).join(' ')}</p>
                  <p className="preview-location">
                    <span className="bi bi-geo-alt" /> {form.city?.label || t[lang.lang || lang].alert?.form['City']}
                  </p>
                  <p className="preview-details">
                    {Object.entries(form.chips).map(([k, v]) => v?.value).filter(Boolean).join(' • ')}
                  </p>
                </div>
              </div>
            </div>
            <div className="create-annonce__card">
              <h3 className="card-header">{t[lang.lang || lang].alert.form.quickStats || 'Statistiques rapides'}</h3>
              <div className="create-annonce__stats">
                <div className="stats-list">
                  <div className="stats-item">
                    <span className="stats-label">{t[lang.lang || lang].alert?.form['brand'] || 'brand'}</span>
                    <span className="stats-value">{form.brand?.label || '-'}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">{t[lang.lang || lang].alert?.form['Model'] || 'model'}</span>
                    <span className="stats-value">{form.model?.label || '-'}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">{t[lang.lang || lang].alert?.form['City'] || 'city'}</span>
                    <span className="stats-value">{form.city?.label || '-'}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">{t[lang.lang || lang].alert.form.alertLabel}</span>
                    <span className="stats-value">{form.label.value || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>
    )
);
} 