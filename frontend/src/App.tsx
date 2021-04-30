import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import { handleRequest } from "./utils/handlers";
import { useDispatch } from "react-redux";
import { setPersonId } from "./redux/actions/actions";
import AsyncLoading from "./components/AsyncLoading";
import CONSTANTS from "./utils/constants";

type Props = {};

const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.PERSONAL_DATA)
      .then((response: any) => dispatch(setPersonId(response.data._id)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <>
        <Navbar />
        <Section />
      </>
    </AsyncLoading>
  );
};

export default App;
