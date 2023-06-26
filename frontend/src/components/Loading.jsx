import styled, { keyframes } from "styled-components";

const Loader = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 90vh;
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
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid red;
    border-color: hsla(277, 100%, 70%, 1) transparent hsla(277, 100%, 70%, 1)
      transparent;
    animation: ${spinnerAnimation} 1.2s linear infinite;
  }
`;

export default function Loading() {
  return (
    <Loader>
      <Spinner />
    </Loader>
  );
}
