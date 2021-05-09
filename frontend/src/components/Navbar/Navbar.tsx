import React, { useState } from "react";
import { SocialDataType, StoreType, PersonalDataType } from "../../utils/type";
import { useSelector } from "react-redux";
import AsyncLoading from "../AsyncLoading";
import Skeleton from "../Skeleton";
import Social from "../Social";
import styled from "styled-components";
import CONSTANTS from "../../utils/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: inherit;
`;

const PhotoWrapper = styled(Wrapper)`
  flex: 20%;
  justify-content: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 6px 2px rgb(0 0 0 / 42%);
  }
`;
  
const InfoWrapper = styled(Wrapper)`
  flex: 45%;
  margin: 0 5%;
  display: block;
  color: #554949;
`;

const InfoTitle = styled.h1`
  font-weight: 700;
  text-transform: capitalize;
`;

const InfoSubtitle = styled.h3`
  font-weight: 500;
  text-transform: capitalize;
`;

const InfoBody = styled.h4`
  font-weight: 300;
  text-transform: initial;
`;

const SocialWrapper = styled(Wrapper)`
  flex: 25%;
  flex-wrap: wrap;
  justify-content: center;
`;

type Props = {
};

const Navbar: React.FC<Props> = ({}) => {
  const personId: string = useSelector((state: StoreType) => state.personId );
  const personalData: PersonalDataType = useSelector((state: StoreType) => state.personData);

  const { prefix, name, lastname, description, experience } = personalData
  const isLoadingPersonData = name === CONSTANTS.PLACEHOLDERS.TEXT;
  return (
    <Wrapper>
      <PhotoWrapper>
        <Skeleton isLoading={isLoadingPersonData} >
          <img src={process.env.PUBLIC_URL + '/images/profile-picture.jpeg'} alt="Profile" />
        </Skeleton>
      </PhotoWrapper>
      <InfoWrapper>
        <Skeleton isLoading={isLoadingPersonData} >
          <InfoTitle>{prefix} {lastname} {name}</InfoTitle>
        </Skeleton>
        <Skeleton isLoading={isLoadingPersonData} >
          <InfoSubtitle>{experience.title} - {experience.place}</InfoSubtitle>
        </Skeleton>
        <Skeleton isLoading={isLoadingPersonData} >
          <InfoBody>{description}</InfoBody>
        </Skeleton>
      </InfoWrapper>
      <SocialWrapper>
        <Social />
      </SocialWrapper>
    </Wrapper>
  );
};

export default Navbar;
