import React, { useState } from "react";
import { ListItemDetailsType } from "../../utils/type";
import styled from "styled-components";
import Skeleton from "../Skeleton";

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
  div .image-container{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 6px 2px rgb(0 0 0 / 42%);
    img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      object-fit: scale-down;
    }
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
  loading,
  description
}) => {
  const [showImage, setShowImage] = useState(false)
  return (
    <Wrapper>
      <PhotoWrapper>
        <Skeleton isLoading={loading}>
          <div className="image-container">
            <img
              style={!showImage ? { visibility: 'hidden' } : {}}
              src={process.env.PUBLIC_URL + '/images/places/' + imageValue } 
              alt={imageName}
              onLoad={() => setShowImage(true)}
              /> 
          </div>
        </Skeleton>
      </PhotoWrapper>
      <InfoWrapper>
        <Skeleton isLoading={loading}>
          <InfoTitle>{title}</InfoTitle>
        </Skeleton>
        <Skeleton isLoading={loading}>
          <InfoValue>{subtitle}</InfoValue>
        </Skeleton>
        <Skeleton isLoading={loading}>
          <InfoValue>{description}</InfoValue>
        </Skeleton>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ListItem;
