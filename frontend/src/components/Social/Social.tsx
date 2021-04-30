import React from "react";
import { SocialDataType } from "../../utils/type";

type Props = {
  socialInfo: SocialDataType;
};

const Social: React.FC<Props> = ({ socialInfo }) => {
  const { instagram, facebook, telephone, mail, linkedIn } = socialInfo;
  return (
    <>
      <p>{instagram}</p>
      <p>{facebook}</p>
      <p>{telephone}</p>
      <p>{mail}</p>
      <p>{telephone}</p>
      <p>{linkedIn}</p>
    </>
  );
};

export default Social;
