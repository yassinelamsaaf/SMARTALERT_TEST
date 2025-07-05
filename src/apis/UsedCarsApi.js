import { mapUsedCarToCarCard, mapUsedCarToCarDetails } from "@/utils/mapper";
import axios from "./axios";

async function getUsedCars(page = 0, alert = undefined, lang = "fr", abortController=null) {
    let url = `/api/announcements?page=${page}&size=2&sort=datePosted,desc${alert ? "&alert=" + alert : ""}`;
    return axios
        .get(url, {
            signal: abortController?.signal,
        }
        ).then(response => {
            let carsCards = [];
            let data = response.data;

            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const element = mapUsedCarToCarCard(data[i], lang);
                    carsCards.push(element)
                }
            }
            return carsCards
        }).catch(error => {
            console.error("UsedCarsApi.getUsedCars error", error);
            return []
        })
}

async function search(data, abortController=null) {
    let uri = "/api/alerts/search";
    return axios
        .post(uri, data, {
            signal: abortController?.signal,
        })
        .then(response => {
            return response.data.id
        })
        .catch(error => {
            console.error("search error", error);
        });
}

async function getCar(carId, lang = "fr") {
    if (!carId) {
        return Promise.reject("carId must be a non empty string.")
    }
    let url = `/api/announcements/${carId}`
    return axios.get(url)
        .then(response => {
            return mapUsedCarToCarDetails(response.data, lang);
        })
        .catch(error => {
            console.error("UsedCarsApi.getCar error : ", error);
            return {};
        })
}


export default { getUsedCars, search, getCar };