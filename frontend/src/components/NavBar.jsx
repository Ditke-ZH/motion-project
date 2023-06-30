import { useDispatch, useSelector } from "react-redux";
import { loadFriendRequests, logout } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import NavBarDropDown from "./NavBarDropDown";
import { NotificationMenu } from "./NotificationMenu";

import {
  HeaderNav,
  StyledNavLink,
  HomeLogo,
  PostsLogo,
  FindFriends,
  Notification,
  OptionsIcon,
} from "../styles/NavBarStyle.js";
import Avatar from "./Avatar";
import homepageLogo from "../assets/images/logo.png";
import postslogo from "../assets/images/posts_logo.png";
import findFriendsLogo from "../assets/svgs/icon-friends-colored.svg";
import notificationLogo from "../assets/svgs/notification_bell.svg";
import optionsIcon from "../assets/svgs/options_icon.svg";
import LoadingSmall from "./LoadingSmall";
import { useEffect, useState } from "react";
import { api } from "../axios";

export default function NavBar() {
  const userDetails = useSelector((state) => state.user.details);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.user.requests);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/signin");
  };

  const [showNotification, setShowNotification] = useState(); // toggling notification menu
  const [openDropDown, setOpenDropDown] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get(`social/friends/requests/`, {
        headers: { Authorization: "Bearer " + token },
      });

      const pendingRequests = res.data.filter(
        (request) => request.status === "P"
      );
      dispatch(loadFriendRequests(pendingRequests));
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <HeaderNav>
      <StyledNavLink to="/">
        <HomeLogo>
          <img src={homepageLogo} alt="Home page icon" />
          <div>Motion</div>
        </HomeLogo>
      </StyledNavLink>
      <StyledNavLink to="/feed">
        <PostsLogo>
          <img src={postslogo} alt="Posts icon" />
          <div>Posts</div>
        </PostsLogo>
      </StyledNavLink>
      <StyledNavLink to="/friends">
        <FindFriends>
          <img src={findFriendsLogo} alt="Find friends icon" />
          <div>Find Friends</div>
        </FindFriends>
      </StyledNavLink>

      <Notification onClick={() => setShowNotification(!showNotification)}>
        <img src={notificationLogo} alt="Notifications icon" />
        {showNotification && <NotificationMenu requests={requests} />}
        {loading ? (
          <LoadingSmall />
        ) : (
          <div className="notification-number">{requests.length}</div>
        )}
      </Notification>

      <StyledNavLink to="/profile">
        <Avatar user={userDetails} size={40} />
      </StyledNavLink>
      <OptionsIcon onClick={() => setOpenDropDown(!openDropDown)}>
        <img
          src={optionsIcon}
          alt="Options Icon"
          onClick={() => setOpenDropDown((prev) => !prev)}
        />

        {openDropDown && <NavBarDropDown />}

        {/* <Options>
          <div>Profile {userDetails?.first_name}</div>
          <button onClick={handleLogoutClick}>Log Out</button>
        </Options> */}
      </OptionsIcon>
    </HeaderNav>
  );
}
