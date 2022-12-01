import React from "react";
import formApi from "api/formApi";
import * as S from "./style";
import DeleteFormModalProps from "./type";

function DeleteFormModal({ closeModal, renderByDeleteForm, selectedForm }: DeleteFormModalProps) {
  const onClickDeleteSurvey = async () => {
    await formApi.deleteForm(selectedForm.id);
    renderByDeleteForm(selectedForm.index);
    closeModal();
  };

  const onClickCancelDelete = () => closeModal();

  return (
    <S.Container>
      <S.Text>삭제하시겠습니까?</S.Text>
      <S.ButtonContainer>
        <S.Button type="button" onClick={onClickDeleteSurvey}>
          확인
        </S.Button>
        <S.Button type="button" onClick={onClickCancelDelete}>
          취소
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default DeleteFormModal;
