import React from "react";
import ToggleButton from "components/ToggleButton";
import { Container, ToggleWrapper, Title, ButtonContainer, Button } from "./ShareFormModal.style";
import ShareFormModalProps from "./SharedFormModal.type";

function ShareFormModal({
  formState,
  closeModal,
  changeLoginRequired,
  changeOnBoardShare,
  saveForm,
}: ShareFormModalProps) {
  const { loginRequired, onBoard } = formState;
  const onClickCancel = () => closeModal();
  const onClickSave = () => {
    saveForm();
    closeModal();
  };

  return (
    <Container>
      <Title>공유설정</Title>
      <div>
        <ToggleWrapper>
          <span>응답횟수 1회로 제한 (로그인 필수)</span>
          <ToggleButton state={loginRequired} onClick={changeLoginRequired} />
        </ToggleWrapper>
        <ToggleWrapper>
          <span>응답 수정 가능</span>
          <ToggleButton state={loginRequired} onClick={() => console.log("response")} />
        </ToggleWrapper>
        <ToggleWrapper>
          <span>게시판에 공유하기</span>
          <ToggleButton state={onBoard} onClick={changeOnBoardShare} />
        </ToggleWrapper>
        <ToggleWrapper>링크</ToggleWrapper>
      </div>
      <ButtonContainer>
        <Button type="button" onClick={onClickSave}>
          저장
        </Button>
        <Button type="button" onClick={onClickCancel}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default ShareFormModal;
