import { useEffect } from "react";
import styled from "styled-components";
import closeIcon from "../assets/svgs/close.svg";

const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0px;
  bottom: 0px;
  left:0px;
  right:0px:
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: start;
`;

const ModalClose = styled.a`
  position: relative;
  top: -30px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export default function Modal({ children, visible, onClose }) {
  const captureEscKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handlePreventClose = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", captureEscKey);
    return () => {
      document.removeEventListener("keydown", captureEscKey);
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!visible) {
    return null;
  } else {
    return (
      <ModalBackground onClick={onClose}>
        <ModalWrapper onClick={handlePreventClose}>
          <ModalContainer>{children}</ModalContainer>
          <ModalClose onClick={onClose}>
            <img src={closeIcon} />
          </ModalClose>
        </ModalWrapper>
      </ModalBackground>
    );
  }
}
