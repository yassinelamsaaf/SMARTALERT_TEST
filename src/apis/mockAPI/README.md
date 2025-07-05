# Mock API Documentation

This directory contains mock API implementations that simulate backend functionality using localStorage and mock data. All functions maintain the same interface as the original API calls but work completely offline.

## Files Overview

### 1. AuthApi.js
Handles user authentication including login, registration, account activation, and social login.

### 2. CurrentUserApi.js
Retrieves current authenticated user information.

### 3. UserApi.js
Manages user account operations like updates and deletion.

### 4. AlertsApi.js
Handles alert-related operations (not converted yet).

### 5. addAlertsApi.js
Handles alert creation and management (not converted yet).

### 6. ChatbotApi.js
Placeholder for future chatbot functionality.

## TypeScript Types

All functions use the following TypeScript interfaces defined in `../mockDATA/userType.ts`:

```typescript
// User account information
interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: string[];
}

// User registration data
interface UserRegistration {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  langKey: string;
}

// User account update data
interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  imageUrl?: string;
}

// Authentication response
interface AuthResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}
```

## API Functions Documentation

### Authentication (AuthApi.js)

#### `login(username: string, password: string, rememberMe?: boolean): Promise<AuthResponse>`
Authenticates a user with username and password.

**Parameters:**
- `username`: User's email/username
- `password`: User's password
- `rememberMe`: Optional flag for session persistence

**Returns:** Promise resolving to authentication response with JWT token

**Throws:** Error object with message property on authentication failure

**Example:**
```javascript
try {
  const authResponse = await login('john.doe@example.com', 'password123');
  console.log('Login successful:', authResponse.id_token);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

#### `register(user: UserRegistration): Promise<boolean>`
Registers a new user account.

**Parameters:**
- `user`: User registration data object

**Returns:** Promise resolving to true if registration successful

**Throws:** Error object with message property on registration failure

**Example:**
```javascript
try {
  const success = await register({
    login: 'newuser@example.com',
    email: 'newuser@example.com',
    password: 'securepassword',
    firstName: 'John',
    lastName: 'Doe',
    langKey: 'en'
  });
  console.log('Registration successful:', success);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

#### `activateAccount(key: string): Promise<boolean>`
Activates a user account using the activation key.

**Parameters:**
- `key`: Activation key sent to user's email

**Returns:** Promise resolving to true if activation successful

**Throws:** Error object with message property on activation failure

#### `resendActivationCode(email: string): Promise<boolean>`
Resends activation code to user's email.

**Parameters:**
- `email`: Email address to resend activation code to

**Returns:** Promise resolving to true if code resend successful

**Throws:** Error object with message property on resend failure

#### `loginWithGoogle(token: string, langKey: string): Promise<AuthResponse>`
Authenticates user using Google OAuth token.

**Parameters:**
- `token`: Google OAuth token
- `langKey`: Language preference

**Returns:** Promise resolving to authentication response with JWT token

**Throws:** Error object with message property on authentication failure

#### `loginWithFacebook(token: string, langKey: string): Promise<AuthResponse>`
Authenticates user using Facebook OAuth token.

**Parameters:**
- `token`: Facebook OAuth token
- `langKey`: Language preference

**Returns:** Promise resolving to authentication response with JWT token

**Throws:** Error object with message property on authentication failure

### Current User (CurrentUserApi.js)

#### `getCurrentUser(): Promise<User>`
Retrieves the current authenticated user's information.

**Returns:** Promise resolving to current user's account information

**Throws:** Error object with message property on API failure

**Example:**
```javascript
try {
  const user = await getCurrentUser();
  console.log('Current user:', user.firstName, user.lastName);
} catch (error) {
  console.error('Failed to get current user:', error.message);
}
```

### User Management (UserApi.js)

#### `updateAccount(userData: UserUpdateData): Promise<User>`
Updates the current user's account information.

**Parameters:**
- `userData`: User data to update (partial object)

**Returns:** Promise resolving to updated user account information

**Throws:** Error object with message property on update failure

**Example:**
```javascript
try {
  const updatedUser = await updateAccount({
    firstName: 'John',
    lastName: 'Smith',
    langKey: 'fr'
  });
  console.log('Account updated:', updatedUser);
} catch (error) {
  console.error('Account update failed:', error.message);
}
```

#### `deleteAccount(): Promise<boolean>`
Deletes the current user's account.

**Returns:** Promise resolving to true if account deletion successful

**Throws:** Error object with message property on deletion failure

**Example:**
```javascript
try {
  const success = await deleteAccount();
  console.log('Account deleted:', success);
} catch (error) {
  console.error('Account deletion failed:', error.message);
}
```

## Session Management

The mock API uses localStorage to simulate session management:

- **Current User ID**: Stored in `localStorage.getItem('current-user-id')`
- **Mock Database**: Stored in `localStorage.getItem('mock-users-db')`
- **Session Persistence**: User ID persists across browser sessions

## Error Handling

All functions follow consistent error handling patterns:

```javascript
try {
  const result = await apiFunction(params);
  // Handle success
} catch (error) {
  // Error object structure: { message: string, code?: string, field?: string }
  console.error(error.message);
}
```

## Mock Data

The mock system includes:
- Pre-configured test users (john.doe@example.com, sarah.smith@example.com)
- Realistic JWT token generation
- User statistics and preferences
- Social login simulation

## Testing

To test the mock API:

1. **Login with existing user:**
   ```javascript
   await login('john.doe@example.com', 'password123');
   ```

2. **Register new user:**
   ```javascript
   await register({
     login: 'test@example.com',
     email: 'test@example.com',
     password: 'password123',
     firstName: 'Test',
     lastName: 'User',
     langKey: 'en'
   });
   ```

3. **Get current user:**
   ```javascript
   const user = await getCurrentUser();
   ```

4. **Update account:**
   ```javascript
   await updateAccount({ firstName: 'Updated' });
   ```

## Notes

- All functions are asynchronous and return Promises
- Mock delays simulate real API latency
- Data persistence uses localStorage
- Error messages are consistent with real API responses
- Type safety is maintained through JSDoc comments 