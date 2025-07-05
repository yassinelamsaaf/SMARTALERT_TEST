

// Mock JWT tokens for different users
const generateMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.login,
    login: user.login,
    email: user.email,
    authorities: user.authorities,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

// Mock user database
const mockUsers = [
  {
    id: "user_001",
    login: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    activated: true,
    langKey: "en",
    createdBy: "system",
    createdDate: "2024-01-01T10:00:00Z",
    lastModifiedBy: "john.doe@example.com",
    lastModifiedDate: "2024-01-15T14:30:00Z",
    authorities: ["ROLE_USER"],
    password: "password123",
    socialLogin: false,
    lastLogin: "2024-01-20T09:15:00Z",
    preferences: {
      language: "en",
      theme: "light",
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
    },
    stats: {
      totalAlerts: 5,
      activeAlerts: 3,
      totalAnnouncements: 45,
      unreadAnnouncements: 12,
      lastLoginDate: "2024-01-20T09:15:00Z",
      accountCreatedDate: "2024-01-01T10:00:00Z",
    },
  },
  {
    id: "user_002",
    login: "sarah.smith@example.com",
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah.smith@example.com",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    activated: true,
    langKey: "fr",
    createdBy: "system",
    createdDate: "2024-01-05T11:30:00Z",
    lastModifiedBy: "sarah.smith@example.com",
    lastModifiedDate: "2024-01-18T16:45:00Z",
    authorities: ["ROLE_USER"],
    password: "password123",
    socialLogin: false,
    lastLogin: "2024-01-19T13:20:00Z",
    preferences: {
      language: "fr",
      theme: "dark",
      notifications: {
        email: true,
        push: false,
        sms: true,
      },
    },
    stats: {
      totalAlerts: 8,
      activeAlerts: 6,
      totalAnnouncements: 78,
      unreadAnnouncements: 5,
      lastLoginDate: "2024-01-19T13:20:00Z",
      accountCreatedDate: "2024-01-05T11:30:00Z",
    },
  },
];

// Initialize mock database in localStorage
localStorage.setItem("mock-users-db", JSON.stringify(mockUsers));

// Helper functions for user management
export function mockgetUsers() {
  return JSON.parse(localStorage.getItem("mock-users-db") || "[]");
}

export function mocksetUsers(users) {
  localStorage.setItem("mock-users-db", JSON.stringify(users));
}

export function mockfindUserByEmail(email) {
  const users = mockgetUsers();
  return users.find(user => user.email === email || user.login === email);
}

export function mockfindUserById(id) {
  const users = mockgetUsers();
  return users.find(user => user.id === id);
}

export function mockcreateUser(userData) {
  const users = mockgetUsers();
  const _userData = {
    id: `user_${Date.now()}`,
    ...userData,
    activated: false,
    createdDate: new Date().toISOString(),
    lastModifiedDate: new Date().toISOString(),
    authorities: ["ROLE_USER"],
    socialLogin: false,
    stats: {
      totalAlerts: 0,
      activeAlerts: 0,
      totalAnnouncements: 0,
      unreadAnnouncements: 0,
      lastLoginDate: null,
      accountCreatedDate: new Date().toISOString(),
    },
  };
  users.push(_userData);
  mocksetUsers(users);
  return _userData;
}

export function mockupdateUser(id, userData) {
  const users = mockgetUsers();
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    lastModifiedDate: new Date().toISOString(),
  };
  mocksetUsers(users);
  return users[userIndex];
}

export function mockdeleteUser(id) {
  const users = mockgetUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  mocksetUsers(filteredUsers);
  return true;
}

// Authentication functions
export function mockauthenticateUser(email, password) {
  const user = mockfindUserByEmail(email);
  if (!user || user.password !== password || !user.activated) {
    return null;
  }
  
  // Update last login
  mockupdateUser(user.id, { lastLogin: new Date().toISOString() });
  
  // Generate JWT token
  const token = generateMockJWT(user);
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token,
  };
}

export function mockauthenticateWithGoogle(token, langKey) {
  // Simulate Google authentication
  const googleUser = mockfindUserByEmail("google.user@gmail.com");
  if (!googleUser) {
    // Create new Google user
    const newUser = mockcreateUser({
      login: "google.user@gmail.com",
      email: "google.user@gmail.com",
      firstName: "Google",
      lastName: "User",
      langKey: langKey || "en",
      password: "",
      socialLogin: true,
    });
    const jwtToken = generateMockJWT(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: jwtToken,
    };
  }
  
  // Update existing user
  mockupdateUser(googleUser.id, { 
    lastLogin: new Date().toISOString(),
    langKey: langKey || googleUser.langKey,
  });
  
  const jwtToken = generateMockJWT(googleUser);
  const { password: _, ...userWithoutPassword } = googleUser;
  
  return {
    user: userWithoutPassword,
    token: jwtToken,
  };
}

export function mockauthenticateWithFacebook(token, langKey) {
  // Simulate Facebook authentication
  const facebookUser = mockfindUserByEmail("facebook.user@example.com");
  if (!facebookUser) {
    // Create new Facebook user
    const newUser = mockcreateUser({
      login: "facebook.user@example.com",
      email: "facebook.user@example.com",
      firstName: "Facebook",
      lastName: "User",
      langKey: langKey || "en",
      password: "",
      socialLogin: true,
    });
    const jwtToken = generateMockJWT(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: jwtToken,
    };
  }
  
  // Update existing user
  mockupdateUser(facebookUser.id, { 
    lastLogin: new Date().toISOString(),
    langKey: langKey || facebookUser.langKey,
  });
  
  const jwtToken = generateMockJWT(facebookUser);
  const { password: _, ...userWithoutPassword } = facebookUser;
  
  return {
    user: userWithoutPassword,
    token: jwtToken,
  };
}

// Mock API responses
export function getMockAuthResponse(user, token) {
  return {
    id_token: token,
    token_type: "Bearer",
    expires_in: 86400, // 24 hours
    scope: "read write",
    refresh_token: `refresh_${Date.now()}`,
  };
}

export function getMockUserResponse(user) {
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Export default users for direct access
export default mockUsers;
