import React, { useEffect, useState } from "react";
import { CourseDataType, StoreType } from "../../utils/type";
import { handleRequest } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import AsyncLoading from "../AsyncLoading";
import CONSTANTS from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setCourseData } from "../../redux/actions/actions";

type Props = {};

export const Course: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const personId: string = useSelector((state: StoreType) => state.personId);
  const courseData: CourseDataType[] = useSelector(
    (state: StoreType) => state.courseData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (courseData) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.COURSE, personId)
      .then((response) => dispatch(setCourseData(response.data)))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [personId, courseData, dispatch]);

  type CourseDetailsProps = {
    course: CourseDataType;
  };

  const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
    const { name, description, date, place } = course;
    return (
      <>
        <p>{name}</p>
        <p>{description}</p>
        <p>{date}</p>
        <p>{place.name}</p>
      </>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <>
        { courseData && courseData.map((course: CourseDataType, index: number) => (
          <CourseDetails course={course} key={index} />
        ))}
      </>
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Course);
