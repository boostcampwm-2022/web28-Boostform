import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ModalContainer, ModalBackground } from "./useModal.style";
import ModalPortalProps from "./useModal.type";

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
