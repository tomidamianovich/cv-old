import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
  padding: 1.5rem;
  margin: 1rem;
  border: 1px solid #d2ae43;
  background-color: #fff1c6;
  border-radius: 1rem;
  color: black;
  font-weight: 200;
`;

type Props = {
  t: any;
};

const ErrorSection: React.FC<Props> = ({ t }) => {
  return (
    <Wrapper data-testid="error-wrapper">
      <span>{t("error")}</span>
    </Wrapper>
  );
};

export default withTranslation()(ErrorSection);
