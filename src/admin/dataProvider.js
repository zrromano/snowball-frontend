import jsonServerProvider from "ra-data-json-server";
import { HttpError } from "react-admin";
import { toast } from "react-toastify";

const fetchJson = async (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: "application/json",
    });

  if (
    !requestHeaders.has("Content-Type") &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
  }

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const body = await response.text();
  const { status, statusText, headers } = response;

  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    // not json, no big deal
  }

  if (status < 200 || status >= 300) {
    toast.error(body);
    return Promise.reject(
      new HttpError(
        (json && json.error && json.error.message) || statusText,
        status,
        json
      )
    );
  }

  return Promise.resolve({
    status: status,
    headers: headers,
    body: body,
    json: json,
  });
};

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("x-auth-token", token);
  return fetchJson(url, options);
};

const defaultDataProvider = jsonServerProvider(
  "http://localhost:3100/api",
  httpClient
);

const dataProvider = {
  ...defaultDataProvider,
  create: (resource, params) => {
    if (resource === "charities" && params.data.banner) {
      return Promise.all([convertFileToBase64(params.data.banner)]).then(
        (results) => {
          return defaultDataProvider.create(resource, {
            ...params,
            data: {
              ...params.data,
              banner: results[0],
            },
          });
        }
      );
    } else if (resource === "slideshow" && params.data.image) {
      return Promise.all([convertFileToBase64(params.data.image)]).then(
        (results) => {
          return defaultDataProvider.create(resource, {
            ...params,
            data: {
              ...params.data,
              image: results[0],
            },
          });
        }
      );
    } else if (resource === "sponsors" && params.data.logo) {
      return Promise.all([convertFileToBase64(params.data.logo)]).then(
        (results) => {
          return defaultDataProvider.create(resource, {
            ...params,
            data: {
              ...params.data,
              logo: results[0],
            },
          });
        }
      );
    } else {
      return defaultDataProvider.create(resource, params);
    }
  },
  update: (resource, params) => {
    if (resource === "charities" && params.data.banner) {
      return Promise.all([convertFileToBase64(params.data.banner)]).then(
        (results) => {
          return defaultDataProvider.update(resource, {
            ...params,
            data: {
              ...params.data,
              banner: results[0],
            },
          });
        }
      );
    } else if (resource === "slideshow" && params.data.image) {
      return Promise.all([convertFileToBase64(params.data.image)]).then(
        (results) => {
          return defaultDataProvider.update(resource, {
            ...params,
            data: {
              ...params.data,
              image: results[0],
            },
          });
        }
      );
    } else if (resource === "sponsors" && params.data.logo) {
      return Promise.all([convertFileToBase64(params.data.logo)]).then(
        (results) => {
          return defaultDataProvider.update(resource, {
            ...params,
            data: {
              ...params.data,
              logo: results[0],
            },
          });
        }
      );
    } else {
      return defaultDataProvider.update(resource, params);
    }
  },
};

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });
export default dataProvider;
