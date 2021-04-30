import React, { useEffect, useState } from "react";
import { handleRequest } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import CONSTANTS from "../../utils/constants";
import { StoreType, PersonalDataType } from "../../utils/type";
import AsyncLoading from "../AsyncLoading";
import { setPersonalData } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

type Props = {};

const Personal: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const personId: string = useSelector((state: StoreType) => state.personId);
  const personalData: PersonalDataType = useSelector(
    (state: StoreType) => state.personalData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (personalData) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.PERSONAL_DATA, personId)
      .then((response) => dispatch(setPersonalData(response.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [personId, dispatch, personalData]);

  const PersonalInfo: React.FC<{
    data: PersonalDataType | undefined;
  }> = ({ data }) => {
    if (!data) return null;
    const { name, lastname, age, civilStatus, profilePhoto, location } = data;
    return (
      <>
        <p> {name} </p>
        <p> {lastname} </p>
        <p> {age} </p>
        <p> {civilStatus} </p>
        <p> {profilePhoto} </p>
        <p> {location.name} </p>
      </>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <PersonalInfo data={personalData} />
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Personal);
