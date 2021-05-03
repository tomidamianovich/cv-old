import React from "react";
import Experience from "../Experience";
import Education from "../Education";
import Personal from "../Personal";
import Course from "../Course";
import Skill from "../Skill";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faBookmark,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

export const Section: React.FC<Props> = () => {
  return (
    <div>
      <Personal
        title={"Datos Personales"}
        variant={"#f3ca0099"}
        icon={faUser}
      />
      <Experience
        title={"Experiencia"}
        variant={"#ffb76c"}
        icon={faBriefcase}
      />
      <Education
        title={"Educacion"}
        variant={"#f48a79"}
        icon={faGraduationCap}
      />
      <Course title={"Cursos"} variant={"#94d4d0"} icon={faBookmark} />
      <Skill title={"Skills"} variant={"#da80cf"} icon={faCode} />
    </div>
  );
};

export default Section;
