import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { api } from "../axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";

export const EditProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
`;
export const EditProfileBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  height: 730px;
  width: 80%;
`;
export const UpdateBannerImageDiv = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: end;
  text-align: center;
  background-color: transparent;
`;
export const UpdateBannerImageButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
export const EditPersonalInfoDiv = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid lightgray;
  background-color: white;
`;
export const EditPersonalLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 28%;
  border-right: 1px solid lightgray;
`;
export const EditAvatarImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 50%;
  margin-top: 60px;
`;
export const DeleteSaveDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: end;
  height: 50%;
  margin-bottom: 70px;
`;
export const UpdateImageUnderAvatarButton = styled.button`
  margin: 5px 15px;
  height: 40px;
  width: 158px;
  border-radius: 99px;
  background-color: white;
  border-color: lightgray;
  border-width: thin;
  border-style: groove;
  /* justify-content: center; */
  text-align: center;
  cursor: pointer;
`;
export const DeleteButton = styled.button`
  margin: 5px 15px;
  height: 60px;
  width: 198px;
  border-radius: 99px;
  background-color: white;
  border-color: lightgray;
  border-width: thin;
  border-style: groove;
  /* justify-content: center; */
  text-align: center;
  cursor: pointer;
`;
export const ColoredSaveButton = styled.button`
  margin: 5px 15px;
  height: 60px;
  width: 198px;
  border-radius: 99px;
  border-color: grey;
  border-width: thin;
  border-style: groove;
  background: linear-gradient(132.96deg, #c468ff 3.32%, #6e91f6 100%);
  background-blend-mode: multiply, normal;
  color: white;
  cursor: pointer;
`;
export const EditPersonalRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72%;
  height: 100%;
`;
export const PersonalInfoInputForm = styled.form`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
export const FirstThruAboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;
export const LastThruPasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;
export const EditProfileStyledInput = styled.input`
  border: none;
  width: 98%;
  padding-left: 10px;
  height: 30px;
  border-bottom: 1px solid lightgray;
`;
export const EditInputsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 70%;
  gap: 40px;
`;
const StyledP = styled.p`
  color: rgba(150, 150, 150, 1);
  font-size: 12px;
`;
const NarrowField = styled.div`
  width: 350px;
`;
export const ThingsILikeDiv = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 80px;
  height: 33%;
`;
export const ThingsILikeEditDiv = styled.div`
  margin: 5px 15px;
  height: 35px;
  width: 120px;
  border-radius: 99px;
  background-color: lightgray;
  border-color: lightgray;
  border-width: thin;
  border-style: groove;
  display: flex;
  justify-content: center;
  text-align: center;
`;
const ThingILikeButtonLookingDiv = styled.div`
  display: flex;
  height: 33%;
`;
const InThingILikeButtonLookingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const ThingsILikeDeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-left: 10px;
  font-size: large;
`;
const ThingsILikeP = styled.div``;
const ThingsILikeInputDiv = styled.div`
  width: 70%;
  height: 33%;
`;
const ThingsILikeInput = styled.input`
  border: none;
  border-bottom: 1px solid light gray;
  width: 50%;
`;
const ThingsILikeInputButton = styled.button`
  margin: 5px 15px;
  height: 40px;
  width: 158px;
  border-radius: 99px;
  background-color: white;
  border-color: lightgray;
  border-width: thin;
  border-style: groove;
  /* justify-content: center; */
  text-align: center;
  cursor: pointer;
`;
const LastMinuteDivChangeDiv = styled.div`
  display: flex;
  width: 100%;
`;

export default function EditProfile() {
  const token = useSelector((state) => state.user.accessToken);
  const userDetails = useSelector((state) => state.user.details);
  const [firstName, setFirstName] = useState(userDetails?.first_name);
  const [lastName, setLastName] = useState(userDetails?.last_name);
  const [userName, setUserName] = useState(userDetails?.username);
  const [email, setEmail] = useState(userDetails?.email);
  const [location, setLocation] = useState(userDetails?.location);
  const [aboutMe, setAboutMe] = useState(userDetails?.about_me);
  const [phoneNumber, setPhoneNumber] = useState(userDetails?.phone_number);
  const [thingsILike, setThingsILike] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === ""
    ) {
      return <Error>Fields Cannot Be Blank</Error>;
    } else handlePatch();
  };

  //   useEffect(()=>{
  //     if (userDetails === true) {setLoading(false)
  //     setThingsILike(userDetails.things_user_likes)
  //      } else (setLoading(true))
  //   },[userDetails])

  const handlePatch = async (e) => {
    try {
      const res = await api.patch(
        "users/me/",
        {
          email: email,
          username: userName,
          // password: password,
          first_name: firstName,
          last_name: lastName,
          location: location,
          about_me: aboutMe,
          phone_number: phoneNumber,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setValidationErrors(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setThingsILike(thingsILike.splice(likes, 1));
    // handlePatch()
  };

  console.log(userDetails?.user_profile.liked_things)

  if (loading) {
    return <Loading />;
  } else {
    return (
      <EditProfileDiv>
        <EditProfileBoxDiv>
          <UpdateBannerImageDiv>
            <UpdateBannerImageButton>Update image</UpdateBannerImageButton>
          </UpdateBannerImageDiv>
          <EditPersonalInfoDiv>
            <EditPersonalLeftDiv>
              <EditAvatarImageDiv>
                <div>Avatar</div>
                <UpdateImageUnderAvatarButton>
                  UPDATE IMAGE
                </UpdateImageUnderAvatarButton>
              </EditAvatarImageDiv>
              <DeleteSaveDiv>
                <DeleteButton>DELETE ACCOUNT</DeleteButton>
                <ColoredSaveButton onClick={(e) => handleClick(e)}>
                  SAVE
                </ColoredSaveButton>
              </DeleteSaveDiv>
            </EditPersonalLeftDiv>
            <EditPersonalRightDiv>
              <EditInputsDiv>
                <PersonalInfoInputForm>
                  <FirstThruAboutDiv>
                    <NarrowField>
                      <StyledP>First Name</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.first_name}
                        type="text"
                        value={firstName || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>Email</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.email}
                        type="text"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>Location</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.location}
                        type="text"
                        value={location || ""}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>About Me</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.about_me}
                        type="text"
                        value={aboutMe || ""}
                        onChange={(e) => setAboutMe(e.target.value)}
                      />
                    </NarrowField>
                  </FirstThruAboutDiv>
                  <LastThruPasswordDiv>
                    <NarrowField>
                      <StyledP>Last Name</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.last_name}
                        type="text"
                        value={lastName || ""}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>Username</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.username}
                        type="text"
                        value={userName || ""}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>Phone Number</StyledP>
                      <EditProfileStyledInput
                        placeholder={userDetails?.phone_number}
                        type="text"
                        value={phoneNumber || ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </NarrowField>
                    <NarrowField>
                      <StyledP>Password</StyledP>
                      <EditProfileStyledInput
                        type="password"
                        placeholder="Password"
                      />
                    </NarrowField>
                  </LastThruPasswordDiv>
                </PersonalInfoInputForm>
              </EditInputsDiv>
              <ThingsILikeDiv>
                <ThingsILikeP>
                  <p>Things I Like</p>
                </ThingsILikeP>
                <ThingILikeButtonLookingDiv>
                  {userDetails?.user_profile.liked_things.map((likes) => {
                    return (
                      <ThingsILikeEditDiv key={likes.text}>
                        <p>{likes.text}</p>
                        <ThingsILikeDeleteButton onClick={handleDelete}>
                          X
                        </ThingsILikeDeleteButton>
                      </ThingsILikeEditDiv>
                    );
                  })}
                </ThingILikeButtonLookingDiv>
                <LastMinuteDivChangeDiv>
                  <ThingsILikeInputDiv>
                    <ThingsILikeInput placeholder="Type Something.."></ThingsILikeInput>
                  </ThingsILikeInputDiv>
                  <ThingsILikeInputButton>ADD</ThingsILikeInputButton>
                </LastMinuteDivChangeDiv>
              </ThingsILikeDiv>
            </EditPersonalRightDiv>
          </EditPersonalInfoDiv>
        </EditProfileBoxDiv>
      </EditProfileDiv>
    );
  }
}
