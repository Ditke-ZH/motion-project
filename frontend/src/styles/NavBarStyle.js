import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  display: flex;
  align-items: center;
  min-width: 100%;
  background-color: white;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);
  padding: 0 2.5rem;
  z-index: 10;

  & a:last-child {
    border-bottom: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  border-bottom: 2px solid transparent;

  &:not(.active) {
    filter: grayscale(1);
  }

  & .active div {
    border-bottom: 2px solid #ad73fd;
    filter: grayscale(0);
  }

  img.hover {
    background: linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);
  }

  &.active {
    border-bottom-color: #ad73fd;
  }
`;

export const HomeLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 30px;
  padding: 27px 0 27px 5px;
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.694);
  height: 100%;

  img {
    width: 26px;
    height: 26px;
    margin-right: 18px;
  }
`;

export const PostsLogo = styled(HomeLogo)`
  img {
    display: flex;
    margin-right: 18px;
  }

  div {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.74);
  }
`;

export const FindFriends = styled(HomeLogo)`
  height: 100%;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    margin-right: 18px;

    color: linear-gradient(45deg, #c468ff, #6e91f6);
  }

  div {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.74);
  }
`;

export const Notification = styled.div`
  position: relative;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  margin-right: 50px;
  display: flex;

  img {
    display: flex;
    position: absolute;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    opacity: 35%;
    cursor: pointer;
  }

  .notification-number {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    background: linear-gradient(45deg, #c468ff, #6e91f6);
    width: 21px;
    height: 21px;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-left: 15px;
  }
`;

export const OptionsIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 40px;
  margin-left: 40px;
  width: 40px;
  height: 40px;

  & > img {
    opacity: 0.4;
  }
`;

export const Options = styled.div`
  border: 1px solid green;
`;
