import React, { useState } from "react";
import formApi from "api/formApi";
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
        <S.Button type="button" onClick={onClickChangeName}>
          확인
        </S.Button>
        <S.Button type="button" onClick={onClickCancelChangeName}>
          취소
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default EditFormNameModal;
