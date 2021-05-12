import React, { useEffect, useState } from "react";
import { CourseDataType, StoreType } from "../../utils/type";
import { handleRequest, getFormattedDate } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import ListItem from "../ListItem";
import CONSTANTS from "../../utils/constants";
import ErrorSection from "../ErrorSection";
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
    if (
      courseData &&
      courseData[0].person_id === personId &&
      courseData[0].name !== CONSTANTS.PLACEHOLDERS.TEXT
    ) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.COURSE, personId)
      .then((response) => dispatch(setCourseData(response.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [personId, courseData, dispatch]);

  type CourseDetailsProps = {
    course: CourseDataType;
  };

  const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
    const { name, description, date, place } = course;
    return (
      <ListItem
        imageValue={place.image}
        imageName={place.name}
        title={name}
        loading={loading}
        subtitle={`${getFormattedDate(date)}`}
        description={description}
      />
    );
  };

  return (
    <>
      {
        courseData && !error &&
          courseData.map((course: CourseDataType, index: number) => (
            <CourseDetails course={course} key={index} />
          ))
      }
      {
        error && <ErrorSection />
      }
    </>
  );
};

export default withSectionItemHOC(Course);
