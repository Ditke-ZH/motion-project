import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  width: 100%;
  margin: 80px auto 0;
  background-color: #f8f8f9;
  padding-bottom: 40px;
`;

export const Row = styled.div`
  display: flex;
  margin: 0 -15px;
  margin-top: 40px;

  .col {
    flex: 1;
    margin: 0 15px;
  }
`;

//posts, status, friends, shares
export const Card = styled.div`
  padding: 30px;
  border-radius: 4px;
  background-color: white;
`;

//user, user_details, friends_details, status
export const User = styled.div`
  img {
    width: 60px;
    height: 60px;
    display: block;
  }
`;

//username_time
export const UsernameTime = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 14px;
    opacity: 1;
    margin-left: 0px;
  }

  p:last-child {
    opacity: 0.5;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.63;
  color: #000000;
  margin-top: 23px;
`;

export const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;

  .social_media__buttons {
    display: flex;
  }

  .like,
  .share {
    display: flex;

    img {
      height: 19px;
    }

    p {
      margin-left: 16px;
      font-size: 14px;
    }
  }

  .share {
    margin-left: 40px;
  }

  &__likes {
    opacity: 0.5;
  }
`;
