import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { api } from "../axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadFriendRequests, removeFriendRequest } from "../store/slices/user";
import Avatar from "./Avatar";
import { CircleButton, CircleButtonGrey } from "../styles/Button";
import checkIcon from "../assets/svgs/checkmark_simple.svg";
import closeIcon from "../assets/svgs/close.svg";
import pendingIcon from "../assets/svgs/pending.svg";
import LoadingSmall from "./LoadingSmall";

const NotificationContainer = styled.div`
  padding: 1rem;
  position: absolute;
  height: auto;
  width: 362px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  right: -1rem;
  top: 2rem;
  z-index: 999;

  span {
    font-size: 16px;
    margin: 0 !important;
  }
`;

const ReceivedRequestContainer = styled.div`
  width: 100%;
`;

const SentRequestContainer = styled.div`
  width: 100%;
`;

const RequestItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

const RequestItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const RequesterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: left;
  padding-left: 16px;

  & span {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  & span:last-child {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const RequestItemRight = styled.div`
  display: flex;
  gap: 8px;
`;

export const NotificationMenu = ({ requests }) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.details);

  const answerRequest = async (requestId, newStatus) => {
    setLoading(true);
    try {
      const res = await api.patch(
        `social/friends/requests/${requestId}`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch(removeFriendRequest(res.data));
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

  if (loading) {
    return (
      <NotificationContainer>
        <ReceivedRequestContainer>
          <LoadingSmall />
        </ReceivedRequestContainer>
      </NotificationContainer>
    );
  } else {
    return (
      <>
        <NotificationContainer>
          <ReceivedRequestContainer>
            {requests.filter((request) => request.receiver.id === user.id)
              .length > 0 && <p>Received requests</p>}

            {requests
              .filter((request) => request.receiver.id === user.id)
              .filter((request) => request.status === "P")
              .map((request) => (
                <RequestItem key={request.id}>
                  <RequestItemLeft>
                    <Avatar user={request.requester} size={40} />
                    <RequesterInfo>
                      <span>
                        {request.requester.first_name}{" "}
                        {request.requester.last_name}
                      </span>
                      <span>{request.requester.location}</span>
                    </RequesterInfo>
                  </RequestItemLeft>
                  <RequestItemRight>
                    <CircleButton
                      onClick={() => answerRequest(request.id, "A")}
                    >
                      <img src={checkIcon} />
                    </CircleButton>
                    <CircleButtonGrey
                      onClick={() => answerRequest(request.id, "R")}
                    >
                      <img src={closeIcon} />
                    </CircleButtonGrey>
                  </RequestItemRight>
                </RequestItem>
              ))}
          </ReceivedRequestContainer>
          <SentRequestContainer>
            {requests.filter((request) => request.requester.id === user.id)
              .length > 0 && <p>Sent requests</p>}

            {requests
              .filter((request) => request.requester.id === user.id)
              .map((request) => (
                <RequestItem key={request.id}>
                  <RequestItemLeft>
                    <Avatar user={request.receiver} size={40} />
                    <RequesterInfo>
                      <span>
                        {request.receiver.first_name}{" "}
                        {request.receiver.last_name}
                      </span>
                      <span>{request.receiver.location}</span>
                    </RequesterInfo>
                  </RequestItemLeft>
                  <RequestItemRight>
                    <CircleButtonGrey disabled>
                      <img src={pendingIcon} />
                    </CircleButtonGrey>
                  </RequestItemRight>
                </RequestItem>
              ))}
          </SentRequestContainer>
        </NotificationContainer>
      </>
    );
  }
};
