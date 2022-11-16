import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  margin: 0px;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

interface ModalPortalProps {
  children: React.ReactNode;
}

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  let windowOffsetY: number;

  const openModal = () => {
    setModalOpen(true);
    windowOffsetY = window.scrollY;
    document.body.setAttribute("style", `position: fixed; top: ${windowOffsetY}px; left: 0; right: 0;`);
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.setAttribute("style", "");
    window.scrollTo(0, windowOffsetY);
  };

  function ModalPortal({ children }: ModalPortalProps) {
    if (modalOpen)
      return createPortal(
        <ModalContainer>
          {children}
          <ModalBackground onClick={closeModal} />
        </ModalContainer>,
        modalRoot
      );
    return null;
  }

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
