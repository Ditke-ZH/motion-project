import { useState, useEffect } from "react";
import { api } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { savePosts } from "../store/slices/feed";
import { FeedContainer, PostsList, PostsColumn } from "../styles/FeedStyles";
import NoPosts from "../components/NoPosts";
import Post from "../components/Post";
import Loading from "../components/Loading";
import { saveUsers } from "../store/slices/users";
import { PageContainer } from "../styles/LoggedInLayoutStyle";
import UserCard from "../components/UserCard";
import styled from "styled-components";

const BackgroundContainer = styled.div`
  background: white;
`;

const UserCardContainer = styled.div`
  display: grid;
  width: 50%;
  align-items: center;
  justify-content: center;
  grid-template-columns: minmax(auto, 23rem) 1fr 1fr;
  font-weight: 400;
  gap: 1rem 1rem;
  padding: 1rem;
  margin: 0 auto;
`;

export default function UserFollowing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const publicUser = useSelector((state) => state.users.publicUser);
  const token = useSelector((state) => state.user.accessToken);
  const users = useSelector((store) => store.users.users);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`social/followers/following`, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(saveUsers(res.data.results));
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
    loadUsers();
  }, []);

  // some other code here

  if (loading) {
    return <Loading />;
  } else {
    return (
      <FeedContainer>
        <UserCardContainer>
          {users
            .filter((user) => user.first_name !== "") // filtered for users with a first_name only
            .map((user) => {
              //console.log("from user map", user);
              //if (user.first_name !== "")
              return <UserCard key={user.id} user={user} />;
            })}
        </UserCardContainer>
      </FeedContainer>
    );
    // return <FeedContainer>follwing</FeedContainer>;
  }
}
