import React from "react";
import withSectionItemHOC from "../withSectionItemHOC";
import { StoreType, PersonalDataType } from "../../utils/type";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

const Item = styled.span`
  width: 100%;
  color: #554949;
  span:first-child {
    font-weight: 400;
    font-size: 1.2rem;
  }
  span:not(:first-child) {
    font-size: 1 rem;
    font-weight: 200;
  }
  @media (min-width: 801px) {
    flex: 48%;
    padding: 1rem 0 1rem 2%;
  }
  @media (max-width: 801px) {
    padding: 1rem 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

type Props = {
  t: any;
};

export const Personal: React.FC<Props> = ({ t }) => {
  const personalData: PersonalDataType = useSelector(
    (state: StoreType) => state.personData
  );

  const PersonalInfo: React.FC<{
    data: PersonalDataType;
    t: any;
  }> = ({ data }) => {
    if (!data) return null;
    const { name, lastname, age, civilStatus, locationName } = data;

    type ItemBodyProps = {
      title: string;
      value: string;
    };

    const ItemWithBody: React.FC<ItemBodyProps> = ({ title, value }) => (
      <Item data-testid={"personal-data-value"}>
        <span>{title}: </span>
        <span>{value}</span>
      </Item>
    );

    return (
      <ItemContainer data-testid="personal-data-container">
        <ItemWithBody
          title={t("sections.personalData.data.name")}
          value={`${name} ${lastname}`}
        />
        <ItemWithBody
          title={t("sections.personalData.data.age")}
          value={`${age} años`}
        />
        <ItemWithBody
          title={t("sections.personalData.data.civilStatus")}
          value={civilStatus}
        />
        <ItemWithBody
          title={t("sections.personalData.data.location")}
          value={locationName}
        />
      </ItemContainer>
    );
  };

  return <PersonalInfo data={personalData} t={t} />;
};

export default withTranslation()(withSectionItemHOC(Personal));
