import _ from "lodash";

// takes a list of items, current pageNumber, and pageSize
// returns items on the current page
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
