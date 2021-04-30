import React, { useEffect, useState } from "react";
import { handleRequest } from "../../utils/handlers";
import { SocialDataType, StoreType } from "../../utils/type";
import { useSelector } from "react-redux";
import AsyncLoading from "../AsyncLoading";
import CONSTANTS from "../../utils/constants";
import Social from "../Social";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const personId: string = useSelector((state: StoreType) => state.personId);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [socialData, setSocialData] = useState<SocialDataType>();

  useEffect(() => {
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.SOCIAL, personId)
      .then((response) => setSocialData(response.data))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [personId]);

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      {socialData ? <Social socialInfo={socialData} /> : <></>}
    </AsyncLoading>
  );
};

export default Navbar;
