import React, { useState } from "react";
import formApi from "api/formApi";
import { Container, ButtonContainer, Button, Input, Title, Text } from "./style";
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
    <Container>
      <Title>제목 바꾸기</Title>
      <Text>항목의 새 제목을 입력하세요</Text>
      <Input onInput={onInputChangeName} placeholder="제목 없음" />
      <ButtonContainer>
        <Button type="button" onClick={onClickChangeName}>
          확인
        </Button>
        <Button type="button" onClick={onClickCancelChangeName}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default EditFormNameModal;
