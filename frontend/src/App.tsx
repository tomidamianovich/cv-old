import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import { handleRequest } from "./utils/handlers";
import { useDispatch } from "react-redux";
import { setPersonId, setPersonData } from "./redux/actions/actions";
import AsyncLoading from "./components/AsyncLoading";
import CONSTANTS from "./utils/constants";
import styled from "styled-components";

type Props = {};

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
`;

const Wrapper = styled.section`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgb(58 56 56 / 43%);
`;

const NavbarWrapper = styled(Wrapper)`
  color: #999;
`;

const SectionWrapper = styled(Wrapper)`
  color: #777;
`;

const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.PERSONAL_DATA)
      .then((response: any) => {
        if (!("_id" in response.data)) {
          setError(true)
          return
        }
        dispatch(setPersonId(response.data._id))
        dispatch(setPersonData(response.data))
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <AppWrapper>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <SectionWrapper>
          <Section />
        </SectionWrapper>
      </AppWrapper>
    </AsyncLoading>
  );
};

export default App;
