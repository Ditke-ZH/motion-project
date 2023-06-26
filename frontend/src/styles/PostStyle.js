import styled from "styled-components";

export const PostContainer = styled.div`
  width: 560px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostDetailContainer = styled.div`
  width: 900px;
  height: 560px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  //padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const PostDetail = styled.div`
  //padding: 25px 25px 10px 25px;
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostDetailContent = styled.div`
  padding: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PostDetailActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 25px;
`;

export const ImageGallery = styled.div`
  width: 560px;
  height: 100%;
  background-color: lightgray;
`;

export const ImageGalleryImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Poster = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PosterInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 14px;

  & p {
    line-height: 1;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  & p.text-lightgray {
    color: black;
    opacity: 0.5;
  }
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const PostText = styled.p`
  padding: 24px 0;
  line-height: 1.625rem;
  color: black;
`;

export const ImageGrid = styled.div`
  display: grid;
  /* grid-template: repeat(1, 1fr) / repeat(1, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.div`
  min-height: 240px;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 4px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ActionButtons = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  list-style: none;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
`;

export const InteractiveActionButton = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 18px;
  cursor: pointer;

  & img {
    mix-blend-mode: normal;
    opacity: ${(props) => (props.liked ? 1 : 0.5)};
  }
`;

export const ActionCounter = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  user-select: none;

  & p {
    color: black;
    opacity: 0.5;
    text-align: right;
    user-select: none;
  }
`;
