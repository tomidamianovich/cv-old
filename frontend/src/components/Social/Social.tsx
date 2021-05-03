import React from "react";
import { SocialDataType } from "../../utils/type";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SocialWrapper = styled.div`
  display: block;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
  svg {
    font-size: 1.5rem;
  }
`;

const Link = styled.a`
  padding-left: 0.4rem;
  display: block;
  color: #262626;
  text-decoration: none;
  font-weight: 200;
  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  socialInfo: SocialDataType | undefined;
};

const getSocialUserId = (path: string, addSlash: boolean) => `${addSlash ? "/" : ""}${path.split("/").pop()}`;

const Item: React.FC<{
  title: string;
  iconColor: string;
  addSlash?: boolean;
  icon: any;
}> = ({ title, icon, iconColor, addSlash = false }) => (
  <ItemWrapper>
    <FontAwesomeIcon icon={icon} color={iconColor} />
    <Link href={title}>{getSocialUserId(title, addSlash)}</Link>
  </ItemWrapper>
);

const Social: React.FC<Props> = ({ socialInfo }) => {
  if (!socialInfo) return null;
  const { instagram, facebook, telephone, mail, linkedIn } = socialInfo;
  return (
    <SocialWrapper>
      <Item
        title={instagram}
        icon={faInstagram}
        iconColor="#262626"
        addSlash={true}
      />
      <Item
        title={facebook}
        icon={faFacebook}
        iconColor="#4267b2"
        addSlash={true}
      />
      <Item title={telephone} icon={faPhone} iconColor="#8bc34ad1" />
      <Item title={mail} icon={faEnvelope} iconColor="#be4436" />
      <Item
        title={linkedIn}
        icon={faLinkedin}
        iconColor="#008599"
        addSlash={true}
      />
    </SocialWrapper>
  );
};

export default Social;
