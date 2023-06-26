import { useSelector } from "react-redux";
import ProfileOverview from "../components/ProfileOverview";
import ProfilePosts from "../components/ProfilePosts";
import ProfileHeader from "../components/ProfileHeader";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { ProfileContent, ProfilePage } from "../styles/ProfileStyles";

export default function Profile() {
  const userDetails = useSelector((state) => state.user.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDetails === null ? setLoading(true) : setLoading(false);
  }, [userDetails]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ProfilePage>
        <ProfileHeader />
        <ProfileContent>
          <ProfileOverview user={userDetails} publicMode={false} />
          {userDetails ? <ProfilePosts user={userDetails} /> : ""}
        </ProfileContent>
      </ProfilePage>
    );
  }
}
