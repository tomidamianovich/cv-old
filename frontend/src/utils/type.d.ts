// Types

export type placeType = {
  name: string;
  image: string;
};

const TYPES = ['es', 'en'] as const;
export type LanguageType = typeof TYPES[number];

export type ListItemDetailsType = {
  imageName: string;
  imageValue: string;
  title: string;
  loading: boolean;
  subtitle: string;
  description: string;
}

export type PersonalDataType = {
  prefix: string;
  description: string;
  name: string;
  lastname: string;
  age: number;
  civilStatus: string;
  locationName: string;
  locationValue: string;
  profilePhoto: string;
  experience: any;
  social: SocialDataType;
};

export type SocialDataType = {
  _id: string;
  instagram: string;
  facebook: string;
  telephone: string;
  mail: string;
  linkedIn: string;
  person_id: string;
};

export type ExperienceDataType = {
  id: string;
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  endDate: string;
  person_id: string;
  place: placeType;
};

export type EducationDataType = {
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  place_id: string;
  person_id: string;
  place: placeType;
};

export type SkillDataType = {
  id: string;
  name: string;
  percentage: number;
};

export type CourseDataType = {
  name: string;
  person_id: string;
  description: string;
  date: string;
  place: {
    name: string;
    image: string;
  };
};

export type StoreState = StoreType;

export type StoreAction = {
  type: string;
  payload: any
};

export type StoreType = {
  personId: string,
  personData: PersonalDataType,
  personalData: PersonalDataType,
  courseData: CourseDataType[],
  educationalData: EducationDataType[],
  experienceData: ExperienceDataType[],
  skillData: SkillDataType[],
  socialData: SocialDataType
};

export type StoreDispatchType = (args: StoreAction) => StoreAction;

// Combined Types

export type CombinedState = {
  StoreReducers: StoreState;
};

export type CombinedAction = {
  StoreReducers: StoreAction;
};

export type CombinedDispatchType = (args: CombinedAction) => CombinedAction;
