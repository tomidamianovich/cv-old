import React from "react";
import { ListItemDetailsType } from "../../utils/type";
import CONSTANTS from "../../utils/constants";
import withSectionItemHOC from "../withSectionItemHOC";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PhotoWrapper = styled(Wrapper)`
  flex: 20%;
  justify-content: center;
  img {
    width: 150px;
    object-fit: scale-down;
    height: 150px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 6px 2px rgb(0 0 0 / 42%);
  }
`;
  
const InfoWrapper = styled(Wrapper)`
  flex: 80%;
  display: block;
  @media (max-width:801px)  {
    text-align: center;
  }
`;

const InfoValue = styled.p`
  display: block;
  font-size: 1rem;
  color: #554949;
  font-weight: 300;
`;
  
  const InfoTitle = styled(InfoValue)`
  font-size: 1.2rem;
  font-weight: 500;
`;


type Props = ListItemDetailsType

export const ListItem: React.FC<Props> = ({
  imageName,
  imageValue, 
  title, 
  subtitle, 
  description
}) => {

  return (
    <Wrapper>
      <PhotoWrapper>
        <img src={imageValue} alt={imageName} />
      </PhotoWrapper>
      <InfoWrapper>
        <InfoTitle>{title}</InfoTitle>
        <InfoValue>{subtitle}</InfoValue>
        <InfoValue>{description}</InfoValue>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ListItem;
