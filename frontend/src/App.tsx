import React, { useEffect, useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import ErrorSection from "./components/ErrorSection";
import Section from "./components/Section";
import LanguageSelector from "./components/LanguageSelector";
import { handleRequest } from "./utils/handlers";
import { useDispatch } from "react-redux";
import { setPersonId, setPersonData } from "./redux/actions/actions";
import CONSTANTS from "./utils/constants";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
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

const LanguageSelectorWrapper = styled(Wrapper)`
  width: fit-content;
  display: flex;
  margin-left: auto;
`;

const SectionWrapper = styled(Wrapper)`
  color: #777;
`;

type Props = {};

const AppComponent: React.FC<Props> = () => {
  const [error, setError] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const currentLanguage = i18n.language === "es-ES" ? "es" : "en";

  useEffect(() => {
    handleRequest(
      `${CONSTANTS.BASE_URL_API_PATHS.PERSONAL_DATA_LANGUAGE}${currentLanguage}`
    )
      .then((response: any) => {
        if (!("_id" in response.data)) {
          setError(true);
          return;
        }
        dispatch(setPersonId(response.data._id));
        dispatch(setPersonData(response.data));
      })
      .catch(() => setError(true));
  }, [currentLanguage, dispatch]);

  return (
    <>
      {!error && (
        <AppWrapper>
          <LanguageSelectorWrapper>
            <LanguageSelector />
          </LanguageSelectorWrapper>
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>
          <SectionWrapper>
            <Section />
          </SectionWrapper>
        </AppWrapper>
      )}
      {error && <ErrorSection />}
    </>
  );
};

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AppComponent />
    </Suspense>
  );
}
