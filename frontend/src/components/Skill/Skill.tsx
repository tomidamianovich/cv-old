import React, { useEffect, useState } from "react";
import { SkillDataType, StoreType } from "../../utils/type";
import CONSTANTS from "../../utils/constants";
import { handleRequest } from "../../utils/handlers";
import withSectionItemHOC from "../withSectionItemHOC";
import AsyncLoading from "../AsyncLoading";
import { setSkillData } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const ProgressCircle = styled.div`
  align-items:center;
  justify-content:center;
  display:flex;
  .box {
    zoom: .7;
    width: 10rem;
    text-align: center;
    text-transform: uppercase;
    padding: 2rem;
    word-break: break-word;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    flex-direction:column;
    transition: transform .2s;
    .percent {
      width:150px;
      height:150px;
      position:relative;
      svg {
        width:150px;
        height:150px;
        position:relative;
        circle {
          width:150px;
          height:150px;
          fill:none;
          stroke-width:10;
          stroke:#000;
          transform:translate(5px,5px);
          stroke-dasharray:440;
          stroke-dashoffset:440;
          stroke-linecap:round;
          :nth-child(1)
          {
            stroke-dashoffset:0;
            stroke:#f3f3f3;
          }
          :nth-child(2)
          {
            stroke-dashoffset:calc(440 - (440 * ${(props: { value: number }) =>
              props.value}) / 100);
            stroke: #aa8f7c;
          }
        }
      }
      .num {
        top:0;
        left:0;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        color:#111;
        h2 {
          font-size:48px;
          span {
            font-size:24px;
          }
        }
      }
    }
    .text { 
      height: 5rem;
      padding 10px 0 0;
      color:#999;
      font-weight:700;
      letter-spacing:1px;
    }
  }
`;

type Props = {};

export const Skill: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const skillData: SkillDataType[] = useSelector(
    (state: StoreType) => state.skillData
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (skillData && skillData[0].id !== CONSTANTS.PLACEHOLDERS.TEXT) {
      setLoading(false);
      return;
    }
    handleRequest(CONSTANTS.BASE_URL_API_PATHS.SKILL)
      .then((response) => dispatch(setSkillData(response.data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch, skillData]);

  type SkillDetailsProps = {
    skill: SkillDataType;
  };

  const SkillProgress: React.FC<SkillDetailsProps> = ({ skill }) => {
    const { name, percentage } = skill;
    return (
      <ProgressCircle value={percentage}>
        <div className="box">
          <div className="percent">
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className="num">
              <h2>
                {percentage}
                <span>%</span>
              </h2>
            </div>
          </div>
          <h2 className="text">{name}</h2>
        </div>
      </ProgressCircle>
    );
  };

  return (
    <AsyncLoading isLoading={loading} hasError={error}>
      <ItemContainer>
        {skillData &&
          skillData.map((skill: SkillDataType, index: number) => (
            <SkillProgress skill={skill} key={index} />
          ))}
      </ItemContainer>
    </AsyncLoading>
  );
};

export default withSectionItemHOC(Skill);
