import React from "react";
import formApi from "api/formApi";
import { Container } from "./DeleteSurveyModal.style";
import DeleteSurveyModalProps from "./DeleteSurveyModal.type";

function DeleteSurveyModal({ closeModal, renderByDeleteForm, selectedForm }: DeleteSurveyModalProps) {
  const onClickDeleteSurvey = async () => {
    await formApi.deleteForm(selectedForm.id);
    renderByDeleteForm(selectedForm.index);
    closeModal();
  };

  const onClickCancelDelete = () => closeModal();

  return (
    <Container>
      <div>삭제하시겠습니까?</div>
      <div>
        <button type="button" onClick={onClickDeleteSurvey}>
          확인
        </button>
        <button type="button" onClick={onClickCancelDelete}>
          취소
        </button>
      </div>
    </Container>
  );
}

export default DeleteSurveyModal;
