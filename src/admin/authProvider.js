import decodeJwt from "jwt-decode";

let apiEndpoint = "http://localhost:3100/api/auth";
export default {
  login: ({ username, password }) => {
    const request = new Request(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);
        localStorage.setItem("token", token);
        localStorage.setItem("permissions", decodedToken.authLevel);
      });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  checkError: error => {
    // ...
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    let permissions = {};
    permissions.role = localStorage.getItem("permissions");
    let token = localStorage.getItem("token");
    token = decodeJwt(token);
    permissions.name = token.name;
    return permissions.role ? Promise.resolve(permissions) : Promise.reject();
  }
};
