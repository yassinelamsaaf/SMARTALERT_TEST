// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import I18n from "../config/i18n";
// import Config from "react-native-config"
// import { I18nManager } from "react-native";
// import * as utils from "../utilites/globalFunctions";
// import * as SecureStore from "expo-secure-store";
import { getToken } from "@/utils/auth";
import axios_instance from "./axios";
import t from "@/i18n/t";

// Helper to get translation by key path, e.g. getTranslation('fr', ['AddAlert', 'all'])
function getTranslation(lang, keyPath) {
  let obj = t[lang] || t['fr'];
  for (let k of keyPath) {
    if (!obj) return '';
    obj = obj[k];
  }
  return obj || '';
}

// LocalStorage helpers
function getCachedNames() {
  return localStorage.getItem("names");
}
function setCachedNames(data) {
  localStorage.setItem("names", JSON.stringify(data));
}
function removeCachedNames() {
  localStorage.removeItem("names");
}

function getCachedCities() {
  return localStorage.getItem("cities");
}
function setCachedCities(data) {
  localStorage.setItem("cities", JSON.stringify(data));
}
function removeCachedCities() {
  localStorage.removeItem("cities");
}

function getCachedChips() {
  return localStorage.getItem("chips");
}
function setCachedChips(data) {
  localStorage.setItem("chips", JSON.stringify(data));
}
function removeCachedChips() {
  localStorage.removeItem("chips");
}

function getCachedSliders() {
  return localStorage.getItem("sliders");
}
function setCachedSliders(data) {
  localStorage.setItem("sliders", JSON.stringify(data));
}
function removeCachedSliders() {
  localStorage.removeItem("sliders");
}

function getFetchExpiration() {
  return localStorage.getItem("fetchExpiration");
}
function setFetchExpiration() {
  localStorage.setItem("fetchExpiration", Date.now() + '');
}

/**
 * Retrieves the first product ID from the products list
 * @returns {Promise<string>} The ID of the first product
 * @throws {Object} Error object on API failure
 */
export async function getProduct() {
  return axios_instance
    .get(`/api/products`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then((response) => {
      return response.data[0].id;
    }).catch(err => { throw err });
}

/**
 * Retrieves car brand names for a specific car ID with caching support
 * @param {string} carId - The car ID to get brands for
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   value: string|number
 * }>>} Array of brand options with "all" option prepended
 * @throws {Object} Error object on API failure, returns empty array on error
 */
export async function getNames(carId, lang) {
  console.log(carId);
  const expiration = getFetchExpiration();
  if (expiration) {
    if (Date.now() - parseInt(expiration) > 7 * 24 * 60 * 60 * 1000) {
      removeCachedNames();
    }
  }
  const setNames = (data) => {
    let itemsNameResult = [];
    for (let index = 0; index < data[0].valeurs.length; index++) {
      itemsNameResult.push({
        label: data[0].valeurs[index].translations[lang] ?? data[0].valeurs[index].value,
        value: data[0].id + "|" + data[0].valeurs[index].id + "|" + data[0].valeurs[index].key,
      });
    }
    itemsNameResult.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { sensitivity: 'base' }));
    itemsNameResult.unshift({
      label: getTranslation(lang, ["AddAlert", "all"]),
      value: 0,
    });
    return itemsNameResult;
  };
  let names = getCachedNames();
  let itemsNameResult = [];
  if (expiration && names) {
    names = JSON.parse(names);
    itemsNameResult = setNames(names);
    return itemsNameResult;
  }
  return axios_instance
    .get(`/api/combo-lists/product/${carId}`)
    .then((response) => {
      let data = response.data;
      itemsNameResult = setNames(data);
      setCachedNames(data);
      setFetchExpiration();
      return itemsNameResult;
    })
    .catch(err => {
      console.log("couldn't get names");
      return [];
    });
}

/**
 * Retrieves car models for a specific brand ID
 * @param {string} carId - The car ID containing brand information (format: "productId|brandId|key")
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   value: string|number
 * }>>} Array of model options with "all" option prepended
 * @throws {Object} Error object on API failure
 */
export async function getModels(carId, lang) {
  let itemsModelResult = [] // { label: string; value?: string | number }[]
  // console.log("car id ", carId, token);
  console.log(carId);
  return axios_instance
    .get(
      `/api/valeurs/comboListParent/${carId.split('|')[1]}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    )
    .then((response) => {
      let data = response.data.valeurs;
      // console.log("model::: ",response.data);

      for (let index = 0; index < data.length; index++) {
        itemsModelResult.push({
          label: data[index].translations[lang] ??
            data[index].value,
          value: response.data.id + "|" + data[index].id + "|" + data[index].key,
        });
      }
      // console.log("models:", itemsModelResult);
      itemsModelResult.sort((a /* { label: string } */, b /* { label: any } */) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { sensitivity: 'base' })
      );
      itemsModelResult.unshift({
        label: getTranslation(lang, ["AddAlert", "all"]),
        value: 0,
      });
      return itemsModelResult;
    })
    .catch((e) => {
      console.log(e);
    });
}

/**
 * Retrieves cities list with caching support
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   value: number
 * }>>} Array of city options with "all" option prepended
 * @throws {Object} Error object on API failure, returns empty array on error
 */
export async function getCity(lang) {
  return axios_instance
    .get(`/api/cities?sort=popular,desc&sort=label,asc&size=7000&page=0`)
    .then((response) => {
      let data = response.data;
      // Map to {label, value} and filter out any empty/invalid entries
      console.log({data})
      let itemsCityResult = data
        .filter(city => city && city.id && (city.label || (city.translations && city.translations[lang])))
        .map(city => ({
          label: city.translations?.[lang] ?? city.label,
          value: city.id,
        }));
        itemsCityResult
        .unshift({
          label: '',
          value: '0'
        })
        ;
  
      return itemsCityResult;
    })
    .catch(err => {
      return [];
    });
}

/**
 * Retrieves sectors for a specific city
 * @param {number} cityId - The city ID to get sectors for
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   value: number
 * }>>} Array of sector options with "all" option prepended
 * @throws {Object} Error object on API failure
 */
export async function getSect(cityId, lang) {
  let itemsSectResult = [] // { label: string; value?: number }[]

  return axios_instance
    .get(
      `/api/secteurs/city/${cityId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    )
    .then((response) => {
      let data = response.data;
      // console.log("secteurs::: ",data);

      for (let index = 0; index < data.length; index++) {
        itemsSectResult.push({
          label: data[index].translations[lang] ??
            data[index].label,
          value: data[index].id,
        });
      }
      itemsSectResult.sort((a /* { label: string } */, b /* { label: any } */) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { sensitivity: 'base' })
      );
      itemsSectResult.unshift({
        label: getTranslation(lang, ["AddAlert", "all"]),
        value: 0,
      });
      return itemsSectResult;
    }).catch(err => { throw err });
}


/**
 * Retrieves available sources list
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   value: number
 * }>>} Array of source options with "all" option prepended
 * @throws {Object} Error object on API failure
 */
export async function getSources(lang) {
  let itemsSourcesResult = [] // { label: string; value?: number }[]

  return axios_instance
    .get(
      `/api/sources`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    )
    .then((response) => {
      let data = response.data;
      // console.log("source::: ",data);

      for (let index = 0; index < data.length; index++) {
        itemsSourcesResult.push({
          label: data[index].label,
          value: data[index].id,
        });
      }
      itemsSourcesResult.sort((a /* { label: string } */, b /* { label: any } */) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { sensitivity: 'base' })
      );
      itemsSourcesResult.unshift({
        label: getTranslation(lang, ["AddAlert", "all"]),
        value: 0,
      });
      return itemsSourcesResult;
    }).catch(err => { throw err });
}

/**
 * Retrieves radio button options (chips) for a specific product with caching support
 * @param {string} productId - The product ID to get chips for
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   valeurs: Array<any>,
 *   id: string,
 *   defaultValue: any
 * }>>} Array of chip options
 * @throws {Object} Error object on API failure
 */
export async function getChips(productId, lang) {
  const expiration = getFetchExpiration();
  if (expiration) {
    if (Date.now() - parseInt(expiration) > 12 * 60 * 60 * 1000) {
      removeCachedChips();
    }
  }
  const setChips = (data) => {
    let chipsResult = [];
    for (let index = 0; index < data.length; index++) {
      chipsResult.push({
        label: data[index].label,
        valeurs: data[index].valeurs,
        id: data[index].id,
        defaultValue: data[index].defaultValue,
      });
    }
    return chipsResult;
  };
  let chipsResult = [];
  let chips = getCachedChips();
  if (expiration && chips) {
    chips = JSON.parse(chips);
    chipsResult = setChips(chips);
    return chipsResult;
  }
  return axios_instance
    .get(`/api/radio-buttons/product/${productId}`)
    .then((response) => {
      let data = response.data;
      chipsResult = setChips(data);
      setCachedChips(data);
      setFetchExpiration();
      return chipsResult;
    }).catch(err => { throw err });
}

/**
 * Retrieves slider options for a specific product with caching support
 * @param {string} productId - The product ID to get sliders for
 * @param {string} lang - Language code for translations (e.g., 'fr', 'en', 'ar')
 * @returns {Promise<Array<{
 *   label: string,
 *   minValue: number,
 *   maxValue: number,
 *   rangeValues: Array<{
 *     label: number,
 *     value: string
 *   }>,
 *   id: string
 * }>>} Array of slider options
 * @throws {Object} Error object on API failure
 */
export async function getSliders(productId, lang) {
  const expiration = getFetchExpiration();
  if (expiration) {
    if (Date.now() - parseInt(expiration) > 12 * 60 * 60 * 1000) {
      removeCachedSliders();
    }
  }
  const setSliders = (data) => {
    let sliderResult = [];
    for (let index = 0; index < data.length; index++) {
      let rangeValues = [];
      if (data[index].rangeValues) {
        data[index].rangeValues.sort((a, b) => a - b);
        rangeValues.splice(0, rangeValues.length);
        for (let j = 0; j < data[index].rangeValues.length; j++) {
          const element = data[index].rangeValues[j];
          rangeValues.push({
            label: element,
            value: j + "$" + Math.random(),
          });
        }
      }
      rangeValues = rangeValues.reverse();
      sliderResult.push({
        label: data[index].label,
        minValue: data[index].minValue,
        maxValue: data[index].maxValue,
        rangeValues: rangeValues,
        id: data[index].id,
      });
    }
    return sliderResult;
  };
  let sliderResult = [];
  let sliders = getCachedSliders();
  if (expiration && sliders) {
    sliders = JSON.parse(sliders);
    sliderResult = setSliders(sliders);
    return sliderResult;
  }
  return axios_instance
    .get(`/api/sliders/product/${productId}`)
    .then((response) => {
      let data = response.data;
      sliderResult = setSliders(data);
      setCachedSliders(data);
      setFetchExpiration();
      return sliderResult;
    }).catch(err => { throw err });
}

/**
 * Sends alert creation data to the server, only including fields that are filled (not default).
 * If all fields are default/empty, returns false to indicate failure.
 * Allows source and city to be 'all'.
 * @param {string} productId - The product ID for the alert
 * @param {Object} values - Alert criteria values
 * @param {Object} [values.brand] - Brand selection { id: string, value: string }
 * @param {Object} [values.model] - Model selection { id: string, value: string }
 * @param {Object} [values.city] - City selection { id: string, value: string }
 * @param {Object} [values.sector] - Sector selection { id: string, value: string }
 * @param {Object} [values.source] - Source selection { id: string, value: string }
 * @param {Object} values.chips - Chip selections { [chipLabel: string]: { id: string, value: string } }
 * @param {Object} values.sliders - Slider selections { [sliderLabel: string]: { id: string, value: { min: number, max: number } } }
 * @param {Object} [values.label] - Custom label { value: string }
 * @param {Object} alertLabel - Alert label object
 * @param {string} color - Alert color
 * @param {string} lang - Language code for translations
 * @returns {Promise<boolean>} true if alert created successfully, false if rejected due to empty fields
 * @throws {Object} Error object on API failure
 */
export async function sendData(
  productId,
  values,
  alertLabel, 
  color,
  lang
) {
  // 1. Get the user token
  const token = getToken();

  // 5. Build the data object for the server
  console.log({values});
  const data = {
    label: alertLabel.value,           // The alert label (name)
    product: { id: productId }, // The product id
    
    
    searches: [
      // gear_box
      values.chips?.gear_box && {
        label: 'gear_box',
        key: 'gear_box',
        valeur: values.chips.gear_box.value,
        valeurObject: null,
        criteria: { id: values.chips.gear_box.id }
      },
      // first_owner
      values.chips?.first_owner && {
        label: 'first_owner',
        key: 'first_owner',
        valeur: values.chips.first_owner.value,
        valeurObject: null,
        criteria: { id: values.chips.first_owner.id }
      },
      // max_price
      values.sliders?.price && {
        label: 'max',
        key: 'max',
        valeur: values.sliders.price.value.max,
        valeurObject: null,
        criteria: { id: values.sliders.price.id, label: 'price' }
      },
      // min_price
      values.sliders?.price && {
        label: 'min',
        key: 'min',
        valeur: values.sliders.price.value.min,
        valeurObject: null,
        criteria: { id: values.sliders.price.id, label: 'price' }
      },
      // max_reg_date
      values.sliders?.regdate && {
        label: 'max',
        key: 'max',
        valeur: values.sliders.regdate.value.max,
        valeurObject: null,
        criteria: { id: values.sliders.regdate.id, label: 'regdate' }
      },
      // min_reg_date
      values.sliders?.regdate && {
        label: 'min',
        key: 'min',
        valeur: values.sliders.regdate.value.min,
        valeurObject: null,
        criteria: { id: values.sliders.regdate.id, label: 'regdate' }
      },
      // max_mileage
      values.sliders?.mileage && {
        label: 'max',
        key: 'max',
        valeur: values.sliders.mileage.value.max,
        valeurObject: null,
        criteria: { id: values.sliders.mileage.id, label: 'mileage' }
      },
      // min_mileage
      values.sliders?.mileage && {
        label: 'min',
        key: 'min',
        valeur: values.sliders.mileage.value.min,
        valeurObject: null,
        criteria: { id: values.sliders.mileage.id, label: 'mileage' }
      },
      // model
      values.model && {
        label: 'model',
        key: values.model.value,
        valeur: values.model.value.split('|')[2],
        valeurObject: { id: values.model.value.split('|')[1] },
        criteria: { id: values.model.value.split('|')[0] }
      },
      // brand
      values.brand && {
        label: 'brand',
        valeur: values.brand.label,
        key: values.brand.value.split('|')[2],
        valeurObject: { id: values.brand.value.split('|')[1] },
        criteria: { id: values.brand.value.split('|')[0] }
      },
      // vehicle_origin
      values.chips?.vehicle_origin && {
        label: 'vehicle_origin',
        key: 'vehicle_origin',
        valeur: values.chips.vehicle_origin.value,
        valeurObject: null,
        criteria: { id: values.chips.vehicle_origin.id }
      },
      // doors
      values.chips?.doors && {
        label: 'doors',
        key: 'doors',
        valeur: values.chips.doors.value,
        valeurObject: null,
        criteria: { id: values.chips.doors.id }
      },
      // fuel
      values.chips?.fuel && {
        label: 'fuel',
        key: 'fuel',
        valeur: values.chips.fuel.value,
        valeurObject: null,
        criteria: { id: values.chips.fuel.id }
      },
      // promo
      values.chips?.promo && {
        label: 'promo',
        key: 'promo',
        valeur: values.chips.promo.value,
        valeurObject: null,
        criteria: { id: values.chips.promo.id }
      },
    ].filter(Boolean),
    color: color   
  };
  
  const city = values.city && { id: values.city.id }// (optional) The selected city id
  const secteur = values.sector && values.sector.id && { id: values.sector?.id } // (optional) The selected sector id
  const sources = values.source && values.source.id && [{ id: values.source.id }] // (optional) The selected source(s)
  if(city) data.city = city;
  if(secteur) data.secteur = secteur;
  if(sources) data.sources = sources;

  if(!(city||secteur||sources||data.searches.length)) return false;
  // 6. Send the alert to the server
  try {
    console.log({data, city, secteur, sources, l: data.searches});
    await axios_instance.post(`/api/alerts`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    // Optionally handle/log error
    return false;
  }
}

/**
 * Searches for announcements based on alert criteria and creates a search alert
 * @param {string} token - User authentication token
 * @param {string} productId - The product ID for the search
 * @param {Object} values - Search criteria values
 * @param {string} values.valueName - Brand value (format: "productId|brandId|key")
 * @param {string} values.valueNameLabel - Brand label
 * @param {string} values.valueNameModel - Model value (format: "productId|modelId|key")
 * @param {string} values.valueNameModelLabel - Model label
 * @param {string} values.valueLocationCity - City ID
 * @param {string} values.valueLocationCityLabel - City label
 * @param {string} values.valueLocationSect - Sector ID
 * @param {string} values.valueLocationSectLabel - Sector label
 * @param {string} values.valueSource - Source ID
 * @param {string} values.valueSourceLabel - Source label
 * @param {Object} values - Additional search parameters with format "criteriaId$value&param1&param2"
 * @param {string} alertLabel - Alert label for the search
 * @param {string} color - Alert color
 * @param {string} lang - Language code for translations
 * @returns {Promise<{
 *   id: string,
 *   label: string,
 *   activated: boolean,
 *   color: string,
 *   product: { id: string },
 *   searches: Array<{
 *     label: string,
 *     key: string,
 *     valeur: any,
 *     valeurObject: any,
 *     criteria: { id: string }
 *   }>,
 *   city?: { id: string },
 *   secteur?: { id: string },
 *   sources?: Array<{ id: string }>,
 *   createdAt: string,
 *   updatedAt: string
 * }>} Created search alert object
 * @throws {Object} Error object with sending, toast, toastMessage properties on validation failure
 * @throws {Object} Error object with sending, addError, addErrorMsg properties on API failure
 */
export async function search(
  token /* string */,
  productId /* string */,
  values /* any */,
  alertLabel /* string */,
  color /* string */,
  lang /* string */
) {
  let result = [] // { label: string; key: string; valeur: any; valeurObject: any; criteria: { id: any }; }[]
  // console.log("values to send::: ", values);
  console.log("getting announcements for user of token : " + token);

  if (values.valueNameLabel != getTranslation(lang, ["AddAlert", "all"])) {
    if (values.valueName.split("|")[0]) {
      result.push({
        label: "brand",
        key: values.valueName.split("|")[2],
        valeur: values.valueNameLabel,
        valeurObject: {
          id: values.valueName.split("|")[1]
        },
        criteria: {
          id: values.valueName.split("|")[0],
        },
      });
    }
  }
  if (values.valueNameModelLabel != getTranslation(lang, ["AddAlert", "all"])) {
    if (values.valueNameModel) {
      result.push({
        label: "model",
        key: values.valueNameModel.split("|")[2],
        valeur: values.valueNameModelLabel,
        valeurObject: {
          id: values.valueNameModel.split("|")[1]
        },
        criteria: {
          id: values.valueNameModel.split("|")[0],
        },
      });
    }
  }

  Object.keys(values).map((element /* any */) => {
    let key = "";
    if (
      element.includes("valueNameModel") ||
      element.includes("valueLocationSect") ||
      element.includes("valueLocationCity") ||
      element.includes("valueSource") ||
      element.includes("valueName")
    ) {
    } else {
      if (element.includes("min")) key = "min";
      else if (element.includes("max")) key = "max";
      else key = element.split("|")[1];
      if (values[element]) {
        console.log(values[element]);
        
        result.push({
          label: key,
          key: key,
          valeur: (values[element] + "")?.split("$")[0].split("&")[1],
          valeurObject: (values[element] + "")?.split("$")[0].split("&").length > 2 ?
            {
              id: (values[element] + "")?.split("$")[0].split("&")[2],
            } : null,
          criteria: {
            id: element.split("|")[0].split("$")[0] + "",
          },
        });
      }
    }
  });

  console.log("searches length: " + result.length);

  if ((!values.valueSource || values.valueSource == getTranslation(lang, ["AddAlert", "all"])) && (!values.valueLocationCityLabel || values.valueLocationCityLabel == getTranslation(lang, ["AddAlert", "all"])) && result.length <= 0) {
    let error = {
      sending: false,
      toast: true,
      toastMessage: getTranslation(lang, ["AddAlert", "noDefault"]),
    };
    throw error;
  }

  let data = {} // any
  if (
    values.valueLocationSect &&
    values.valueLocationSectLabel != getTranslation(lang, ["AddAlert", "all"])
  ) {
    data.secteur = {
      id: values.valueLocationSect,
    };
  }
  data.product = {
    id: productId,
  };
  if (values.valueLocationCityLabel && values.valueLocationCityLabel != getTranslation(lang, ["AddAlert", "all"])) {
    data.city = {
      id: values.valueLocationCity,
    };
  }
  if (values.valueSourceLabel && values.valueSourceLabel != getTranslation(lang, ["AddAlert", "all"])) {
    data.sources = [{
      id: values.valueSource
    }]
  }
  data.label = alertLabel;
  data.searches = result;
  data.color = color;

  console.log("data to send: ", data)
  console.log(`TO : /api/alerts/search`)

  return axios_instance
    .post(`/api/alerts/search`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response.data)
      return response.data;
    })
    .catch(() => {
      let error = {
        sending: false,
        addError: true,
        addErrorMsg: getTranslation(lang, ["AddAlert", "alertExist"]),
      };

      throw error;
    });
}
