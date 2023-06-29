import { useEffect, useState } from "react";
import { api } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import SearchAndFilter from "../components/SearchAndFilter";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import styled from "styled-components";
import { savePosts } from "../store/slices/feed";
import Modal from "../components/Modal";
import WritePostForm from "../components/WritePostForm";
import AddPost from "../components/AddPost";
import NoPosts from "../components/NoPosts";
import { FeedContainer, PostsList, PostsColumn } from "../styles/FeedStyles";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export default function Feed() {
  const { filterParam } = useParams();
  const token = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.details);
  const posts = useSelector((store) => store.feed.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [writeModalVisible, setWriteModalVisible] = useState(false);

  const filterOptions = [
    { key: "likes", label: "Liked" },
    { key: "friends", label: "Friends" },
    { key: "following", label: "Follow" },
  ];

  const filterType = () =>
    filterOptions.map((option) => option.key).includes(filterParam)
      ? filterParam
      : null;

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `social/posts/`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch(savePosts(res.data));
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

  const handleWritePostStart = () => {
    setWriteModalVisible(true);
  };

  const handleWritePostsEnd = () => {
    setWriteModalVisible(false);
  };

  useEffect(() => {
    loadPosts();
  }, [filterParam]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <PageContainer>
        <SearchAndFilter filterOptions={filterOptions} />
        <FeedContainer>
          {posts.length === 0 && <NoPosts />}
          <PostsList>
            <PostsColumn>
              {posts.length > 0 && (
                <AddPost
                  handleWritePostStart={handleWritePostStart}
                  user={user}
                />
              )}
              {posts
                .filter((post, index) => index % 2 === 1)
                .map((post) => (
                  <Post key={post.id} post={post} />
                ))}
            </PostsColumn>
            <PostsColumn>
              {posts
                .filter((post, index) => index % 2 === 0)
                .map((post) => (
                  <Post key={post.id} post={post} />
                ))}
            </PostsColumn>
          </PostsList>
        </FeedContainer>
        {writeModalVisible && (
          <Modal visible={writeModalVisible} onClose={handleWritePostsEnd}>
            <WritePostForm closeModal={handleWritePostsEnd} />
          </Modal>
        )}
      </PageContainer>
    );
  }
}
