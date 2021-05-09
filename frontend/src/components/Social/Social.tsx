import React, { useEffect, useState } from "react";
import { StoreType, SocialDataType } from "../../utils/type";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import CONSTANTS from "../../utils/constants";
import { handleRequest } from "../../utils/handlers";
import Skeleton from "../Skeleton";
import { setSocialData } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

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

type Props = {};

const getSocialUserId = (path: string, addSlash: boolean) =>
  `${addSlash ? "/" : ""}${path.split("/").pop()}`;

const Item: React.FC<{
  title: string;
  iconColor: string;
  addSlash?: boolean;
  loading?: boolean;
  icon: any;
}> = ({ title, icon, iconColor, addSlash = false, loading }) => (
  <Skeleton isLoading={loading}>
    <ItemWrapper>
      <FontAwesomeIcon icon={icon} color={iconColor} />
      <Link href={title}>{getSocialUserId(title, addSlash)}</Link>
    </ItemWrapper>
  </Skeleton>
);

const Social: React.FC<Props> = ({}) => {
  const personId: string = useSelector((state: StoreType) => state.personId);
  const socialData: SocialDataType = useSelector((state: StoreType) => state.socialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    personId !== CONSTANTS.PLACEHOLDERS.TEXT && handleRequest(CONSTANTS.BASE_URL_API_PATHS.SOCIAL, personId)
      .then((response) => dispatch(setSocialData(response.data)))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [personId]);

  const { instagram, facebook, telephone, mail, linkedIn } = socialData;
  return (
    <SocialWrapper>
      <Item
        title={instagram}
        icon={faInstagram}
        iconColor="#262626"
        addSlash={true}
        loading={loading}
      />
      <Item
        title={facebook}
        icon={faFacebook}
        iconColor="#4267b2"
        addSlash={true}
        loading={loading}
      />
      <Item
        title={telephone}
        icon={faPhone}
        iconColor="#8bc34ad1"
        loading={loading}
      />
      <Item
        title={mail}
        icon={faEnvelope}
        iconColor="#be4436"
        loading={loading}
      />
      <Item
        title={linkedIn}
        icon={faLinkedin}
        iconColor="#008599"
        addSlash={true}
        loading={loading}
      />
    </SocialWrapper>
  );
};

export default Social;
