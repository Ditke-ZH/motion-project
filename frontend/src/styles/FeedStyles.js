import styled from "styled-components";

export const FeedContainer = styled.div`
  max-width: 1140px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const PostsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 40px;
`;

export const PostsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
