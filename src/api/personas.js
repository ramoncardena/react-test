import * as config from "../config";

export const getAll = amount =>
  fetch(config.BASE_URL + "/?results=" + amount, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });