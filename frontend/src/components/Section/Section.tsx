import React from "react";
import Experience from "../Experience";
import Education from "../Education";
import Personal from "../Personal";
import Course from "../Course";
import Skill from "../Skill";

type Props = {};

export const Section: React.FC<Props> = () => {
  return (
    <>
      <Personal />
      <Experience />
      <Education />
      <Course />
      <Skill />
    </>
  );
};

export default Section;
