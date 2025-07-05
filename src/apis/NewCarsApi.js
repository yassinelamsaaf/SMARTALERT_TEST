import { mapNewCarToCarCard, mapNewCarToCarDetails } from "@/utils/mapper";
import axios from "./axios";

async function getNewCars(page = 0, searchData = {}, lang = "fr", abortController = null) {
  let url = `/api/new/announcements?page=${page}&size=20&sort=carLabel,asc`;
  let data = {}
  if (searchData) {
    const { city, sources, ...searches } = searchData;
    data.label = "alert/" + (Math.random() * 100_000).toFixed(0);
    data.city = city;
    data.sources = sources;
    data.searches = Object.values(searches);
    url = `/api/new/announcements/search?page=${page}&size=20&sort=carLabel,asc`;
  }
  return (searchData ?
    (axios.post(url, data, {signal: abortController?.signal}))
    :
    (axios.get(url, {signal: abortController?.signal})))
    .then(response => {
      let carsCards = [];
      let data = response.data;

      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const element = mapNewCarToCarCard(data[i], lang);
          carsCards.push(element)
        }
      }
      return carsCards
    }).catch(error => {
      console.error("UsedCarsApi.getUsedCars error", error);
      return []
    })
}

async function getCar(carId, lang = "fr") {
  if (!carId) {
    return Promise.reject("carId must be a non empty string.")
  }
  let url = `/api/new/announcements/${carId}`
  return axios.get(url)
    .then(response => {
      return mapNewCarToCarDetails(response.data, lang);
    })
    .catch(error => {
      console.error("NewCarsApi.getCar error : ", error);
      return {};
    })
}

async function search(data, lang = "fr", abortController = null) {
  return getNewCars(0, data, lang, abortController)
}

export default { getNewCars, getCar, search }