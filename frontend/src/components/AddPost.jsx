import styled from "styled-components";
import { CircleButton } from "../styles/Button";
import sendButton from "../assets/svgs/send_button.svg";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftPost } from "../store/slices/user";

const AddPostContainer = styled.form`
  width: 560px;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  margin-left: 30px;
  width: 300px;
  font-size: 1rem;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.8);
  border: none;

  &:focus {
    outline: none;
  }
`;

const SendAction = styled.div`
  margin-left: auto;
`;

export default function AddPost({ user, handleWritePostStart }) {
  const dispatch = useDispatch();
  const draftPost = useSelector((state) => state.user.draftPost);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleWritePostStart();
  };

  return (
    <AddPostContainer onSubmit={(e) => handleSubmitForm(e)}>
      <Avatar user={user} size={60} />
      <Input
        type="text"
        placeholder={`What's on your mind, ${user.first_name}?`}
        autoFocus
        value={draftPost}
        onChange={(e) => dispatch(updateDraftPost(e.target.value))}
      />
      <SendAction>
        <CircleButton type="submit">
          <img src={sendButton} />
        </CircleButton>
      </SendAction>
    </AddPostContainer>
  );
}
