import { api } from "../axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import styled from "styled-components";
import UserCard from "../components/UserCard.jsx";
import { PageContainer } from "../styles/LoggedInLayoutStyle";
import { saveUsers } from "../store/slices/users";

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

export default function Friends() {
  const token = useSelector((state) => state.user.accessToken);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users?limit=200", {
        // increased limit to fetch more users
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <PageContainer>
          <BackgroundContainer>
            <UserCardContainer>
              {users
                .filter((user) => user.first_name !== "") // filtered for users with a first_name only
                .map((user) => {
                  //console.log("from user map", user);
                  //if (user.first_name !== "")
                  return <UserCard key={user.id} user={user} />;
                })}
            </UserCardContainer>
          </BackgroundContainer>
        </PageContainer>
      </>
    );
  }
}
