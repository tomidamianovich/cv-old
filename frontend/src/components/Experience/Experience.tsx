import React, { useEffect, useState } from "react";
import { ExperienceDataType, StoreType } from "../../utils/type";
import CONSTANTS from "../../utils/constants";
import { handleRequest, getFormattedDate } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import ErrorSection from "../ErrorSection";
import { setExperienceData } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "../ListItem";

type Props = {};

export const Experience: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const personId: string = useSelector((state: StoreType) => state.personId);
  const experienceData: ExperienceDataType[] = useSelector(
    (state: StoreType) => state.experienceData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (
      experienceData &&
      experienceData[0].person_id === personId &&
      experienceData[0].id !== CONSTANTS.PLACEHOLDERS.TEXT
    ) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.EXPERIENCE, personId)
      .then((response) => dispatch(setExperienceData(response.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch, personId, experienceData, loading]);

  const ExperienceDetails: React.FC<{
    job: ExperienceDataType;
    isCurrentJob: boolean;
  }> = ({ job, isCurrentJob }) => {
    const { jobTitle, jobDescription, startDate, endDate, place } = job;
    return (
      <ListItem
        imageValue={place.image}
        imageName={place.name}
        title={`${jobTitle} (${jobDescription}) `}
        subtitle={`${getFormattedDate(startDate)} - ${
          isCurrentJob ? "Actualidad" : getFormattedDate(endDate)
        }`}
        description={place.name}
        loading={loading}
      />
    );
  };

  return (
    <>
      {experienceData && !error && 
        experienceData.map((job: ExperienceDataType, index: number) => (
          <ExperienceDetails job={job} key={index} isCurrentJob={index === 0} />
        ))}
      {
        error && <ErrorSection />
      }
    </>
  );
};

export default withSectionItemHOC(Experience);
