import React from "react";
import ToggleButton from "components/common/ToggleButton";
import Icon from "components/common/Icon";
import Button from "components/common/Button";
import theme from "styles/theme";
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
  copyLink,
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
        <S.ToggleWrapper>
          <span>링크</span>
          <Button
            type="button"
            onClick={copyLink}
            border="none"
            backgroundColor="transparent"
            fontSize={theme.fontSize.sz12}
          >
            <Icon type="chain" fill={theme.colors.blue3} size="24px" />
            <S.CopyLinkText>링크 복사하기</S.CopyLinkText>
          </Button>
        </S.ToggleWrapper>
      </div>
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={onClickSave}
          backgroundColor={theme.colors.blue5}
          border={theme.colors.grey2}
          color={theme.colors.white}
          style={{ marginRight: "12px" }}
        >
          저장
        </Button>
        <Button
          type="button"
          onClick={onClickCancel}
          backgroundColor={theme.colors.blue5}
          border={theme.colors.grey2}
          color={theme.colors.white}
          active={false}
        >
          취소
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default ShareFormModal;
