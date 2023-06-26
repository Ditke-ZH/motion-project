import styled from "styled-components";

const NoPostsContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
`;

export default function NoPosts() {
  // some other code here

  return <NoPostsContainer>No posts found</NoPostsContainer>;
}
