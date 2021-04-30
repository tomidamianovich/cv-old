import React, { useEffect, useState } from "react";
import { SkillDataType, StoreType } from "../../utils/type";
import CONSTANTS from "../../utils/constants";
import { handleRequest } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import AsyncLoading from "../AsyncLoading";
import { setSkillData } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

type Props = {};

export const Skill: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const personId: string = useSelector((state: StoreType) => state.personId);
  const skillData: SkillDataType[] = useSelector(
    (state: StoreType) => state.skillData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (skillData) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.SKILL, personId)
      .then((response) => dispatch(setSkillData(response.data)))
      .catch(() => setError(false))
      .finally(() => setLoading(false));
  }, [personId, dispatch, skillData]);

  type SkillDetailsProps = {
    skill: SkillDataType;
  };

  const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    const { name, percentage } = skill;
    return (
      <>
        <p>{name}</p>
        <p>{percentage}</p>
      </>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <>
        {skillData && skillData.map((skill: SkillDataType, index: number) => (
          <SkillDetails skill={skill} key={index} />
        ))}
      </>
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Skill);
