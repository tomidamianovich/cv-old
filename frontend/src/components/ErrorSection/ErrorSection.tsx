import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

type Props = {}

const Navbar: React.FC<Props> = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <Wrapper>
      <span>
        {currentLanguage === "es-ES"
          ? "Un error ocurrio al intentar obtener esta información."
          : "An error occurred while trying to retrieve the requested data."}
      </span>
      <span></span>
    </Wrapper>
  );
};

export default Navbar;
