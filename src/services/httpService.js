import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["accepts"] = "application/json";

// handles all unexpected errors and logs expected ones
axios.interceptors.response.use(null, (error) => {
  // Expected (404: not found, 400: bad request) - CLIENT ERRORS
  //  - Display a specific error message
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Unexpected (network down, server down, db down, bug)
  //  - Log them
  //  - Display a generic and friendly error message
  console.log("Error log: ", error);
  if (!expectedError) {
    toast.error("An unexpected error occured,");
  }
  return Promise.reject(error);
});

// Sets the JWT to send with all HTTP requests for authentication
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

// Returns the base URL used to send requests to the API
export function getAPIurl() {
  return /*process.env.REACT_APP_API_URL*/ "/api";
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  getAPIurl,
};
