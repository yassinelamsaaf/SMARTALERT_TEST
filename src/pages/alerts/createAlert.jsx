import React, { useContext, useEffect, useState } from "react";
import Footer2 from "@/components/footer/footer-2";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import "@/../public/sass/alerts/createAlert.scss";
import { useNavigate } from "react-router-dom";
import {
  getNames,
  getModels,
  getCity,
  getSect,
  getSources,
  getChips,
  getSliders,
  sendData,
  getProduct,
} from "@/apis/mockAPI/addAlertsApi.js";

import INEButton from "@/components/common/MyButton";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { getImgPath } from "@/utils/imageUtils";

const metadata = {
  title: "Add Alerts || SmartAlert",
};

export default function CreateAlert() {
  const lang = useContext(LanguageContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  // Essentials
  const [productId, setProductId] = useState("");
  const [steps, setSteps] = useState([
    "Essentials",
    "Chips",
    "Sliders",
    "Label",
  ]);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sources, setSources] = useState([]);
  const img = getImgPath("pages/alerts/to-right.png");
  // Chips & Sliders
  const [chips, setChips] = useState([]);
  const [sliders, setSliders] = useState([]);
  // Form values
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSteps(t[lang.lang || lang].alert.form.steps);
  }, []);

  useEffect(() => {
    getProduct().then((id) => {
      console.log({ prod: id });
      setProductId(id);
    });
  }, []);

  // Fetch essentials on mount
  useEffect(() => {
    setStep(0);
    setForm({
      brand: "",
      model: "",
      city: "",
      sector: "",
      source: "",
      chips: {},
      sliders: {},
      label: "",
    });
    setLoading(true);
    if (!productId) return;
    Promise.all([
      getNames(productId, lang), // TODO: get the id
      getCity(lang),
      getSources(lang),
    ]).then(([brands, cities, sources]) => {
      console.log("brands:", brands);
      console.log("cities:", cities);
      console.log("sources:", sources);
      setBrands(brands);
      setCities(cities);
      setSources(sources);
      setLoading(false);
    });
  }, [productId]);

  // Fetch models when brand changes
  useEffect(() => {
    if (!form.brand || !form.brand.value) return setModels([]);
    setLoading(true);
    getModels(form.brand.value, "fr").then((models) => {
      console.log("models:", models);
      setModels(models);
      setLoading(false);
    });
  }, [form.brand]);

  // Fetch sectors when city changes
  useEffect(() => {
    if (!form.city || !form.city.value) return setSectors([]);
    setLoading(true);
    getSect(form.city.value, "fr").then((sectors) => {
      console.log("sectors:", sectors);
      setSectors(sectors);
      setLoading(false);
    });
  }, [form.city]);

  // Fetch chips on step 1
  useEffect(() => {
    if (step !== 1) return;
    setLoading(true);
    getProduct().then((productId) => {
      getChips(productId, "fr").then((chips) => {
        console.log("chips:", chips);
        setChips(chips);
        setLoading(false);
      });
    });
  }, [step]);

  // Fetch sliders on step 2
  useEffect(() => {
    if (step !== 2) return;
    setLoading(true);
    getProduct().then((productId) => {
      getSliders(productId, "fr").then((sliders) => {
        console.log("sliders:", sliders);
        setSliders(sliders);
        setLoading(false);
      });
    });
  }, [step]);

  const handleChange = (field, value, id, label = "") => {
    // Store both value and label for maintainability
    setForm((f) => ({
      ...f,
      [field]: value && id ? { id, value, label } : "",
    }));
  };

  const handleChipChange = (chipId, chipName, value) => {
    setForm((f) => ({
      ...f,
      chips: {
        ...f.chips,
        [chipName]: value ? { id: chipId, value } : undefined,
      },
    }));
  };

  const handleSliderChange = (sliderId, sliderName, value) => {
    setForm((f) => ({
      ...f,
      sliders: {
        ...f.sliders,
        [sliderName]: value ? { id: sliderId, value } : undefined,
      },
    }));
  };

  const handleLabelChange = (value) => {
    setForm((f) => ({ ...f, label: value ? { value } : "" }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const color = "#FF8800"; // or get from user input
    const productId = await getProduct();
    const done = await sendData(productId, form, form.label, color, lang);

    setLoading(false);
    if (!done) {
      // Show notification to user
      alert(t[lang.lang || lang].alert.form.opfailed);
      return;
    }
    navigate("/alerts");
  };
  let a = 0;
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin" style={{ height: "1vh" }}></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}
      <div className="container" style={{ maxWidth: 600, margin: "5vh auto" }}>
        <button className="btn btn-light" onClick={() => navigate("/alerts")}>
          {t[lang.lang || lang].alert.form.goBack}
        </button>
        <div className="alert-filter-card" style={{ marginTop: 32 }}>
          <h4 style={{ marginBottom: "1.5rem" }}>
            {t[lang.lang || lang].alert.form.createTitle}
          </h4>
          {/* Progress Bar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {steps.map((label, idx) => {
              return (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    background: idx <= step ? "#FF8800" : "#e0e0e0",
                    transition: "background 0.3s",
                  }}
                />
              );
            })}
          </div>
          <div className="mb-3">
            <b>
              {t[lang.lang || lang].alert.form.step} {step + 1}:
            </b>{" "}
            {steps[step]}
          </div>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <div className="form-group">
                <label>
                  {t[lang.lang || lang].alert?.form["source"] || "source"}
                </label>
                <select
                  className="form-control"
                  value={form.source?.value || ""}
                  onChange={(e) => {
                    const selected = sources.find(
                      (s) => s.value === e.target.value
                    );
                    handleChange(
                      "source",
                      selected?.value,
                      selected?.value,
                      selected?.label
                    );
                  }}
                  required
                  disabled={sources.length === 0}
                >
                  {sources.length === 0 && <option value="">No options</option>}
                  {sources.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <label>
                  {t[lang.lang || lang].alert?.form["brand"] || "brand"}
                </label>
                <select
                  className="form-control"
                  value={form.brand?.value || ""}
                  onChange={(e) => {
                    const selected = brands.find(
                      (b) => b.value === e.target.value
                    );
                    handleChange(
                      "brand",
                      selected?.value,
                      selected?.value,
                      selected?.label
                    );
                  }}
                  required
                  disabled={brands.length === 0}
                >
                  {brands.length === 0 && <option value="">No options</option>}
                  {brands.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                {/* Model only shown after brand is selected */}
                {form.brand && form.brand.value && (
                  <>
                    <label>{t[lang.lang || lang].alert?.form["Model"]}</label>
                    <select
                      className="form-control"
                      value={form.model?.value || ""}
                      onChange={(e) => {
                        const selected = models.find(
                          (m) => m.value === e.target.value
                        );
                        handleChange(
                          "model",
                          selected?.value,
                          selected?.value,
                          selected?.label
                        );
                      }}
                      required
                      disabled={models && models.length === 0}
                    >
                      {models?.length === 0 && (
                        <option value="">No options</option>
                      )}
                      {models?.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <label>
                  {t[lang.lang || lang].alert?.form["City"] || "city"}
                </label>
                <select
                  className="form-control"
                  value={form.city?.value || ""}
                  onChange={(e) => {
                    const selected = cities.find(
                      (c) => c.value === e.target.value
                    );
                    handleChange(
                      "city",
                      selected?.value,
                      selected?.value,
                      selected?.label
                    );
                  }}
                  required
                  disabled={cities.length === 0}
                >
                  {cities.length === 0 && <option value="">No options</option>}
                  {cities.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {/* Sector only shown after city is selected */}
                {form.city && form.city.value && (
                  <>
                    <label>
                      {t[lang.lang || lang].alert?.form["sector"] || "Sector"}
                    </label>
                    <select
                      className="form-control"
                      value={form.sector?.value || ""}
                      onChange={(e) => {
                        const selected = sectors.find(
                          (s) => s.value === e.target.value
                        );
                        handleChange(
                          "sector",
                          selected?.value,
                          selected?.value,
                          selected?.label
                        );
                      }}
                      required
                      disabled={sectors.length === 0}
                    >
                      {sectors.length === 0 && (
                        <option value="">No options</option>
                      )}
                      {sectors.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            )}
            {step === 1 && (
              <div className="form-group">
                {chips.map((chip) => {
                  let usedLang = lang;
                  if (typeof lang !== "string") usedLang = lang.lang;
                  return (
                    <div key={chip.id} style={{ marginBottom: 12 }}>
                      <label>
                        {t[usedLang].alert.info[chip.label] || chip.label}
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginTop: 6,
                        }}
                      >
                        {chip.valeurs.map((val) => {
                          const langKey =
                            typeof lang === "string"
                              ? lang
                              : lang?.lang || "fr";
                          const translatedLabel =
                            val.translations && val.translations[langKey]
                              ? val.translations[langKey]
                              : val.value;
                          return (
                            <button
                              type="button"
                              key={val.value}
                              className={`btn ${
                                form.chips[chip.label]?.value === val.value
                                  ? "btn-primary"
                                  : "btn-light"
                              }`}
                              style={{
                                borderRadius: 20,
                                padding: "4px 18px",
                                fontWeight: 500,
                              }}
                              onClick={() =>
                                handleChipChange(
                                  chip.id,
                                  chip.label,
                                  form.chips[chip.label]?.value === val.value
                                    ? ""
                                    : val.value
                                )
                              }
                            >
                              {translatedLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {step === 2 && (
              <div className="form-group">
                <label>
                  {t[lang.lang || lang].alert?.form["sliders"] || "Sliders"}
                </label>
                {sliders.map((slider, sliderIdx) => {
                  const sliderValue = form.sliders[slider.label]?.value || {
                    min: slider.minValue,
                    max: slider.maxValue,
                  };
                  return (
                    <div key={slider.id} style={{ marginBottom: 20 }}>
                      <label>{slider.label}</label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 6,
                        }}
                      >
                        <input
                          type="number"
                          min={slider.minValue}
                          max={sliderValue.max}
                          value={sliderValue.min}
                          onChange={(e) =>
                            handleSliderChange(slider.id, slider.label, {
                              ...sliderValue,
                              min: Number(e.target.value),
                            })
                          }
                          className="form-control"
                          style={{ width: 90 }}
                        />
                        <span>to</span>
                        <input
                          type="number"
                          min={sliderValue.min}
                          max={slider.maxValue}
                          value={sliderValue.max}
                          onChange={(e) =>
                            handleSliderChange(slider.id, slider.label, {
                              ...sliderValue,
                              max: Number(e.target.value),
                            })
                          }
                          className="form-control"
                          style={{ width: 90 }}
                        />
                      </div>
                      <input
                        type="range"
                        min={slider.minValue}
                        max={slider.maxValue}
                        value={sliderValue.min}
                        onChange={(e) =>
                          handleSliderChange(slider.id, slider.label, {
                            ...sliderValue,
                            min: Number(e.target.value),
                          })
                        }
                        className="form-control"
                        style={{ marginTop: 8 }}
                      />
                      <input
                        type="range"
                        min={slider.minValue}
                        max={slider.maxValue}
                        value={sliderValue.max}
                        onChange={(e) =>
                          handleSliderChange(slider.id, slider.label, {
                            ...sliderValue,
                            max: Number(e.target.value),
                          })
                        }
                        className="form-control"
                        style={{ marginTop: 4 }}
                      />
                      <div
                        style={{ fontSize: 13, color: "#888", marginTop: 2 }}
                      >
                        Selected: {sliderValue.min} to {sliderValue.max}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {step === 3 && (
              <div className="form-group">
                <label>Alert Label</label>
                <input
                  className="form-control"
                  value={form.label.value || ""}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  required
                  placeholder="Enter alert label"
                />
              </div>
            )}
            <div
              className="d-flex"
              style={{ marginTop: 24, justifyContent: "space-between" }}
            >
              {/* The Create Alert button remains for the last step */}
              {step === steps.length - 1 && (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {t[lang.lang || lang].alert.form.createTitle}
                </button>
              )}
            </div>
          </form>
          {/* Fixed-position navigation buttons */}
          {/* Back Button (bottom left) */}
          {step > 0 && (
            <div className="alert-listpage-back-btn-wrapper">
              <INEButton
                icon={img}
                onClick={handleBack}
                size={56}
                alt="Back"
                title="Back"
                className="shadow btn-light my-squared-btn--scale"
                imgStyle={{ transform: "scaleX(-1)" }}
              />
            </div>
          )}
          {/* Next Button (bottom right) */}
          {step < steps.length - 1 && (
            <div className="alert-listpage-next-btn-wrapper">
              <INEButton
                icon={img}
                onClick={handleNext}
                size={56}
                alt="Next"
                title="Next"
                className="shadow btn-primary my-squared-btn--scale"
                disabled={loading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
