import React, { useState } from "react";
import formApi from "api/formApi";
import Button from "components/common/Button";
import theme from "styles/theme";
import * as S from "./style";
import EditFormNameModalProps from "./type";

function EditFormNameModal({ closeModal, selectedForm, renderByNameChange }: EditFormNameModalProps) {
  const [title, setTitle] = useState("");

  const onClickChangeName = async () => {
    const chageTitle = !title ? "제목 없음" : title;
    await formApi.editName(selectedForm.id, chageTitle);
    renderByNameChange(selectedForm.index, chageTitle);
    closeModal();
  };
  const onClickCancelChangeName = () => closeModal();

  const onInputChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  return (
    <S.Container>
      <S.Title>제목 바꾸기</S.Title>
      <S.Text>항목의 새 제목을 입력하세요</S.Text>
      <S.Input onInput={onInputChangeName} placeholder="제목 없음" />
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={onClickChangeName}
          backgroundColor={theme.colors.white}
          border={theme.colors.blue2}
          color={theme.colors.blue2}
          fontSize={theme.fontSize.sz12}
          custom="margin-right: 12px;"
          hover={theme.colors.grey2}
          active
        >
          확인
        </Button>
        <Button
          type="button"
          onClick={onClickCancelChangeName}
          backgroundColor={theme.colors.white}
          border={theme.colors.blue2}
          color={theme.colors.blue2}
          fontSize={theme.fontSize.sz12}
          hover={theme.colors.grey2}
          active
        >
          취소
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default EditFormNameModal;
