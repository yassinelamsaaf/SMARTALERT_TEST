# API Documentation

This document provides a comprehensive overview of all API functions in the SmartAlert web application, including their parameters, return types, and error handling.

## Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [User Management APIs](#user-management-apis)
3. [Alert Management APIs](#alert-management-apis)
4. [Car APIs](#car-apis)
5. [Alert Creation APIs](#alert-creation-apis)

## Authentication APIs

### `AuthApi.js`

#### `login(username, password, rememberMe)`
- **Parameters:**
  - `username` (string): User's username/email
  - `password` (string): User's password
  - `rememberMe` (boolean): Whether to remember the session
- **Returns:** `Promise<{ id_token: string, token_type: string, expires_in: number, scope: string, refresh_token: string }>`
- **Throws:** Error object with message property on authentication failure

#### `register(user)`
- **Parameters:**
  - `user` (Object): User registration data
    - `login` (string): Username/email
    - `email` (string): Email address
    - `password` (string): Password
    - `langKey` (string): Language preference
- **Returns:** `Promise<boolean>` - true if registration successful
- **Throws:** Error object with message property on registration failure

#### `activateAccount(key)`
- **Parameters:**
  - `key` (string): Activation key from email
- **Returns:** `Promise<boolean>` - true if activation successful
- **Throws:** Error object with message property on activation failure

#### `resendActivationCode(email)`
- **Parameters:**
  - `email` (string): Email address to resend code to
- **Returns:** `Promise<boolean>` - true if code resend successful
- **Throws:** Error object with message property on resend failure

#### `loginWithGoogle(token, langKey)`
- **Parameters:**
  - `token` (string): Google OAuth token
  - `langKey` (string): Language preference
- **Returns:** `Promise<{ id_token: string, token_type: string, expires_in: number, scope: string, refresh_token: string }>`
- **Throws:** Error object with message property on authentication failure

#### `loginWithFacebook(token, langKey)`
- **Parameters:**
  - `token` (string): Facebook OAuth token
  - `langKey` (string): Language preference
- **Returns:** `Promise<{ id_token: string, token_type: string, expires_in: number, scope: string, refresh_token: string }>`
- **Throws:** Error object with message property on authentication failure

## User Management APIs

### `CurrentUserApi.js`

#### `getCurrentUser()`
- **Returns:** `Promise<{ id: string, login: string, firstName: string, lastName: string, email: string, imageUrl: string, activated: boolean, langKey: string, createdBy: string, createdDate: string, lastModifiedBy: string, lastModifiedDate: string, authorities: Array<string> }>`
- **Throws:** Error object with message property on API failure

### `UserApi.js`

#### `deleteAccount()`
- **Returns:** `Promise<boolean>` - true if account deletion successful
- **Throws:** Error object with message property on deletion failure

#### `updateAccount(userData)`
- **Parameters:**
  - `userData` (Object): User data to update
    - `firstName` (string, optional): User's first name
    - `lastName` (string, optional): User's last name
    - `email` (string, optional): User's email address
    - `langKey` (string, optional): User's language preference
    - `imageUrl` (string, optional): User's profile image URL
- **Returns:** `Promise<{ id: string, login: string, firstName: string, lastName: string, email: string, imageUrl: string, activated: boolean, langKey: string, createdBy: string, createdDate: string, lastModifiedBy: string, lastModifiedDate: string, authorities: Array<string> }>`
- **Throws:** Error object with message property on update failure

## Alert Management APIs

### `AlertsApi.js`

#### `getAlertsAPI(page, searchInput, CAlerts, setCAlerts)`
- **Parameters:**
  - `page` (number, default: 1): Page number for pagination
  - `searchInput` (string, default: ''): Search term to filter alerts
  - `CAlerts` (Array): Cached alerts array
  - `setCAlerts` (Function): Function to update cached alerts
- **Returns:** `Promise<{ alerts: Array<{ id: string, label: string, activated: boolean, color: string, createdAt: string, updatedAt: string }>, totalPages: number }>`
- **Throws:** Error object with message property on API failure

#### `getAlertInfo(alertId, lang)`
- **Parameters:**
  - `alertId` (string): The ID of the alert to retrieve
  - `lang` (string): Language code for translations
- **Returns:** `Promise<{ id: string, label: string, activated: boolean, color: string, product: { id: string, name: string }, searches: Array<{ label: string, key: string, valeur: any, valeurObject: any, criteria: { id: string } }>, city?: { id: string, name: string }, secteur?: { id: string, name: string }, sources?: Array<{ id: string, name: string }>, createdAt: string, updatedAt: string }>`
- **Throws:** Error object on API failure

#### `deleteAlert(alertId)`
- **Parameters:**
  - `alertId` (string): The ID of the alert to delete
- **Returns:** `Promise<{ deleting: boolean, deleteDialog: boolean }>`
- **Throws:** None (returns error object on failure)

#### `deleteAllAlerts()`
- **Returns:** `Promise<{ deleting: boolean, deleteDialog: boolean }>`
- **Throws:** None (returns error object on failure)

#### `updateAlertActivation(alertId, activated)`
- **Parameters:**
  - `alertId` (string): The ID of the alert to update
  - `activated` (boolean): The new activation status
- **Returns:** `Promise<{ id: string, label: string, activated: boolean, color: string, createdAt: string, updatedAt: string }>`
- **Throws:** Error object on API failure

## Car APIs

### `UsedCarsApi.js`

#### `getUsedCars(page, alert, lang, abortController)`
- **Parameters:**
  - `page` (number, default: 0): Page number for pagination
  - `alert` (string, optional): Alert ID to filter cars
  - `lang` (string, default: "fr"): Language code for translations
  - `abortController` (AbortController, optional): Request cancellation controller
- **Returns:** `Promise<Array<{ id: string, tag: string, slideImg: Array<string>, title: string, location: string, time: string, source: string, storeName: string, price: string, door: string, transmission: string, brand: string, model: string, delayAnimation: string }>>`
- **Throws:** None (returns empty array on error)

#### `search(data, abortController)`
- **Parameters:**
  - `data` (Object): Search criteria data
  - `abortController` (AbortController, optional): Request cancellation controller
- **Returns:** `Promise<string>` - Search result ID
- **Throws:** Error object on search failure

#### `getCar(carId, lang)`
- **Parameters:**
  - `carId` (string): The ID of the car to retrieve
  - `lang` (string, default: "fr"): Language code for translations
- **Returns:** `Promise<{ id: string, tag: string, carUri: string, slideImg: Array<string>, title: string, location: string, time: string, source: string, storeName: string, price: string, door: string, transmission: string, brand: string, model: string, mileageMin: string, mileageMax: string, year: string, origine: string, condition: string, delayAnimation: string }>`
- **Throws:** Error message if carId is invalid

### `NewCarsApi.js`

#### `getNewCars(page, searchData, lang, abortController)`
- **Parameters:**
  - `page` (number, default: 0): Page number for pagination
  - `searchData` (Object, default: {}): Search criteria
    - `city` (string, optional): City filter
    - `sources` (Array<string>, optional): Sources filter
    - `searches` (Object, optional): Additional search parameters
  - `lang` (string, default: "fr"): Language code for translations
  - `abortController` (AbortController, optional): Request cancellation controller
- **Returns:** `Promise<Array<{ id: string, tag: string, slideImg: Array<string>, title: string, price: string, door: string, transmission: string, brand: string, model: string, delayAnimation: string }>>`
- **Throws:** None (returns empty array on error)

#### `getCar(carId, lang)`
- **Parameters:**
  - `carId` (string): The ID of the car to retrieve
  - `lang` (string, default: "fr"): Language code for translations
- **Returns:** `Promise<{ id: string, carUri: string, tag: string, slideImg: Array<string>, img: string, title: string, price: string, versions: Array<{ label: string, fuel: string, power: string, basePrice: string, promoPrice: string, isPromo: boolean }>, delayAnimation: string }>`
- **Throws:** Error message if carId is invalid

#### `search(data, lang, abortController)`
- **Parameters:**
  - `data` (Object): Search criteria data
  - `lang` (string, default: "fr"): Language code for translations
  - `abortController` (AbortController, optional): Request cancellation controller
- **Returns:** `Promise<Array<{ id: string, tag: string, slideImg: Array<string>, title: string, price: string, door: string, transmission: string, brand: string, model: string, delayAnimation: string }>>`
- **Throws:** None (returns empty array on error)

## Alert Creation APIs

### `addAlertsApi.js`

#### `getProduct()`
- **Returns:** `Promise<string>` - The ID of the first product
- **Throws:** Error object on API failure

#### `getNames(carId, lang)`
- **Parameters:**
  - `carId` (string): The car ID to get brands for
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, value: string|number }>>` - Array of brand options with "all" option prepended
- **Throws:** Error object on API failure, returns empty array on error

#### `getModels(carId, lang)`
- **Parameters:**
  - `carId` (string): The car ID containing brand information (format: "productId|brandId|key")
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, value: string|number }>>` - Array of model options with "all" option prepended
- **Throws:** Error object on API failure

#### `getCity(lang)`
- **Parameters:**
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, value: number }>>` - Array of city options with "all" option prepended
- **Throws:** Error object on API failure, returns empty array on error

#### `getSect(cityId, lang)`
- **Parameters:**
  - `cityId` (number): The city ID to get sectors for
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, value: number }>>` - Array of sector options with "all" option prepended
- **Throws:** Error object on API failure

#### `getSources(lang)`
- **Parameters:**
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, value: number }>>` - Array of source options with "all" option prepended
- **Throws:** Error object on API failure

#### `getChips(productId, lang)`
- **Parameters:**
  - `productId` (string): The product ID to get chips for
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, valeurs: Array<any>, id: string, defaultValue: any }>>` - Array of chip options
- **Throws:** Error object on API failure

#### `getSliders(productId, lang)`
- **Parameters:**
  - `productId` (string): The product ID to get sliders for
  - `lang` (string): Language code for translations
- **Returns:** `Promise<Array<{ label: string, minValue: number, maxValue: number, rangeValues: Array<{ label: number, value: string }>, id: string }>>` - Array of slider options
- **Throws:** Error object on API failure

#### `sendData(productId, values, alertLabel, color, lang)`
- **Parameters:**
  - `productId` (string): The product ID for the alert
  - `values` (Object): Alert criteria values
    - `brand` (Object, optional): Brand selection { id: string, value: string }
    - `model` (Object, optional): Model selection { id: string, value: string }
    - `city` (Object, optional): City selection { id: string, value: string }
    - `sector` (Object, optional): Sector selection { id: string, value: string }
    - `source` (Object, optional): Source selection { id: string, value: string }
    - `chips` (Object): Chip selections { [chipLabel: string]: { id: string, value: string } }
    - `sliders` (Object): Slider selections { [sliderLabel: string]: { id: string, value: { min: number, max: number } } }
    - `label` (Object, optional): Custom label { value: string }
  - `alertLabel` (Object): Alert label object
  - `color` (string): Alert color
  - `lang` (string): Language code for translations
- **Returns:** `Promise<boolean>` - true if alert created successfully, false if rejected due to empty fields
- **Throws:** Error object on API failure

#### `search(token, productId, values, alertLabel, color, lang)`
- **Parameters:**
  - `token` (string): User authentication token
  - `productId` (string): The product ID for the search
  - `values` (Object): Search criteria values
    - `valueName` (string): Brand value (format: "productId|brandId|key")
    - `valueNameLabel` (string): Brand label
    - `valueNameModel` (string): Model value (format: "productId|modelId|key")
    - `valueNameModelLabel` (string): Model label
    - `valueLocationCity` (string): City ID
    - `valueLocationCityLabel` (string): City label
    - `valueLocationSect` (string): Sector ID
    - `valueLocationSectLabel` (string): Sector label
    - `valueSource` (string): Source ID
    - `valueSourceLabel` (string): Source label
    - Additional search parameters with format "criteriaId$value&param1&param2"
  - `alertLabel` (string): Alert label for the search
  - `color` (string): Alert color
  - `lang` (string): Language code for translations
- **Returns:** `Promise<{ id: string, label: string, activated: boolean, color: string, product: { id: string }, searches: Array<{ label: string, key: string, valeur: any, valeurObject: any, criteria: { id: string } }>, city?: { id: string }, secteur?: { id: string }, sources?: Array<{ id: string }>, createdAt: string, updatedAt: string }>` - Created search alert object
- **Throws:** Error object with sending, toast, toastMessage properties on validation failure
- **Throws:** Error object with sending, addError, addErrorMsg properties on API failure

## Error Handling

All API functions follow a consistent error handling pattern:

1. **Network Errors:** Functions throw error objects with message properties
2. **Validation Errors:** Functions may return false or throw specific error objects with additional properties
3. **Empty Results:** Some functions return empty arrays or objects instead of throwing errors
4. **Authentication Errors:** Functions throw error objects when authentication fails

## Common Return Types

### User Object
```javascript
{
  id: string,
  login: string,
  firstName: string,
  lastName: string,
  email: string,
  imageUrl: string,
  activated: boolean,
  langKey: string,
  createdBy: string,
  createdDate: string,
  lastModifiedBy: string,
  lastModifiedDate: string,
  authorities: Array<string>
}
```

### Alert Object
```javascript
{
  id: string,
  label: string,
  activated: boolean,
  color: string,
  createdAt: string,
  updatedAt: string
}
```

### Car Card Object
```javascript
{
  id: string,
  tag: string,
  slideImg: Array<string>,
  title: string,
  location: string,
  time: string,
  source: string,
  storeName: string,
  price: string,
  door: string,
  transmission: string,
  brand: string,
  model: string,
  delayAnimation: string
}
```

### Option Object
```javascript
{
  label: string,
  value: string|number
}
``` 