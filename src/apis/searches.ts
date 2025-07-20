import { search, variable } from "./alertType";


const gear_box: search = {
    id: "",
    key: "gear_box",
    label: "gear_box",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "gear_box",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}

const first_owner: search = {
    id: "",
    key: "first_owner",
    label: "first_owner",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "first_owner",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}

const max_price: search = {
    id: "",
    key: "max",
    label: "max",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "price",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const model: search = {
    id: "",
    key: "",
    label: "model",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "model",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const brand: search = {
    id: "",
    key: "64",
    label: "brand",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "brand",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}



const min_price: search = {
    id: "",
    key: "min",
    label: "min",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "price",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const vehicle_origin: search = {
    id: "",
    key: "vehicle_origin",
    label: "vehicle_origin",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "vehicle_origin",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const min_mileage: search = {
    id: "",
    key: "min",
    label: "min",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "mileage",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const max_reg_date: search = {
    id: "",
    key: "max",
    label: "max",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "regdate",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const doors: search = {
    id: "",
    key: "doors",
    label: "doors",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "doors",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}

const fuel: search = {
    id: "",
    key: "fuel",
    label: "fuel",
    valeur: "",
    criteria: {
        defaultValue: null,
        id: "",
        label: "fuel",
        parentCriteria: null,
        product: null,        
    },
    valeurObject: {
        childValeurs: [],
        comboList: null,
        id: "",
        key: null,
        parentValeur: null,
        radioButton: null,
        value: "",
        translations: {fr: '', ar: ''},
    }
}


const l = [
    gear_box,
    first_owner,
    max_price,
    model,
    brand,
    min_price,
    vehicle_origin,
    min_mileage,
    max_reg_date,
    doors,
    fuel
  ];
  
l.map(()=>{
    // For each search, print the concatenation of criteria.label and label
    // The argument to map is the search object
    // We'll return search.criteria.label + search.label
    // Since this is inside map, the argument is needed
    (search: search) => console.log(search.criteria.label + search.label)
})