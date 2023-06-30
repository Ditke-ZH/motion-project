import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { TransparentButton } from "../styles/Button";
import { GrayPill } from "../styles/Pills";

export const AboutMeDiv = styled.div`
  display: flex;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: white;
  height: 400px;
  width: 100%;
`;
export const AvatarNameLocationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 27%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  & h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #000000;
  }

  & h4 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
`;

export const AboutMeRightSideDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 73%;
  height: 100%;

  font-size: 1rem;

  & span {
    font-size: 0.8rem;
    display: block;
  }
`;

export const AboutBigDiv = styled.div`
  display: flex;
  height: 264px;
  padding: 40px;
`;
export const AboutEmailPhoneDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const AboutDiv = styled.p`
  overflow: scroll;
  width: 100%;
  padding-right: 20px;
`;
export const EmailPhoneDiv = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  width: 100%;
`;
export const ThingsILikeDiv = styled.div`
  width: 40%;
`;
export const ProfileTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 135px;
  width: 100%;
  gap: 10px;
  justify-items: center;
  align-content: stretch;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
export const ProfileTabsButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ProfileTabsButtonWithLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: inherit;
  text-decoration: none;

  &.active {
    border-bottom: 3px solid #ad73fd;
  }
`;

export const StatsNumber = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

export const StatsLabel = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;

export default function ProfileOverview({ user, publicMode }) {
  const {
    id,
    first_name,
    last_name,
    location,
    email,
    user_profile,
    amount_of_posts,
    amount_of_likes,
    amount_of_friends,
    amount_of_followers,
    amount_of_following,
  } = user;

  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  const handleFollowClick = () => {
    console.log("Should add follow");
  };
  const handleAddFriendClick = () => {
    console.log("Should add friend request");
  };

  return (
    <>
      <AboutMeDiv>
        <AvatarNameLocationDiv>
          <Avatar user={user} size={80} />
          <h3>
            {first_name} {last_name}
          </h3>
          <h4>{location}</h4>
          {publicMode && (
            <>
              <TransparentButton onClick={handleFollowClick}>
                Follow
              </TransparentButton>
              <TransparentButton onClick={handleAddFriendClick}>
                Add Friend
              </TransparentButton>
            </>
          )}
          {!publicMode && (
            <TransparentButton onClick={handleEditProfileClick}>
              Edit profile
            </TransparentButton>
          )}
        </AvatarNameLocationDiv>
        <AboutMeRightSideDiv>
          <AboutBigDiv>
            <AboutEmailPhoneDiv>
              <AboutDiv>
                <span>About</span>
                {user_profile?.about}
              </AboutDiv>
              <EmailPhoneDiv>
                <p>
                  <span>Email</span>
                  {email}
                </p>
                <p>
                  <span>Phone Number</span>
                  {user_profile?.phone_no}
                </p>
              </EmailPhoneDiv>
            </AboutEmailPhoneDiv>
            <ThingsILikeDiv>
              <span>Things I Like</span>
              <ul>
                {/* <li>{things_user_likes}</li> */}
                {user_profile?.liked_things.map((likes) => {
                  return <GrayPill key={likes.text}>{likes.text}</GrayPill>;
                })}
              </ul>
            </ThingsILikeDiv>
          </AboutBigDiv>
          <ProfileTabs>
            <ProfileTabsButtonWithLink to={`/profile/public/${id}/posts`}>
              <StatsNumber>{amount_of_posts ? amount_of_posts : 0}</StatsNumber>
              <StatsLabel>Posts</StatsLabel>
            </ProfileTabsButtonWithLink>
            <ProfileTabsButton>
              <StatsNumber>{amount_of_likes ? amount_of_likes : 0}</StatsNumber>
              <StatsLabel>Likes</StatsLabel>
            </ProfileTabsButton>
            <ProfileTabsButtonWithLink to={`/profile/public/${id}/friends`}>
              <StatsNumber>
                {amount_of_friends ? amount_of_friends : 0}
              </StatsNumber>
              <StatsLabel>Friends</StatsLabel>
            </ProfileTabsButtonWithLink>
            <ProfileTabsButtonWithLink to={`/profile/public/${id}/followers`}>
              <StatsNumber>
                {amount_of_followers ? amount_of_followers : 0}
              </StatsNumber>
              <StatsLabel>Followers</StatsLabel>
            </ProfileTabsButtonWithLink>
            <ProfileTabsButtonWithLink to={`/profile/public/${id}/following`}>
              <StatsNumber>
                {amount_of_following ? amount_of_following : 0}
              </StatsNumber>
              <StatsLabel>Following</StatsLabel>
            </ProfileTabsButtonWithLink>
          </ProfileTabs>
        </AboutMeRightSideDiv>
      </AboutMeDiv>
    </>
  );
}
