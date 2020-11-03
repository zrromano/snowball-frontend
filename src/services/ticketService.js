import http from "./httpService";

const apiEndpoint = http.getAPIurl() + "/tickets";

// Create a ticket using the given user's information
/*
  Parameters:
  user - A user object, from authService's getCurrentUser()
  charity - string, should be selected from list of charities
  seller - string, filled in by user or populated from checkout link

  Returns:
  http response
*/
export function createTicket(
  user,
  charity,
  seller = "Not given",
  quantity = 1
) {
  return http.post(apiEndpoint, {
    holderName: user.name,
    holderNumber: user.phone,
    holderEmail: user.email,
    charity,
    seller,
    quantity,
  });
}

// Find a specific ticket by its id
/*
  Parameters:
  id - the id of the ticket to retrieve

  Returns:
  http response
*/
export async function getTicket(id) {
  let requestURL = `${apiEndpoint}/${id}`;
  return await http.get(requestURL);
}

export async function getWinningTicket(combination) {
  let requestURL = `${apiEndpoint}?_sort=charity&_order=ASC&_start=0&_end=1&pair.firstNumber=${combination[0]}&pair.secondNumber=${combination[1]}`;
  let response = await http.get(requestURL);
  let { data } = response;
  return { data };
}

// Get a list of a single user's tickets
/*
  Parameters:
  user - A user object, from authService's getCurrentUser()
  start - the first ticket in the list
  end - the last ticket in the list

  Returns:
  data - the list of tickets
  total - int count of user's total tickets
*/
export async function getTickets(user, start = 0, end = 10) {
  let requestURL = `${apiEndpoint}?_sort=charity&_order=ASC&_start=${start}&_end=${end}&holderName=${user.name}&holderNumber=${user.phone}`;
  let response = await http.get(requestURL);
  let { data, headers } = response;
  return {
    data,
    total: parseInt(headers["x-total-count"]),
  };
}

export async function getAllTickets(user) {
  let requestURL = `${apiEndpoint}?_sort=charity&_order=ASC&_start=0&_end=0&holderEmail=${user.email}`;
  let response = await http.get(requestURL);
  let total = parseInt(response.headers["x-total-count"]);

  let start = 0;
  let end = 10;
  let results = [];

  while (start < total) {
    requestURL = `${apiEndpoint}?_sort=charity&_order=ASC&_start=${start}&_end=${end}&holderName=${user.name}&holderNumber=${user.phone}`;
    response = await http.get(requestURL);
    results = [...results, ...response.data];
    start = end;
    end = end + 10;
  }

  return results;
}
// Assign number combinations to tickets in database
/*
  Returns:
  data: {
    count,  // total number of tickets
    unused, // number combinations not assigned to tickets
    maxnum  // highest number needed to generate a combination for every ticket
  }
*/
export async function assignCombinations() {
  let requestURL = `${apiEndpoint}/assignWinningNumbers`;
  let response = await http.put(requestURL);
  let { data } = response;
  return {
    data,
  };
}

export async function clearTickets() {
  let requestURL = `${apiEndpoint}/clear`;
  let response = await http.delete(requestURL);
  let { data } = response;
  return {
    data,
  };
}
