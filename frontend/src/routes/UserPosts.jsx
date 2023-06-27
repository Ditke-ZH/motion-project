import { useState, useEffect } from "react";
import { api } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { savePosts } from "../store/slices/feed";
import { FeedContainer, PostsList, PostsColumn } from "../styles/FeedStyles";
import NoPosts from "../components/NoPosts";
import Post from "../components/Post";
import Loading from "../components/Loading";

export default function UserPosts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const publicUser = useSelector((state) => state.users.publicUser);
  const token = useSelector((state) => state.user.accessToken);
  const posts = useSelector((store) => store.feed.posts);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`social/posts/user/${publicUser.id}?limit=50`, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(savePosts(res.data.results));
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

  // some other code here

  if (loading) {
    return <Loading />;
  } else {
    return (
      <FeedContainer>
        {posts.length === 0 && <NoPosts />}
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
