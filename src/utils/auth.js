// src/utilites/auth.js
// Helper to decode JWT from localStorage
export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch (e) {
    return null;
  }
}

export function getToken(){
  return localStorage.getItem("jwt");
}

export function setToken(token){
  localStorage.setItem("jwt", token)
}

export function delToken(){
   localStorage.removeItem("jwt");
}