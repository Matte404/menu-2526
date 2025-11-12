import { BASE_PATH } from "./config.js";

export const apiFetch = async (url: string) => {
  return fetch(`${BASE_PATH}${url}`);
};
