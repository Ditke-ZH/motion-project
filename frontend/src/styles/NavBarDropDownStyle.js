import styled from "styled-components";

export const ProfileMenuWrapper = styled.div`
  position: absolute;
  height: auto;
  width: 150px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  right: 6rem;
  top: 4.5rem;
  z-index: 999;
`;

export const ProfileMenuOption = styled.div`
  width: 100%;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;

  &:hover {
    background-color: lightgrey;
  }
`;

export const Icon = styled.img`
  height: 20px;
  margin: 0 10px 0 10px;
`;
