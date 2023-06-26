import {
  PostContainer,
  Meta,
  Poster,
  PosterInfo,
  Content,
  PostText,
  ImageGalleryImage,
  ImageGallery,
  Actions,
  ActionButtons,
  InteractiveActionButton,
  ActionCounter,
  PostDetailContainer,
  PostDetail,
  PostDetailActions,
  PostDetailContent,
} from "../styles/PostStyle";
import Avatar from "./Avatar";
import { timeFromNow } from "../helpers/relativeTime";

import heartImage from "../assets/svgs/heart.svg";
import shareImage from "../assets/svgs/share.svg";

export default function ViewPost({ post, handleLikeClick, liked }) {
  const { user, images, content, amount_of_likes, created } = post;

  const { first_name, last_name } = user;

  return (
    <>
      <PostDetailContainer>
        <ImageGallery>
          {images.length > 0 ? (
            <ImageGalleryImage key={images.id} image={images[0].image} />
          ) : null}
        </ImageGallery>
        <PostDetail>
          <PostDetailContent>
            <Meta>
              <Poster>
                <Avatar user={user} size={40} />

                <PosterInfo>
                  <p>
                    {first_name} {last_name}
                  </p>
                  <p className="text-lightgray">{timeFromNow(created)}</p>
                </PosterInfo>
              </Poster>
            </Meta>
            <Content>
              <PostText>{content}</PostText>
            </Content>
            <ActionCounter>
              <p>
                {amount_of_likes} {amount_of_likes === 1 ? "like" : "likes"}
              </p>
            </ActionCounter>
          </PostDetailContent>
          <PostDetailActions>
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
          </PostDetailActions>
        </PostDetail>
      </PostDetailContainer>
    </>
  );
}
