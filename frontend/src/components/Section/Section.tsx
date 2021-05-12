import React, { Suspense } from "react";
import Experience from "../Experience";
import Education from "../Education";
import Personal from "../Personal";
import Course from "../Course";
import Skill from "../Skill";
import Spinner from "../Spinner";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faBookmark,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";

type Props = {
  t: any;
  i18n: any;
};

export const SectionComponent: React.FC<Props> = ({ t, i18n }) => {
  return (
    <div>
      <Personal
        title={t("sections.personalData.name")}
        variant={"#f3ca0099"}
        icon={faUser}
      />
      <Experience
        title={t("sections.experience")}
        variant={"#ffb76c"}
        icon={faBriefcase}
      />
      <Education
        title={t("sections.education")}
        variant={"#f48a79"}
        icon={faGraduationCap}
      />
      <Course
        title={t("sections.course")}
        variant={"#94d4d0"}
        icon={faBookmark}
      />
      <Skill title={t("sections.skill")} variant={"#da80cf"} icon={faCode} />
    </div>
  );
};

const SectionWithI18n = withTranslation()(SectionComponent);

export default function Section() {
  return (
    <Suspense fallback={<Spinner />}>
      <SectionWithI18n />
    </Suspense>
  );
}
