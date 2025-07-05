const fromAlertsToData = () => {
    // used to create a data type object from an alert type object
}

/**
 * Extracts alert information into a structured object
 * @param {Object} alert - The alert object from API. Expected shape:
 *   {
 *     alert: {
 *       city: { translations: { [lang: string]: string }, label: string },
 *       secteur: { translations: { [lang: string]: string }, label: string },
 *       source: { label: string },
 *       searches: search[]
 *     }
 *   } 
 * for more details see alertType.ts
 * @param {string} lang - Current language code (e.g., 'fr', 'ar')
 * @returns {Object} Structured info object with { name: string, value: string|number } pairs
 */
export const extractAlertInfo = (alert, lang) => {
  if (!alert || !alert.alert) {
    return {};
  }
  /**
   * searches: { [key: string]: search }
   * where search is expected to be:
   *   {
   *     id: string,
   *     key: string,
   *     label: string,
   *     valeur: string|number,
   *     criteria: { label: string },
   *     valeurObject: {
   *       translations: { [lang: string]: string },
   *       value: string|number
   *     }
   *   }
   */
  const searches = {};
  alert?.alert.searches?.forEach(search => {
    // Use search.label as the key if it matches criteria.label, otherwise use criteria.label + '_' + label
    let key = search.criteria.label === search.label
      ? search.label
      : search.criteria.label + "_" + search.label;
    searches[key] = search;
  });

  /**
   * Helper to extract the value from a search object
   * @param {search|undefined} searchObj
   * @returns {string|number} The translated value, a number, or 'any' if not found
   */
  const getValue = (searchObj) => {
    if (!searchObj) return "any";
    // If valeurObject.translations exists and has the lang, use it
    if (
      searchObj.valeurObject &&
      searchObj.valeurObject.translations &&
      searchObj.valeurObject.translations[lang] &&
      searchObj.valeurObject.translations[lang].trim() !== ""
    ) {
      return searchObj.valeurObject.translations[lang];
    }
    // If valeur is a number or non-empty string, use it
    if (
      typeof searchObj.valeur === "number" ||
      (typeof searchObj.valeur === "string" && searchObj.valeur.trim() !== "")
    ) {
      return searchObj.valeur;
    }
    // If valeurObject.value is a number or non-empty string, use it
    if (
      searchObj.valeurObject &&
      (typeof searchObj.valeurObject.value === "number" ||
        (typeof searchObj.valeurObject.value === "string" && searchObj.valeurObject.value.trim() !== ""))
    ) {
      return searchObj.valeurObject.value;
    }
    // Fallback to 'any' if no value found
    return "any";
  };

 

  /**
   * info: { [field: string]: string|number }
   * Each field is mapped directly to its value, localized or raw as appropriate.
   * Order: brand, model, city, sector, origin, fuel, transmission, doors, firsthand, then range fields (anneemin, anneemax, kilometragemin, kilometragemax, prixmin, prixmax)
   */
  const info = {
    brand: getValue(searches.brand),
    model: getValue(searches.model),
    city: alert.alert.city?.translations?.[lang] || alert.alert.city?.label || "any",
    sector: alert.alert.secteur?.translations?.[lang] || alert.alert.secteur?.label || "any",
    origin: getValue(searches.vehicle_origin),
    fuel: getValue(searches.fuel),
    transmission: getValue(searches.gear_box),
    doors: getValue(searches.doors),
    firsthand: getValue(searches.first_owner),
    anneemin: getValue(searches.regdate_min),
    anneemax: getValue(searches.regdate_max),
    kilometragemin: getValue(searches.mileage_min),
    kilometragemax: getValue(searches.mileage_max),
    prixmin: getValue(searches.price_min),
    prixmax: getValue(searches.price_max),
  };

  return info;
};