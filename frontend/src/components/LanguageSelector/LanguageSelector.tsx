import React, { Suspense } from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import Spinner from "../Spinner";

const Wrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;

const Selector = styled.span`
  padding: 0.5rem;
  cursor: pointer;
  color: black;
  .selected {
    font-weight: 700;
  }
`;

type Props = {
  t: any;
  i18n: any;
};

export const LanguageSelectorComponent: React.FC<Props> = ({ t, i18n }) => {
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const currentLanguage = i18n.language;
  return (
    <Suspense fallback={<Spinner />}>
      <Wrapper>
        <Selector
          style={{ fontWeight: currentLanguage === "es-ES" ? 700 : 100 }}
          onClick={() => changeLanguage("es-ES")}
        >
          ES
        </Selector>
        <Selector
          style={{ fontWeight: currentLanguage === "en" ? 700 : 100 }}
          onClick={() => changeLanguage("en")}
        >
          EN
        </Selector>
      </Wrapper>
    </Suspense>
  );
};

const LanguageSelectorWithI18n = withTranslation()(LanguageSelectorComponent);

export default function LanguageSelector() {
  return (
    <Suspense fallback={<Spinner />}>
      <LanguageSelectorWithI18n />
    </Suspense>
  );
}
