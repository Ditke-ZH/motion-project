import styled from "styled-components";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { CircleButton } from "../styles/Button";
import sendButton from "../assets/svgs/send_button.svg";
import uploadImage from "../assets/svgs/uploadImage.svg";
import addLink from "../assets/svgs/addLink.svg";
import { useState } from "react";
import { addSinglePost } from "../store/slices/feed";
import { updateDraftPost } from "../store/slices/user";
import { api } from "../axios";
import { useRef, useEffect } from "react";

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 560px;
  height: 406px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 40px 30px 30px 25px;
`;

const ModalAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: 23px;
`;

const ModalWrite = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const TextArea = styled.textarea`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 26px;
  width: 410px;
  height: 120px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ModalActions = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;

const MediaActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 25px;
`;

const MediaActionItem = styled.div`
  & img {
    opacity: 0.3;
    cursor: pointer;
  }
  & img:hover {
    opacity: 0.5;
  }
`;
const SendAction = styled.div``;

export default function WritePostForm({ closeModal }) {
  const user = useSelector((state) => state.user.details);
  const token = useSelector((state) => state.user.accessToken);
  const [content, setContent] = useState(null);
  const dispatch = useDispatch();
  const draftPost = useSelector((state) => state.user.draftPost);

  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.selectionStart = textarea.value.length;
      textarea.selectionEnd = textarea.value.length;
      textarea.focus();
    }
  }, []);

  const createPost = async () => {
    try {
      const res = await api.post(
        "social/posts/",
        { user: user, content: draftPost },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch(updateDraftPost(""));
      dispatch(addSinglePost(res.data));
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

  const handleCreatePostClick = (e) => {
    e.preventDefault();
    createPost();
    closeModal();
  };

  return (
    <ModalForm onSubmit={(e) => handleCreatePostClick(e)}>
      <ModalContent>
        <ModalAvatar>
          <Avatar user={user} size={60} />
        </ModalAvatar>
        <ModalWrite>
          <TextArea
            placeholder="Start typing"
            onChange={(e) => dispatch(updateDraftPost(e.target.value))}
            value={draftPost}
            ref={textareaRef}
          ></TextArea>
        </ModalWrite>
      </ModalContent>
      <ModalActions>
        <MediaActions>
          <MediaActionItem>
            <img src={uploadImage} />
          </MediaActionItem>
          <MediaActionItem>
            <img src={addLink} />
          </MediaActionItem>
        </MediaActions>
        <SendAction>
          <CircleButton type="submit">
            <img src={sendButton} />
          </CircleButton>
        </SendAction>
      </ModalActions>
    </ModalForm>
  );
}
