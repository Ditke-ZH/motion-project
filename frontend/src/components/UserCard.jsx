import styled from "styled-components";
import Avatar from "./Avatar";
import { api } from "../axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSingleUser } from "../store/slices/users";
import { StyledNavLink } from "../styles/NavLinks";
import { addFriendRequest } from "../store/slices/user";

const UserCardContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  background: white;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: center;
  align-content: flex-end;
  padding: 2rem;
  height: 489px;
  width: 362px;
  gap: 1rem;
  padding: 1rem;

  img {
    border-radius: 50%;
  }
`;

const NamingContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 0.25rem 1rem;
  gap: 0.5rem;
  font-size: 22px;
`;

const LocationContainer = styled.div`
  display: flex;
  padding: 0 1rem 1rem 1rem;
  gap: 0.2rem;
  font-size: 14px;
  color: lightgray;
`;

const SocialActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    width: 130px;
    height: 40px;
    font-size: 10px;
    font-weight: bold;
    border: 1px rgb(0, 0, 0, 0.2) solid;
    border-radius: 3rem;
    background-color: white;
    color: black;
    letter-spacing: 1px;
    text-align: center;
    cursor: pointer;
    transition: 0.5s;

    &:first-child {
      background: ${(props) =>
        props.following
          ? "linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);"
          : "white"};
      color: ${(props) => (props.following ? "white" : "black")};
    }

    &:last-child {
      background: ${(props) =>
        props.sentRequest
          ? "linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);"
          : "white"};
      color: ${(props) => (props.sentRequest ? "white" : "black")};
    }

    &:hover {
      font-size: 11px;
      transform: translateY(-1px);
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
  }
`;

const DescriptionContainer = styled.p`
  width: 65%;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  span {
    flex-grow: 1;
    width: 30%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0;
    margin: 5px 3px;
    border: none;
    border-radius: 3rem;
    background: #f2f2f2;
  }
`;

export default function UserCard({ user }) {
  const {
    first_name,
    last_name,
    location,
    about_me,
    things_user_likes,
    id,
    logged_in_user_is_following,
    logged_in_user_sent_fr,
  } = user;
  const defaultDescription =
    "Lorem ipsum dolor sit amet, vim ut quas volumus probatus, has tantas laudem iracundia et, ad per utamur ceteros apeirian";

  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  const handleFollowToggle = async () => {
    try {
      const res = await api.post(
        `social/followers/toggle-follow/${id}/`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch(updateSingleUser(res.data));
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

  const handleFriendRequest = async () => {
    try {
      const res = await api.post(
        `social/friends/request/${id}/`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch(addFriendRequest(res.data));
      dispatch(updateSingleUser(res.data.receiver));
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error sending friend request:", error.message);
      }
    }
  };

  return (
    <>
      <UserCardContainer>
        <StyledNavLink to={`/profile/public/${user.id}/posts`}>
          <Avatar user={user} size={60} />
        </StyledNavLink>
        <NamingContainer>
          <span>{first_name}</span>
          <span>{last_name}</span>
        </NamingContainer>
        <LocationContainer>
          <span>{location === "" ? "Location, City" : location}</span>
        </LocationContainer>
        <SocialActionsContainer
          following={logged_in_user_is_following}
          sentRequest={logged_in_user_sent_fr}
        >
          <button onClick={handleFollowToggle}>
            {logged_in_user_is_following ? "FOLLOWING" : "FOLLOW"}
          </button>
          <button onClick={handleFriendRequest}>
            {logged_in_user_sent_fr ? "REQUEST SENT" : "ADD FRIEND"}
          </button>
        </SocialActionsContainer>
        <DescriptionContainer>
          {about_me === "" ? defaultDescription : about_me}
        </DescriptionContainer>
        <LabelContainer>
          {things_user_likes.length > 0
            ? things_user_likes.map((label) => {
                return <span key={label}> {label}</span>;
              })
            : ["Swimming", "Food", "Cooking", "Travel", "Reading"].map(
                (labelFake) => {
                  return <span key={labelFake}> {labelFake}</span>;
                }
              )}
        </LabelContainer>
      </UserCardContainer>
    </>
  );
}
