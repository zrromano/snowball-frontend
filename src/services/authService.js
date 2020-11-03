import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = http.getAPIurl() + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

// Send a login request to the API and set a JWT in local storage
/*
  Parameters:
  email - string,
  password - string

  No return
*/
export async function login(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  const token = response.data.token;
  localStorage.setItem(tokenKey, token);
}

// Verify a user's password is correct, without saving the token
/*
  Parameters:
  email - string,
  password - string

  Returns:
  boolean
*/
export async function verify(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  return !!response.data.token;
}

// Save a given JWT to local storage
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

// Delete JWT from local storage
export function logout() {
  localStorage.removeItem(tokenKey);
}

// Returns logged in user's data as a JSON object
/*
  Return:
  {
    _id,
    name,
    phone,
    email,
    authLevel
  }
  or null
*/
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

// Retrieve currently saved JWT from local storage
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  verify,
};
