import React from "react";
import ToggleButton from "components/ToggleButton";
import * as S from "./style";
import ShareFormModalProps from "./type";

function ShareFormModal({
  formState,
  closeModal,
  changeLoginRequired,
  changeOnBoardShare,
  changeAcceptResponse,
  changeResponseModifiable,
  saveForm,
}: ShareFormModalProps) {
  const { loginRequired, onBoard, acceptResponse, responseModifiable } = formState;
  const onClickCancel = () => closeModal();
  const onClickSave = () => {
    saveForm();
    closeModal();
  };

  return (
    <S.Container>
      <S.Title>공유설정</S.Title>
      <div>
        <S.ToggleWrapper>
          <span>응답 받기</span>
          <ToggleButton state={acceptResponse} onClick={changeAcceptResponse} />
        </S.ToggleWrapper>
        <S.ToggleWrapper>
          <span>응답횟수 1회로 제한 (로그인 필수)</span>
          <ToggleButton state={loginRequired} onClick={changeLoginRequired} />
        </S.ToggleWrapper>
        <S.ToggleWrapper>
          <span>응답 수정 가능</span>
          <ToggleButton state={responseModifiable} onClick={changeResponseModifiable} />
        </S.ToggleWrapper>
        <S.ToggleWrapper>
          <span>게시판에 공유하기</span>
          <ToggleButton state={onBoard} onClick={changeOnBoardShare} />
        </S.ToggleWrapper>
        <S.ToggleWrapper>링크</S.ToggleWrapper>
      </div>
      <S.ButtonContainer>
        <S.Button type="button" onClick={onClickSave}>
          저장
        </S.Button>
        <S.Button type="button" onClick={onClickCancel}>
          취소
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default ShareFormModal;
