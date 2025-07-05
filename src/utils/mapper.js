import t from '@/i18n/t'
import { getTime, priceFormat } from './helper'

export function mapUsedCarToCarCard(carDTO, lang = "fr") {
    const nullVal = t[lang].cars.null
    return {
        id: carDTO.id,
        tag: carDTO.sold ? t[lang].cars.sold : '',
        slideImg: (carDTO.carImages && carDTO.carImages.length > 0) ? carDTO.carImages : [`${import.meta.env.BASE_URL}/img/cars/no-car.png`],
        title: carDTO.label,
        location: carDTO.carCity?.translations[lang] ?? t[lang].cars.others,
        time: getTime(carDTO.datePosted) ?? '',
        source: carDTO.source,
        storeName: carDTO.storeName,
        price: carDTO.carPrice ? priceFormat(carDTO.carPrice) + ' MAD' : nullVal,
        door: carDTO.carDoors ?? '-',
        transmission: carDTO.carBV?.translations[lang] ?? '-',
        brand: carDTO.carBrand?.translations[lang] ?? '-',
        model: carDTO.carModel?.translations[lang] ?? '-',
        delayAnimation: '30',
    }
}

export function mapNewCarToCarCard(carDTO, lang = "fr") {
    const nullVal = t[lang].cars.null
    return {
        id: carDTO.id,
        tag: carDTO.carVariations?.filter(variation => variation.carVariationPromo).length > 0 ? t[lang].cars.promo : '',
        slideImg: (carDTO.carImages && carDTO.carImages.length > 0) ? carDTO.carImages : [`${import.meta.env.BASE_URL}/img/cars/no-car.png`],
        title: carDTO.carLabel ?? nullVal,
        price: priceFormat(carDTO.carMinPrice) + ' - ' + priceFormat(carDTO.carMaxPrice) + ' MAD',
        door: carDTO.carDoors ?? '-',
        transmission: carDTO.carBV?.translations[lang] ?? '-',
        brand: carDTO.carBrand?.translations[lang] ?? '-',
        model: carDTO.carModel?.translations[lang] ?? '-',
        delayAnimation: '30',
    }
}

export function mapUsedCarToCarDetails(carDTO, lang = "fr") {
    const nullVal = t[lang].cars.null
    console.log("CAR DTO", carDTO);

    return {
        id: carDTO.id,
        tag: carDTO.sold ? t[lang].cars.sold : '',
        carUri: carDTO.carUri,
        slideImg: (carDTO.carImages && carDTO.carImages.length > 0) ? carDTO.carImages : [`${import.meta.env.BASE_URL}/img/cars/no-car.png`],
        title: carDTO.label,
        location: carDTO.carCity?.translations[lang] ?? t[lang].cars.others,
        time: getTime(carDTO.datePosted) ?? '',
        source: carDTO.source,
        storeName: carDTO.storeName,
        price: carDTO.carPrice ? priceFormat(carDTO.carPrice) + ' MAD' : nullVal,
        door: carDTO.carDoors ?? '-',
        transmission: carDTO.carBV?.translations[lang] ?? '-',
        brand: carDTO.carBrand?.translations[lang] ?? '-',
        model: carDTO.carModel?.translations[lang] ?? '-',
        mileageMin: (carDTO.carMileageMin ?? carDTO.carMileageMax) + ' Km',
        mileageMax: (carDTO.carMileageMax ?? carDTO.carMileageMin) + ' Km',
        year: carDTO.carYear ?? '-',
        origine: carDTO.carOrigin?.translations[lang] ?? '-',
        condition: 'Occasion',
        delayAnimation: '30',
    }
}


export function mapNewCarToCarDetails(carDTO, lang = "fr") {
    const nullVal = 'Non renseigné'
    return {
        id: carDTO.id,
        carUri: carDTO.carUri,
        tag: carDTO.carVariations?.filter(variation => variation.carVariationPromo).length > 0 ? t[lang].cars.promo : '',
        slideImg: (carDTO.carImages && carDTO.carImages.length > 0) ? carDTO.carImages : [`${import.meta.env.BASE_URL}/img/cars/no-car.png`],
        img: (carDTO.carImages && carDTO.carImages.length > 0) ? carDTO.carImages[0] : `${import.meta.env.BASE_URL}/img/cars/no-car.png`,
        title: carDTO.carLabel ?? nullVal,
        price: priceFormat(carDTO.carMinPrice) + ' MAD',
        versions: carDTO.carVariations.map(version => {
            return {
                label: version.carVariationLabel,
                fuel: version.carFuel?.translations[lang] ?? '-',
                power: version.carVariationdynamicPower + ' ch - ' + version.carVariationHorsePower + ' cv',
                basePrice: priceFormat(version.carVariationBasePrice) + ' MAD',
                promoPrice: (version.carVariationPromo ?
                    priceFormat(version.carVariationPromoPrice) : priceFormat(version.carVariationBasePrice)) + ' MAD',
                isPromo: version.carVariationPromo,
            }
        }),
        delayAnimation: '30',
    }
}