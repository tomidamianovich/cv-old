import { CourseDataType, EducationDataType, ExperienceDataType, PersonalDataType, SkillDataType } from "../../utils/type";
import actionTypes from "../actionsTypes/StoreTypes";

// case actionTypes.SET_PERSON_ID:
//     case actionTypes.SET_PERSONAL_DATA:
//     case actionTypes.SET_SOCIAL_DATA:
//     case actionTypes.SET_EDUCATION_DATA:
//     case actionTypes.SET_COURSE_DATA:
//     case actionTypes.SET_SKILL_DATA:

type PersonIdAction = {
  type: string;
  payload: string;
};

type PersonalDataAction = {
  type: string;
  payload: PersonalDataType
};

type ExperienceDataAction = {
  type: string;
  payload: ExperienceDataType
};

type EducationalDataAction = {
  type: string;
  payload: EducationDataType
};

type CourseDataAction = {
  type: string;
  payload: CourseDataType
};

type SkillDataAction = {
  type: string;
  payload: SkillDataType
};


export function setPersonId(payload: PersonIdAction["payload"]) {
  const action: PersonIdAction = {
    type: actionTypes.SET_PERSON_ID,
    payload,
  };
  return action;
}

export function setPersonalData(payload: PersonalDataAction["payload"]) {
  const action: PersonalDataAction = {
    type: actionTypes.SET_PERSONAL_DATA,
    payload,
  };
  return action;
}

export function setExperienceData(payload: ExperienceDataAction["payload"]) {
  const action: ExperienceDataAction = {
    type: actionTypes.SET_EXPERIENCE_DATA,
    payload,
  };
  return action;
}

export function setEducationalData(payload: EducationalDataAction["payload"]) {
  const action: EducationalDataAction = {
    type: actionTypes.SET_EDUCATION_DATA,
    payload,
  };
  return action;
}

export function setCourseData(payload: CourseDataAction["payload"]) {
  const action: CourseDataAction = {
    type: actionTypes.SET_COURSE_DATA,
    payload,
  };
  return action;
}

export function setSkillData(payload: SkillDataAction["payload"]) {
  const action: SkillDataAction = {
    type: actionTypes.SET_SKILL_DATA,
    payload,
  };
  return action;
}
