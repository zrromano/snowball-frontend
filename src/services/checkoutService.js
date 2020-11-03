import http from "./httpService";

const apiEndpoint = http.getAPIurl();

// Toggle checkout on or off
/* 
  Parameters:
  user - current user object, authLevel should be admin or master

  Return:
  response
  or
  null if not authorized
*/
export async function toggleCheckout(user) {
  console.log(JSON.stringify(user));
  if (user.authLevel === "admin" || user.authLevel === "master") {
    return await http.put(`${apiEndpoint}/checkout`);
  } else return null;
}

// Check if checkout is currently active
// Returns true or false
export async function isCheckoutAvailable() {
  let response = await http.get(`${apiEndpoint}/checkout`);
  return response.data;
}

// Send a request to checkout
// Returns true or false
export async function checkout(
  quantity,
  price,
  charity,
  seller,
  user,
  cardNumber,
  expirationDate,
  cardCode
) {
  let response = await http.post(`${apiEndpoint}/checkout`, {
    quantity,
    price,
    charity,
    seller,
    user,
    cardNumber,
    expirationDate,
    cardCode,
  });

  return response;
}
