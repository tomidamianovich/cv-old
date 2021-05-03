import React from "react";
import withSectionItemHOC from "../withSectionItemHOC";
import { StoreType, PersonalDataType } from "../../utils/type";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Item = styled.span`
  width: 100%;
  color: #554949;
  span:first-child {
    font-weight: 400;
    font-size: 1.2rem;
  }
  span:not(:first-child) {
    font-size: 1  rem;
    font-weight: 200;
  }
  @media (min-width:801px) {
    flex: 48%;
    padding: 1rem 0 1rem 2%;
  }
  @media (max-width:801px) {
    padding: 1rem 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

type Props = {};

const Personal: React.FC<Props> = () => {
  const personalData: PersonalDataType = useSelector(
    (state: StoreType) => state.personData
  );

  const PersonalInfo: React.FC<{
    data: PersonalDataType;
  }> = ({ data }) => {
    if (!data) return null;
    const { name, lastname, age, civilStatus, locationName } = data;

    type ItemBodyProps = {
      title: string;
      value: string;
    };

    const ItemWithBody: React.FC<ItemBodyProps> = ({ title, value }) => (
      <Item>
        <span>{title}: </span>
        <span>{value}</span>
      </Item>
    );

    return (
      <ItemContainer>
        <ItemWithBody title="Nombre" value={`${name} ${lastname}`} />
        <ItemWithBody title="Edad" value={`${age} años`} />
        <ItemWithBody title="Estado Civil" value={civilStatus} />
        <ItemWithBody title="Lugar de residencia" value={locationName} />
      </ItemContainer>
    );
  };

  return (
    <PersonalInfo data={personalData} />
  );
};

export default withSectionItemHOC(Personal);
