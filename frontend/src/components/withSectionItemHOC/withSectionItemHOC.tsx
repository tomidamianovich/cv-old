import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

type WrappedComponentProps = {
  title: string;
  variant?: string;
  icon: any;
};

const Button = styled.button`
  font-size: 1.4rem;
  text-align: center;
  color: #666;
  border: none;
  display: block;
  margin: 1rem;
  text-align: right;
  background-color: white;
  cursor: pointer;
`;

const Wrapper = styled.div`
  color: black;
  display: block;
`;

const TitleWrapper: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
`;

const SectionTitle:any = styled.div`
  background-color: ${(props: {
    variant: string
  }) => props.variant ? props.variant : "lightgray"};
  padding: 0.6rem;
  border-radius: 0.2rem;
  color: white;
  font-weight: 700;
  letter-spacing: 0.9px;
  span {
    margin: 0.5rem;
  }
  svg {
    width: 1rem;
  }
`;

const withSectionItemHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WrappedComponentFormatted: React.FC<WrappedComponentProps> = ({ ...props }: WrappedComponentProps) => {
    const [visible, setVisibility] = useState(false);
    return (
      <Wrapper>
        <TitleWrapper>
          <SectionTitle variant={props.variant}>
            <FontAwesomeIcon icon={props.icon} />
            <span> {props.title} </span>
          </SectionTitle>
          <Button onClick={() => setVisibility(!visible)}>
            <FontAwesomeIcon icon={!visible ? faSortDown : faSortUp } />
          </Button>
        </TitleWrapper>
        {visible && <WrappedComponent {...(props as P)} />}
      </Wrapper>
    );
  }
  return WrappedComponentFormatted
};

export default withSectionItemHOC;
