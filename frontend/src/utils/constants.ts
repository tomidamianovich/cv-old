const APP_NAME = "CV";
const BASE_URL = "https://glacial-mesa-61165.herokuapp.com/";
const BASE_URL_API = `${BASE_URL}api/`;
const BASE_URL_API_PATHS = {
  PERSONAL_DATA: "person",
  PERSONAL_DATA_LANGUAGE: "person/language/",
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
const PLACEHOLDERS = {
 TEXT: "Lorem ipsum dolor sit amet.",
 NUMBER: 0
}

const CONSTANTS = {
  APP_NAME,
  PLACEHOLDERS,
  BASE_URL,
  BASE_URL_API,
  BASE_URL_API_PATHS,
  MONTHS
};

export default CONSTANTS;
