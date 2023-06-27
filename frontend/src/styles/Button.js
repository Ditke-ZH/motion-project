import styled from "styled-components";

export const Button = styled.button`
  // css here
`;

export const CircleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: linear-gradient(32.96deg, #c468ff 3.32%, #6e91f6 100%);
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const CircleButtonGrey = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: none;
  background: lightgray;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoggedOutColoredButton = styled.button`
  margin: 5px 15px;
  height: 60px;
  width: 288px;
  border-radius: 99px;
  border-color: grey;
  border-width: thin;
  border-style: groove;
  background: linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);
  background-blend-mode: multiply, normal;
  color: white;
  cursor: pointer;
`;

export const TransparentButton = styled.button`
  margin: 5px 15px;
  height: 40px;
  width: 150px;
  border-radius: 99px;
  background-color: transparent;
  border-color: grey;
  border-width: thin;
  border-style: groove;
  cursor: pointer;
  text-transform: uppercase;
`;
