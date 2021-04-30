import React, { useEffect, useState } from "react";
import { EducationDataType, StoreType } from "../../utils/type";
import { handleRequest } from "../../utils/handlers";
import CONSTANTS from "../../utils/constants";
import withSectionItemHOC from "../withSectionItemHOC";
import AsyncLoading from "../AsyncLoading";
import { useSelector, useDispatch } from "react-redux";
import { setEducationalData } from "../../redux/actions/actions";

type Props = {};

export const Education: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const personId: string = useSelector((state: StoreType) => state.personId);
  const educationData: EducationDataType[] = useSelector(
    (state: StoreType) => state.educationalData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (educationData) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.EDUCATION, personId)
      .then((response) => dispatch(setEducationalData(response.data)))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [personId, educationData, dispatch]);

  type EducationDetailsProps = {
    job: EducationDataType;
  };

  const EducationDetails: React.FC<EducationDetailsProps> = ({ job }) => {
    const { degree, description, startDate, endDate, place } = job;
    return (
      <>
        <p>{degree}</p>
        <p>{description}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{place.name}</p>
      </>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <>
        {educationData && educationData.map((job: EducationDataType, index: number) => (
          <EducationDetails job={job} key={index} />
        ))}
      </>
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Education);
