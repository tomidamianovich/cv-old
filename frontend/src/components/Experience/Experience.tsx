import React, { useEffect, useState } from "react";
import { ExperienceDataType, StoreType } from "../../utils/type";
import CONSTANTS from "../../utils/constants";
import { handleRequest } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import AsyncLoading from "../AsyncLoading";
import { setExperienceData } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

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
    if (experienceData) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.EXPERIENCE, personId)
      .then((response) => dispatch(setExperienceData(response.data)))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [dispatch, personId, experienceData, loading]);

  const ExperienceDetails: React.FC<{
    job: ExperienceDataType;
  }> = ({ job }) => {
    const { jobTitle, jobDescription, startDate, endDate, place } = job;
    return (
      <>
        <p>{jobTitle}</p>
        <p>{jobDescription}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{place.name}</p>
      </>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <>
        {experienceData && experienceData.map((job: ExperienceDataType, index: number) => (
          <ExperienceDetails job={job} key={index} />
        ))}
      </>
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Experience);
