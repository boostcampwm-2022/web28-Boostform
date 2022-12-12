import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import * as S from "./style";
import ModalPortalProps from "./type";

const useModal = (option?: { setBackgroundClickClose: boolean }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  const [windowOffsetY, setWindowOffsetY] = useState(0);

  useEffect(() => {
    if (modalOpen) document.body.setAttribute("style", `position: fixed; top: ${windowOffsetY}px; left: 0; right: 0;`);
    else {
      document.body.setAttribute("style", "");
      window.scrollTo(0, -windowOffsetY);
    }
  }, [windowOffsetY, modalOpen]);

  const openModal = () => {
    setModalOpen(true);
    setWindowOffsetY(-window.scrollY);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickBackgroundCloseModal = () => {
    if (option && !option.setBackgroundClickClose) setModalOpen(false);
    if (!option) setModalOpen(false);
  };

  function ModalPortal({ children }: ModalPortalProps) {
    if (modalOpen)
      return createPortal(
        <S.ModalContainer>
          {children}
          <S.ModalBackground onClick={onClickBackgroundCloseModal} />
        </S.ModalContainer>,
        modalRoot
      );
    return null;
  }

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
