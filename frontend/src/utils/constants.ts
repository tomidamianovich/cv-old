const APP_NAME = "CV";
const BASE_URL = "http://localhost:8000/";
const BASE_URL_API = `${BASE_URL}api/`;
const BASE_URL_API_PATHS = {
  PERSONAL_DATA: "person",
  SKILL: "skill",
  COURSE: "course",
  SOCIAL: "social",
  EXPERIENCE: "experience",
  EDUCATION: "education",
};
const MONTHS = {
  "es": [
    'Enero',
    'Febreo',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  "en": [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}

const CONSTANTS = {
  APP_NAME,
  BASE_URL,
  BASE_URL_API,
  BASE_URL_API_PATHS,
  MONTHS
};

export default CONSTANTS;
