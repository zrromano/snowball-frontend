import http from "./httpService";

const apiEndpoint = http.getAPIurl() + "/charities";

// Get a single charity by id
/*
  Return:
  Promise resolving with data from response
*/
export async function getCharity(id) {
  let requestURL = `${apiEndpoint}/${id}`;
  let response = await http.get(requestURL);
  let { data } = response;
  return data;
}

//Get a list of charities and associated information from the database
/*
  Parameters:
  sort - the field to sort results by
  order - ASC (default) or DESC
  start - the first result to return
  end - the last result to return
  filter - the field to filter results by
  filterValue - the value to filter results by

  Return:
  {
    data,   // array of results
    total   // total count of charity documents
  }
*/
export async function getCharityList(
  sort = "name",
  order = "ASC",
  start = 0,
  end = 10,
  filter = undefined,
  filterValue = undefined
) {
  let requestURL = `${apiEndpoint}?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`;
  if (filter && filterValue)
    requestURL = `${requestURL}&${filter}=${filterValue}`;

  let response = await http.get(requestURL);
  let { data, headers } = response;
  return {
    data,
    total: parseInt(headers["x-total-count"]),
  };
}

export async function getAllCharities() {
  let requestURL = `${apiEndpoint}?_sort=name&_order=ASC&_start=0&_end=0`;
  let response = await http.get(requestURL);
  let total = parseInt(response.headers["x-total-count"]);

  let start = 0;
  let end = 10;
  let results = [];

  while (start < total) {
    requestURL = `${apiEndpoint}?_sort=name&_order=ASC&_start=${start}&_end=${end}`;
    response = await http.get(requestURL);
    results = [...results, ...response.data];
    start = end;
    end = end + 10;
  }

  return results;
}
