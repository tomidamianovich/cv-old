import actionTypes from "../actionsTypes/StoreTypes";
import { StoreType, StoreAction } from "../../utils/type";
import { initialState } from "../initialState";

const reducer = (
  state: StoreType = initialState,
  action: StoreAction
): StoreType => {
  switch (action.type) {
    case actionTypes.SET_PERSON_ID:
      return {
        ...state,
        personId: action.payload,
      };
    case actionTypes.SET_PERSON_DATA:
      return {
        ...state,
        personData: action.payload,
      };
    case actionTypes.SET_PERSONAL_DATA:
      return {
        ...state,
        personalData: action.payload,
      };
    case actionTypes.SET_EXPERIENCE_DATA:
      return {
        ...state,
        experienceData: action.payload,
      };
    case actionTypes.SET_EDUCATION_DATA:
      return {
        ...state,
        educationalData: action.payload,
      };
    case actionTypes.SET_COURSE_DATA:
      return {
        ...state,
        courseData: action.payload,
      };
    case actionTypes.SET_SKILL_DATA:
      return {
        ...state,
        skillData: action.payload,
      };
    case actionTypes.SET_SOCIAL_DATA:
      return {
        ...state,
        socialData: action.payload,
      };
  }
  return state;
};

export default reducer;
