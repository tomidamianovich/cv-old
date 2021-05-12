import CONSTANTS from "../utils/constants";
import { StoreType } from "../utils/type";

const courseDataPlaceholder = {
  name: CONSTANTS.PLACEHOLDERS.TEXT,
  description: CONSTANTS.PLACEHOLDERS.TEXT,
  person_id: CONSTANTS.PLACEHOLDERS.TEXT,
  date: CONSTANTS.PLACEHOLDERS.TEXT,
  place: {
    name: CONSTANTS.PLACEHOLDERS.TEXT,
    image: CONSTANTS.PLACEHOLDERS.TEXT,
  }
}

const educationalDataPlaceholder = {
  degree: CONSTANTS.PLACEHOLDERS.TEXT,
  description: CONSTANTS.PLACEHOLDERS.TEXT,
  startDate: CONSTANTS.PLACEHOLDERS.TEXT,
  endDate: CONSTANTS.PLACEHOLDERS.TEXT,
  place_id: CONSTANTS.PLACEHOLDERS.TEXT,
  person_id: CONSTANTS.PLACEHOLDERS.TEXT,
  place: {
    name: CONSTANTS.PLACEHOLDERS.TEXT,
    image: CONSTANTS.PLACEHOLDERS.TEXT,
  }
}

const experienceDataPlaceholder = {
  id: CONSTANTS.PLACEHOLDERS.TEXT,
  jobTitle: CONSTANTS.PLACEHOLDERS.TEXT,
  jobDescription: CONSTANTS.PLACEHOLDERS.TEXT,
  startDate: CONSTANTS.PLACEHOLDERS.TEXT,
  endDate: CONSTANTS.PLACEHOLDERS.TEXT,
  person_id: CONSTANTS.PLACEHOLDERS.TEXT,
  place: {
    name: CONSTANTS.PLACEHOLDERS.TEXT,
    image: CONSTANTS.PLACEHOLDERS.TEXT,
  }
}

const skillDataPlaceholder = {
  id: CONSTANTS.PLACEHOLDERS.TEXT,
  name: CONSTANTS.PLACEHOLDERS.TEXT,
  percentage: CONSTANTS.PLACEHOLDERS.NUMBER,
}

export const initialState: StoreType = {
  personId: CONSTANTS.PLACEHOLDERS.TEXT,
  personData: {
    prefix: CONSTANTS.PLACEHOLDERS.TEXT,
    description: CONSTANTS.PLACEHOLDERS.TEXT,
    name: CONSTANTS.PLACEHOLDERS.TEXT,
    lastname: CONSTANTS.PLACEHOLDERS.TEXT,
    age: CONSTANTS.PLACEHOLDERS.NUMBER,
    civilStatus: CONSTANTS.PLACEHOLDERS.TEXT,
    locationName: CONSTANTS.PLACEHOLDERS.TEXT,
    locationValue: CONSTANTS.PLACEHOLDERS.TEXT,
    profilePhoto: CONSTANTS.PLACEHOLDERS.TEXT,
    experience: {
      title: CONSTANTS.PLACEHOLDERS.TEXT,
      place: CONSTANTS.PLACEHOLDERS.TEXT 
    },
    social: {
      _id: CONSTANTS.PLACEHOLDERS.TEXT,
      instagram: CONSTANTS.PLACEHOLDERS.TEXT,
      facebook: CONSTANTS.PLACEHOLDERS.TEXT,
      telephone: CONSTANTS.PLACEHOLDERS.TEXT,
      mail: CONSTANTS.PLACEHOLDERS.TEXT,
      linkedIn: CONSTANTS.PLACEHOLDERS.TEXT,
      person_id: CONSTANTS.PLACEHOLDERS.TEXT,
    }
  },
  personalData: {
    prefix: CONSTANTS.PLACEHOLDERS.TEXT,
    description: CONSTANTS.PLACEHOLDERS.TEXT,
    name: CONSTANTS.PLACEHOLDERS.TEXT,
    lastname: CONSTANTS.PLACEHOLDERS.TEXT,
    age: CONSTANTS.PLACEHOLDERS.NUMBER,
    civilStatus: CONSTANTS.PLACEHOLDERS.TEXT,
    locationName: CONSTANTS.PLACEHOLDERS.TEXT,
    locationValue: CONSTANTS.PLACEHOLDERS.TEXT,
    profilePhoto: CONSTANTS.PLACEHOLDERS.TEXT,
    experience: {
      title: CONSTANTS.PLACEHOLDERS.TEXT,
      place: CONSTANTS.PLACEHOLDERS.TEXT 
    },
    social: {
      _id: CONSTANTS.PLACEHOLDERS.TEXT,
      instagram: CONSTANTS.PLACEHOLDERS.TEXT,
      facebook: CONSTANTS.PLACEHOLDERS.TEXT,
      telephone: CONSTANTS.PLACEHOLDERS.TEXT,
      mail: CONSTANTS.PLACEHOLDERS.TEXT,
      linkedIn: CONSTANTS.PLACEHOLDERS.TEXT,
      person_id: CONSTANTS.PLACEHOLDERS.TEXT,
    }
  },
  courseData: [
    courseDataPlaceholder,
    courseDataPlaceholder,
    courseDataPlaceholder
  ],
  educationalData: [
    educationalDataPlaceholder,
    educationalDataPlaceholder,
    educationalDataPlaceholder
  ],
  experienceData: [
    experienceDataPlaceholder,
    experienceDataPlaceholder,
    experienceDataPlaceholder
  ],
  skillData: [
    skillDataPlaceholder,
    skillDataPlaceholder,
    skillDataPlaceholder
  ],
  socialData: {
    _id: CONSTANTS.PLACEHOLDERS.TEXT,
    instagram: CONSTANTS.PLACEHOLDERS.TEXT,
    facebook: CONSTANTS.PLACEHOLDERS.TEXT,
    telephone: CONSTANTS.PLACEHOLDERS.TEXT,
    mail: CONSTANTS.PLACEHOLDERS.TEXT,
    linkedIn: CONSTANTS.PLACEHOLDERS.TEXT,
    person_id: CONSTANTS.PLACEHOLDERS.TEXT,
  }
};