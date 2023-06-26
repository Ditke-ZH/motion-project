import styled, { keyframes } from "styled-components";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spinnerAnimation = keyframes`  
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;

  &:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    margin: 2px;
    border-radius: 50%;
    border: 3px solid red;
    border-color: hsla(277, 20%, 70%, 1) transparent hsla(277, 20%, 70%, 1)
      transparent;
    animation: ${spinnerAnimation} 1.2s linear infinite;
  }
`;

export default function LoadingSmall() {
  return (
    <Loader>
      <Spinner />
    </Loader>
  );
}
