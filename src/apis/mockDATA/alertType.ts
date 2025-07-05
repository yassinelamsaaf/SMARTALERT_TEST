type alert = {
      id: string;
      label: string;
      unreadAnnouncementsCount: number;
      createdAt: Date;
      alert: {
        id: string;
        createdAt: null;
        label: null;
        lastAnnouncement: null;
        activated: boolean;
        city: city;
        product: {
          category: null;
          city: city;
          criterias: [];
          description: null;
          id: string;
          name: string;
          secteur: secteur|null;
        };
        searches: search[];
        secteur: secteur;
        source: {
          color: Color;
          id: string;
          label: string;
          url: string;
        }
      }
    }

type secteur = {
    city: city;
    id: string;
    label: string;
    translations: trans;
  }|null

type city = {
    id: string;
    label: string;
    secteur: secteur;
    value: number;
    translations: trans;
  }|null 

type trans = {fr: string; ar: string}

type Color = string 

export type search = {
  id: string;
  key: string;
  label: string;
  valeur: variable<string>;
  criteria: {
    defaultValue: null;
    id: string;
    label: string;
    parentCriteria: null;
    product: null;
  };
  valeurObject: {
    childValeurs: {}[];
    comboList: any;
    id: string;
    key: string;
    parentValeur: any;
    radioButton: any;
    translations: trans;
    value: string;
  }
}

export type variable<r> = r

export type AlertFormProcessedData = {
  secteur?: { id: string };
  product: { id: string };
  city?: { id: string };
  sources?: { id: string }[];
  label: string;
  searches: search[];
  color: string;
};

type AlertPayload = {
  label: string;
  product: { id: string };
  city?: { id: string };
  secteur?: { id: string };
  sources?: { id: string }[];
  searches: {
    label: string;
    key: string;
    valeur: any;
    valeurObject: any;
    criteria: { id: any };
  }[];
  color: string;
}


type chip = {
  defaultValue: null;
  id: string;
  label: string;
  valeurs: {
    id: string;
    key: string;
    translations: trans;
    value: string;
  }[]
}


type data = {
  label: string,           // The alert label (name)
  product: { id: string }, // The product id
  city?: { id: string },   // (optional) The selected city id
  secteur?: { id: string },// (optional) The selected sector id
  sources?: [{ id: string }], // (optional) The selected source(s)
  searches: Array<{
    label: string,
    key: string,
    valeur: any,
    valeurObject: any,
    criteria: { id: any }
  }>,
  color: string            // The alert color
}

// Brand type
export interface BrandOption {
  label: string;
  value: string; // e.g. '64b66e6f52b46f2c79eb2662|64ae8b1c1baffb1801d2060a|73'
}

// City type
export interface CityOption {
  label: string;
  value: string; // pure id
}

// Source type
export interface SourceOption {
  label: string;
  value: string; // e.g. '652c9d24347c8c341fb0b498'
}

// Chip value type
export interface ChipValue {
  id: string;
  key: string | null;
  value: string;
  translations: Record<string, string>;
}

// Chip type
export interface ChipOption {
  label: string; // e.g. 'vehicle_origin'
  valeurs: ChipValue[];
  id: string;
  defaultValue: string | null;
}

// Slider type
export interface SliderOption {
  label: string; // e.g. 'price'
  minValue: string; // e.g. '0'
  maxValue: string; // e.g. '1000000'
  rangeValues: any[]; // always empty
  id: string;
}

/**
 * AlertForm represents the structure of the alert creation form values.
 *
 * Example:
 * {
 *   brand: { id: '64b66e6f52b46f2c79eb2662|64ae8b1c1baffb1801d2060b|63', value: '64b66e6f52b46f2c79eb2662|64ae8b1c1baffb1801d2060b|63' },
 *   model: { id: '64b66e6f52b46f2c79eb2663|64ae8b261baffb1801d2065c|gt40', value: '64b66e6f52b46f2c79eb2663|64ae8b261baffb1801d2065c|gt40' },
 *   city: { id: '64aef1f3f8e9da0cae1a96c6', value: '64aef1f3f8e9da0cae1a96c6' },
 *   sector: { id: '64aef1f4f8e9da0cae1a96d4', value: '64aef1f4f8e9da0cae1a96d4' },
 *   source: { id: '64aef23df8e9da0cae1a9b52', value: '64aef23df8e9da0cae1a9b52' },
 *   chips: {
 *     vehicle_origin: { id: '64b66e7052b46f2c79eb266b', value: 'pas encore dédouanée' },
 *     fuel: { id: '64b66e7052b46f2c79eb2670', value: 'essence' },
 *     doors: { id: '64b66e7052b46f2c79eb2673', value: '5' },
 *     first_owner: { id: '64b66e7052b46f2c79eb2676', value: 'non' },
 *     gear_box: { id: '64b66e7052b46f2c79eb2679', value: 'automatique' },
 *     promo: { id: '67cac823a20a9e54b2db7277', value: 'true' }
 *   },
 *   sliders: {
 *     price: { id: '64b66e7052b46f2c79eb2664', value: { min: 163382, max: 405440 } },
 *     regdate: { id: '64b66e7052b46f2c79eb2665', value: { min: 1983, max: 1998 } },
 *     mileage: { id: '64b66e7052b46f2c79eb2666', value: { min: 115353, max: 253112 } }
 *   },
 *   label: { value: 'c' }
 * }
 */
export interface AlertForm {
  /** Brand selection */
  brand?: { id: string; value: string };
  /** Model selection */
  model?: { id: string; value: string };
  /** City selection */
  city?: { id: string; value: string };
  /** Sector selection */
  sector?: { id: string; value: string };
  /** Source selection */
  source?: { id: string; value: string };
  /** Chips selections, keyed by chip label */
  chips: Record<string, { id: string; value: string }>;
  /** Sliders selections, keyed by slider label */
  sliders: Record<string, { id: string; value: { min: number; max: number } }>;
  /** Alert label */
  label?: { value: string };
}
