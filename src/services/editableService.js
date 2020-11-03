import http from "./httpService";

const apiEndpoint = http.getAPIurl();

// All update functions take in a user object to ensure authorization level
// and return null if authorization level is not met

// Takes in a single string and updates the Home Page text in the
// API editable model
//
// Returns a promise that resolves with the updated information
export async function updateHomePage(user, text) {
  if (user.authLevel === "admin" || user.authLevel === "master") {
    return await http.put(`${apiEndpoint}/editable/homePage`, {
      homePage: text,
    });
  } else return null;
}

// Takes in a single string and updates the About Us text in the
// API editable model
//
// Returns a promise that resolves with the updated information
export async function updateAboutUs(user, text) {
  if (user.authLevel === "admin" || user.authLevel === "master") {
    return await http.put(`${apiEndpoint}/editable/aboutUs`, {
      aboutUs: text,
    });
  } else return null;
}

// Takes in a single string and updates the Contact text in the
// API editable model
//
// Returns a promise that resolves with the updated information
export async function updateContact(user, text) {
  if (user.authLevel === "admin" || user.authLevel === "master") {
    return await http.put(`${apiEndpoint}/editable/contact`, {
      contact: text,
    });
  } else return null;
}

// Takes in an array of objects of the form
// {
//      question: string,
//      answer: string
// }
// and updates the FAQS in the API editable model
//
// Returns a promise that resolves with the updated information
export async function updateFAQs(user, FAQarr) {
  if (user.authLevel === "admin" || user.authLevel === "master") {
    return await http.put(`${apiEndpoint}/editable/FAQs`, {
      FAQs: FAQarr,
    });
  } else return null;
}

// Returns a promise that resolves with the Home Page text from the API
export async function getHomePage() {
  let response = await http.get(`${apiEndpoint}/homePage`);
  return response.data;
}

// Returns a promise that resolves with the About Us text from the API
export async function getAboutUs() {
  let response = await http.get(`${apiEndpoint}/aboutUs`);
  return response.data;
}

// Returns a promise that resolves with the Contact text from the API
export async function getContact() {
  let response = await http.get(`${apiEndpoint}/contact`);
  return response.data;
}

// Returns a promise that resolves with the FAQ array from the API
// FAQs are objects of the form
// {
//      question: string,
//      answer: string
// }
export async function getFAQs() {
  let response = await http.get(`${apiEndpoint}/FAQs`);
  return response.data;
}
