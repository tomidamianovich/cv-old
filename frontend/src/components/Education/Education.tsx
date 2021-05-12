import React, { useEffect, useState } from "react";
import { EducationDataType, StoreType } from "../../utils/type";
import { handleRequest, getFormattedDate } from "../../utils/handlers";
import CONSTANTS from "../../utils/constants";
import withSectionItemHOC from "../withSectionItemHOC";
import ErrorSection from "../ErrorSection";
import ListItem from "../ListItem";
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
    if (
      educationData &&
      educationData[0].person_id === personId &&
      educationData[0].degree !== CONSTANTS.PLACEHOLDERS.TEXT
    ) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.EDUCATION, personId)
      .then((response) => dispatch(setEducationalData(response.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [personId, educationData, dispatch]);

  type EducationDetailsProps = {
    job: EducationDataType;
  };

  const EducationDetails: React.FC<EducationDetailsProps> = ({ job }) => {
    const { degree, description, startDate, endDate, place } = job;
    return (
      <ListItem
        imageValue={place.image}
        imageName={place.name}
        loading={loading}
        title={`${degree} (${description}) `}
        subtitle={`${getFormattedDate(startDate)} - ${getFormattedDate(
          endDate
        )}`}
        description={place.name}
      />
    );
  };

  return (
    <>
      {educationData && !error && 
        educationData.map((job: EducationDataType, index: number) => (
          <EducationDetails job={job} key={index} />
        ))}
      {
        error && <ErrorSection />
      }
    </>
  );
};

export default withSectionItemHOC(Education);
