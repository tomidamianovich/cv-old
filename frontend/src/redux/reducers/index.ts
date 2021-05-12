import actionTypes from "../actionsTypes/StoreTypes";
import { StoreType, StoreAction } from "../../utils/type";

export function setPersonId(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_PERSON_ID,
    payload,
  };
  return action;
}

export function setPersonData(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_PERSON_DATA,
    payload,
  };
  return action;
}

export function setPersonalData(payload: StoreAction["payload"]) {
  const action: StoreAction = {
    type: actionTypes.SET_PERSONAL_DATA,
    payload,
  };
  return action;
}

export function setSocialData(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_SOCIAL_DATA,
    payload,
  };
  return action;
}

export function setEducationData(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_EDUCATION_DATA,
    payload,
  };
  return action;
}

export function setCourseData(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_COURSE_DATA,
    payload,
  };
  return action;
}

export function setSkillData(payload: StoreType) {
  const action: StoreAction = {
    type: actionTypes.SET_SKILL_DATA,
    payload,
  };
  return action;
}
