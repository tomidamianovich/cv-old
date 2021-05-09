import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

type SpinnerProps = {
  width: string ;
  height: string;
}

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 10px solid #e6e6e6;
  border-right: 10px solid #e6e6e6;
  border-bottom: 10px solid #e6e6e6;
  border-left: 10px solid #a79292;
  background: transparent;
  margin: auto;
  display: block;
  border-radius: 50%;
  width: ${(props: SpinnerProps) => props.width ? props.width : '20px'};
  height: ${(props: SpinnerProps) => props.height ? props.height : '20px'};
`;

export default Spinner;