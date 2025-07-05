// Mock data for cities
export const mockCities = {
  casablanca: {
    id: "64aef1f3f8e9da0cae1a96c6",
    label: "Casablanca",
    secteur: null,
    value: 1,
    translations: { fr: "Casablanca", ar: "الدار البيضاء" }
  },
  rabat: {
    id: "64aef1f4f8e9da0cae1a96d4",
    label: "Rabat",
    secteur: null,
    value: 2,
    translations: { fr: "Rabat", ar: "الرباط" }
  },
  marrakech: {
    id: "64aef1f5f8e9da0cae1a96e2",
    label: "Marrakech",
    secteur: null,
    value: 3,
    translations: { fr: "Marrakech", ar: "مراكش" }
  }
};

// Mock data for sectors
export const mockSecteurs = {
  casablancaSecteur: {
    city: mockCities.casablanca,
    id: "64aef1f4f8e9da0cae1a96d4",
    label: "Centre Ville",
    translations: { fr: "Centre Ville", ar: "وسط المدينة" }
  },
  rabatSecteur: {
    city: mockCities.rabat,
    id: "64aef1f5f8e9da0cae1a96e2",
    label: "Agdal",
    translations: { fr: "Agdal", ar: "أكدال" }
  }
};

// Mock data for sources
export const mockSources = {
  avito: {
    color: "#FF6B35",
    id: "64aef23df8e9da0cae1a9b52",
    label: "Avito",
    url: "https://www.avito.ma"
  },
  autocaz: {
    color: "#4ECDC4",
    id: "64aef23ef8e9da0cae1a9b60",
    label: "AutoCaz",
    url: "https://www.autocaz.ma"
  },
  moteurMa: {
    color: "#45B7D1",
    id: "64aef23ff8e9da0cae1a9b6e",
    label: "Moteur.ma",
    url: "https://www.moteur.ma"
  }
};

// Mock search objects with realistic values
const createSearch = (key, label, value, criteriaId) => ({
  id: criteriaId,
  key: key,
  label: label,
  valeur: value,
  criteria: {
    defaultValue: null,
    id: criteriaId,
    label: label,
    parentCriteria: null,
    product: null,
  },
  valeurObject: {
    childValeurs: [],
    comboList: null,
    id: criteriaId,
    key: key,
    parentValeur: null,
    radioButton: null,
    value: value,
    translations: { fr: value, ar: value },
  }
});

// Mock alert list
const mockAlerts = [
  {
    id: "alert_001",
    label: "BMW X5 Automatique",
    unreadAnnouncementsCount: 5,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    alert: {
      id: "alert_detail_001",
      createdAt: null,
      label: null,
      lastAnnouncement: null,
      activated: true,
      city: mockCities.casablanca,
      product: {
        category: null,
        city: mockCities.casablanca,
        criterias: [],
        description: null,
        id: "product_001",
        name: "Voitures",
        secteur: mockSecteurs.casablancaSecteur,
      },
      searches: [
        createSearch("64", "brand", "BMW", "criteria_001"),
        createSearch("model", "model", "X5", "criteria_002"),
        createSearch("gear_box", "gear_box", "automatique", "criteria_003"),
        createSearch("min", "price", "500000", "criteria_004"),
        createSearch("max", "price", "800000", "criteria_005"),
      ],
      secteur: mockSecteurs.casablancaSecteur,
      source: mockSources.avito,
    }
  },
  {
    id: "alert_002",
    label: "Mercedes Classe C Essence",
    unreadAnnouncementsCount: 2,
    createdAt: new Date("2024-01-20T14:15:00Z"),
    alert: {
      id: "alert_detail_002",
      createdAt: null,
      label: null,
      lastAnnouncement: null,
      activated: true,
      city: mockCities.rabat,
      product: {
        category: null,
        city: mockCities.rabat,
        criterias: [],
        description: null,
        id: "product_001",
        name: "Voitures",
        secteur: mockSecteurs.rabatSecteur,
      },
      searches: [
        createSearch("64", "brand", "Mercedes", "criteria_006"),
        createSearch("model", "model", "Classe C", "criteria_007"),
        createSearch("fuel", "fuel", "essence", "criteria_008"),
        createSearch("doors", "doors", "4", "criteria_009"),
        createSearch("first_owner", "first_owner", "oui", "criteria_010"),
        createSearch("min", "price", "300000", "criteria_011"),
        createSearch("max", "price", "600000", "criteria_012"),
      ],
      secteur: mockSecteurs.rabatSecteur,
      source: mockSources.autocaz,
    }
  },
  {
    id: "alert_003",
    label: "Audi A4 Diesel Première Main",
    unreadAnnouncementsCount: 8,
    createdAt: new Date("2024-01-25T09:45:00Z"),
    alert: {
      id: "alert_detail_003",
      createdAt: null,
      label: null,
      lastAnnouncement: null,
      activated: true,
      city: mockCities.marrakech,
      product: {
        category: null,
        city: mockCities.marrakech,
        criterias: [],
        description: null,
        id: "product_001",
        name: "Voitures",
        secteur: null,
      },
      searches: [
        createSearch("64", "brand", "Audi", "criteria_013"),
        createSearch("model", "model", "A4", "criteria_014"),
        createSearch("fuel", "fuel", "diesel", "criteria_015"),
        createSearch("first_owner", "first_owner", "oui", "criteria_016"),
        createSearch("vehicle_origin", "vehicle_origin", "déjà dédouanée", "criteria_017"),
        createSearch("min", "regdate", "2018", "criteria_018"),
        createSearch("max", "regdate", "2022", "criteria_019"),
        createSearch("min", "mileage", "50000", "criteria_020"),
        createSearch("max", "mileage", "150000", "criteria_021"),
      ],
      secteur: null,
      source: mockSources.moteurMa,
    }
  }
];

localStorage.setItem("mock-alerts-db", JSON.stringify(mockAlerts));

export function mockgetAlerts(){
    return JSON.parse(localStorage.getItem("mock-alerts-db"));
}

export function mocksetAlerts(alerts){
    localStorage.setItem("mock-alerts-db", JSON.stringify(alerts))
}

export function mockaddAlerts(alert){
    const existingAlerts = mockgetAlerts() || [];
    
    const updatedAlerts = [...existingAlerts, alert];
    mocksetAlerts(updatedAlerts);
    
    return alert;
}

export function mockdeleteAlerts(alertId){
    const existingAlerts = mockgetAlerts() || [];
    
    // Filter out the alert with the specified ID
    const updatedAlerts = existingAlerts.filter(alert => alert.id !== alertId);
    
    // Update localStorage with the filtered alerts
    mocksetAlerts(updatedAlerts);
    
    // Return the updated alerts array
    return updatedAlerts.length == existingAlerts.length;
}