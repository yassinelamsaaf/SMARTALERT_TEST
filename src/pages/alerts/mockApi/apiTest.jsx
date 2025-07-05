import axios from "@/apis/axios";

// Fetch car brands (names)
export const getNames = async (token, carId) => {
  const res = await axios.get(`/api/combo-lists/product/${carId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch car models for a brand
export const getModels = async (token, carId) => {
  const res = await axios.get(`/api/valeurs/comboListParent/${carId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch cities
export const getCity = async (token) => {
  const res = await axios.get(`/api/cities`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch sectors for a city
export const getSect = async (token, cityId) => {
  const res = await axios.get(`/api/secteurs/city/${cityId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch sources
export const getSources = async (token) => {
  const res = await axios.get(`/api/sources`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch chips (additional attributes)
export const getChips = async (token, productId) => {
  const res = await axios.get(`/api/chips/product/${productId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Fetch sliders (range filters)
export const getSliders = async (token, productId) => {
  const res = await axios.get(`/api/sliders/product/${productId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Create alert
export const createAlertAPI = async (token, data) => {
  const res = await axios.post(`/api/alerts`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}; 