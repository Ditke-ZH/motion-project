import {
  ProfileMenuWrapper,
  ProfileMenuOption,
  Icon,
} from "../styles/NavBarDropDownStyle.js";
import profile from "../assets/svgs/avatar.svg";
import logoutIcon from "../assets/svgs/icon-logout.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/user";

const NavBarDropDown = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <ProfileMenuWrapper>
      <ProfileMenuOption onClick={() => navigate("/profile")}>
        <Icon src={profile} />
        My Profile
      </ProfileMenuOption>
      <ProfileMenuOption onClick={handleLogoutClick}>
        <Icon src={logoutIcon} />
        Log out
      </ProfileMenuOption>
    </ProfileMenuWrapper>
  );
};

export default NavBarDropDown;
