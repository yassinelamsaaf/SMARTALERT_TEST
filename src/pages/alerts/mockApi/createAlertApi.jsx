// Mock API functions for CreateAlert
export const getNames = async () => [
  { id: '1', name: 'Toyota' },
  { id: '2', name: 'Peugeot' },
  { id: '3', name: 'Renault' },
  { id: '4', name: 'BMW' },
];

export const getModels = async (brandId) => {
  const models = {
    '1': [ { id: '1a', name: 'Corolla' }, { id: '1b', name: 'Yaris' } ],
    '2': [ { id: '2a', name: '208' }, { id: '2b', name: '308' } ],
    '3': [ { id: '3a', name: 'Clio' }, { id: '3b', name: 'Megane' } ],
    '4': [ { id: '4a', name: '320i' }, { id: '4b', name: 'X5' } ],
  };
  return models[brandId] || [];
};

export const getCity = async () => [
  { id: 'c1', name: 'Casablanca' },
  { id: 'c2', name: 'Rabat' },
  { id: 'c3', name: 'Marrakech' },
  { id: 'c4', name: 'Tangier' },
];

export const getSect = async (cityId) => {
  const sectors = {
    'c1': [ { id: 's1', name: 'Maarif' }, { id: 's2', name: 'Oasis' } ],
    'c2': [ { id: 's3', name: 'Agdal' }, { id: 's4', name: 'Hay Riad' } ],
    'c3': [ { id: 's5', name: 'Gueliz' }, { id: 's6', name: 'Medina' } ],
    'c4': [ { id: 's7', name: 'Centre' }, { id: 's8', name: 'Iberia' } ],
  };
  return sectors[cityId] || [];
};

export const getSources = async () => [
  { id: 'src1', name: 'Avito' },
  { id: 'src2', name: 'Moteur.ma' },
  { id: 'src3', name: 'Autocaz' },
];

export const getChips = async () => [
  {
    id: "color",
    label: "Color",
    valeurs: ["Red", "Blue", "Black"],
    defaultValue: 0
  },
  {
    id: "fuel",
    label: "Fuel Type",
    valeurs: ["Diesel", "Petrol"],
    defaultValue: 0
  },
  {
    id: "doors",
    label: "Number of Doors",
    valeurs: ["3", "5"],
    defaultValue: 0
  }
];

export const getSliders = async () => [
  {
    id: 'price',
    label: 'Price',
    minValue: 50000,
    maxValue: 500000
  },
  {
    id: 'mileage',
    label: 'Mileage',
    minValue: 0,
    maxValue: 200000
  }
];

export const createAlertAPI = async (data) => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  return { success: true, data };
}; 