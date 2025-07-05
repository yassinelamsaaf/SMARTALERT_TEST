import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import brandCriteriaSlice from "../features/filters/brandCriteriaSlice"
import cityCriteriaSlice from "../features/filters/cityCriteriaSlice"
import sourceCriteriaSlice from "../features/filters/sourceCriteriaSlice"
import sliderCriteriaSlice from "../features/filters/sliderCriteriaSlice"
import chipCriteriaSlice from "../features/filters/chipCriteriaSlice"
import sectorCriteriaSlice from "../features/filters/sectorCriteriaSlice"
import modelCriteriaSlice from "../features/filters/modelCriteriaSlice"
import uiSlice from "../features/ui/uiSlice"
import promoCarsSlice from "@/features/cars/promoCarsSlice";

export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    brandCriteria: brandCriteriaSlice,
    cityCriteria: cityCriteriaSlice,
    sourceCriteria: sourceCriteriaSlice,
    sliderCriteria: sliderCriteriaSlice,
    chipCriteria: chipCriteriaSlice,
    sectorReducer: sectorCriteriaSlice,
    modelReducer: modelCriteriaSlice,
    ui: uiSlice,
    promoCarsReducer: promoCarsSlice,
  },
});
