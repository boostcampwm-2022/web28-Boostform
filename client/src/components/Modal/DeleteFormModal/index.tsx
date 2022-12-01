import React from "react";
import formApi from "api/formApi";
import { Container, Text, ButtonContainer, Button } from "./style";
import DeleteFormModalProps from "./type";

function DeleteFormModal({ closeModal, renderByDeleteForm, selectedForm }: DeleteFormModalProps) {
  const onClickDeleteSurvey = async () => {
    await formApi.deleteForm(selectedForm.id);
    renderByDeleteForm(selectedForm.index);
    closeModal();
  };

  const onClickCancelDelete = () => closeModal();

  return (
    <Container>
      <Text>삭제하시겠습니까?</Text>
      <ButtonContainer>
        <Button type="button" onClick={onClickDeleteSurvey}>
          확인
        </Button>
        <Button type="button" onClick={onClickCancelDelete}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default DeleteFormModal;
