import styled from "styled-components";

const AvatarWithImage = styled.div`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  border-radius: ${(props) => `${props.size}px`};
`;

const AvatarWithOutImage = styled.div`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: ${(props) => `${props.size}px`};
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  letter-spacing: 1px;
  font-size: ${(props) => `${props.size / 2.2}px`};
`;

export default function Avatar({ user, size }) {
  if (user && user.avatar) {
    return <AvatarWithImage image={user.avatar} size={size} />;
  } else if (user) {
    return (
      <AvatarWithOutImage size={size}>
        {user?.first_name[0].toUpperCase()}
        {user?.last_name[0].toUpperCase()}
      </AvatarWithOutImage>
    );
  } else {
    return null;
  }
}
