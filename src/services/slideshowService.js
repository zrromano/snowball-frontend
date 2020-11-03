import http from "./httpService";

const apiEndpoint = http.getAPIurl() + "/slideshow";

// Get all slideshow images in the given range
/*
  Paramaeters:
  start - first result to return
  end - last result to return

  Return:
  {
    data,   // array of slideshow objects
    total   // total count of slideshow images in database
  }
*/
/*
  slideshow = {
    description,  // string
    image         // base64 image string
  }
*/
export async function getSlideshowImages(start = 0, end = 10) {
  let requestURL = `${apiEndpoint}?_sort=description&_order=ASC&_start=${start}&_end=${end}`;
  let response = await http.get(requestURL);
  let { data, headers } = response;
  return {
    data,
    total: parseInt(headers["x-total-count"]),
  };
}

export async function getAllSlideshowImages() {
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
