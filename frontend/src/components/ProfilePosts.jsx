import { api } from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { savePosts } from "../store/slices/feed";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Post from "./Post";
import { FeedContainer, PostsList, PostsColumn } from "../styles/FeedStyles";

export default function ProfilePosts({ user }) {
  const token = useSelector((state) => state.user.accessToken);
  const posts = useSelector((store) => store.feed.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`social/posts/user/${user.id}/`, {
        headers: { Authorization: "Bearer " + token },
      });
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

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <FeedContainer>
        <PostsList>
          <PostsColumn>
            {posts
              .filter((post, index) => index % 2 === 0)
              .map((post) => (
                <Post key={post.id} post={post} />
              ))}
          </PostsColumn>
          <PostsColumn>
            {posts
              .filter((post, index) => index % 2 === 1)
              .map((post) => (
                <Post key={post.id} post={post} />
              ))}
          </PostsColumn>
        </PostsList>
      </FeedContainer>
    );
  }
}
