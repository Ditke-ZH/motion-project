import Avatar from "./Avatar";
import { timeFromNow } from "../helpers/relativeTime";

import heartImage from "../assets/svgs/heart.svg";
import shareImage from "../assets/svgs/share.svg";

import { api } from "../axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ViewPost from "./ViewPost";
import Modal from "./Modal";
import {
  PostContainer,
  Meta,
  Poster,
  PosterInfo,
  Content,
  PostText,
  ImageGrid,
  Image,
  Actions,
  ActionButtons,
  InteractiveActionButton,
  ActionCounter,
} from "../styles/PostStyle";
import { updateSinglePost } from "../store/slices/feed";
import { StyledNavLink } from "../styles/NavLinks";

export default function Post({ post }) {
  const [currentPost, setCurrentPost] = useState(post);
  const [viewPostModalVisible, setViewPostModalVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    user,
    images,
    content,
    amount_of_likes,
    created,
    logged_in_user_liked,
  } = currentPost;

  const { first_name, last_name } = user;

  const [liked, setLiked] = useState(logged_in_user_liked);

  const token = useSelector((state) => state.user.accessToken);

  const featuredImages = () => {
    let feat = [];
    for (let i = 0; i < Math.min(images.length, 4); i++) {
      feat.push(images[i]);
    }
    return feat;
  };

  const toggleLike = async () => {
    try {
      const res = await api.post(
        `social/posts/toggle-like/${currentPost.id}/`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setLiked(res.data.logged_in_user_liked);
      setCurrentPost(res.data); // Refresh post to have most recent data
      dispatch(updateSinglePost(res.data)); // Refresh store with most recent data
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

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike();
  };

  const handleModalOpen = () => {
    setViewPostModalVisible(true);
  };

  const handleModalClose = () => {
    setViewPostModalVisible(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <PostContainer onClick={handleModalOpen}>
        <Meta>
          <StyledNavLink to={`/profile/public/${user.id}`}>
            <Poster onClick={(e) => stopPropagation(e)}>
              <Avatar user={user} size={40} />

              <PosterInfo>
                <p>
                  {first_name} {last_name}
                </p>
                <p className="text-lightgray">{timeFromNow(created)}</p>
              </PosterInfo>
            </Poster>
          </StyledNavLink>
        </Meta>
        <Content>
          <PostText>{content}</PostText>
          {images ? (
            <ImageGrid>
              {featuredImages().map((image) => (
                <Image key={image.id} image={image.image} />
              ))}
            </ImageGrid>
          ) : null}
        </Content>
        <Actions>
          <ActionButtons>
            <InteractiveActionButton onClick={handleLikeClick} liked={liked}>
              <img src={heartImage} />
              <p>{liked ? "Unlike" : "Like"}</p>
            </InteractiveActionButton>
            <InteractiveActionButton>
              <img src={shareImage} />
              <p>Share</p>
            </InteractiveActionButton>
          </ActionButtons>
          <ActionCounter>
            <p>
              {amount_of_likes} {amount_of_likes === 1 ? "like" : "likes"}
            </p>
          </ActionCounter>
        </Actions>
      </PostContainer>
      {viewPostModalVisible && (
        <Modal visible={viewPostModalVisible} onClose={handleModalClose}>
          <ViewPost
            post={currentPost}
            handleLikeClick={handleLikeClick}
            liked={liked}
          />
        </Modal>
      )}
    </>
  );
}
