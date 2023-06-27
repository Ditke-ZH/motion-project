import { useDispatch, useSelector } from "react-redux";
import ProfileOverview from "../components/ProfileOverview";
import ProfilePosts from "../components/ProfilePosts";
import { addPublicUser } from "../store/slices/users";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { api } from "../axios";
import { ProfilePage, ProfileContent } from "../styles/ProfileStyles";
import ProfileHeader from "../components/ProfileHeader";
import { Outlet, useParams } from "react-router-dom";

export default function PublicProfile() {
  const { userId } = useParams();
  const token = useSelector((state) => state.user.accessToken);
  const publicUser = useSelector((state) => state.users.publicUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadPublicUser = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(addPublicUser(res.data));
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
    loadPublicUser();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ProfilePage>
        <ProfileHeader />
        <ProfileContent>
          <ProfileOverview user={publicUser} publicMode={true} />
          <Outlet />
        </ProfileContent>
      </ProfilePage>
    );
  }
}
