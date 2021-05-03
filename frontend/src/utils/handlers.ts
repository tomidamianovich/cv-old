import axios from "axios";
import { LanguageType } from "./type";
import constants from "../utils/constants";

export const handleRequest = (reqUrl: string, personId?: string) => {
  const { BASE_URL_API } = constants;
  return axios.get(`${BASE_URL_API}${reqUrl}${personId ? "/" + personId : ""}`);
};

export const getFormattedDate = (date: string, language:LanguageType = "es") => {
  const { MONTHS } = constants;
  const d = new Date(date)
  const year = d.getFullYear()
  const monthName = MONTHS[language][d.getMonth()]
  return monthName + ' ' + year
}
