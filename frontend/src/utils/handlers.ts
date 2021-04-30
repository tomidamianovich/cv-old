import axios from "axios";
import constants from "../utils/constants";

export const handleRequest = (reqUrl: string, personId?: string) => {
  const { BASE_URL_API } = constants;
  return axios.get(`${BASE_URL_API}${reqUrl}${personId ? "/" + personId : ""}`);
};
