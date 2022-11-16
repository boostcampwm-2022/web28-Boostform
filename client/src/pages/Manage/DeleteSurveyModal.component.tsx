import React from "react";
import axios from "axios";
import { Container } from "./DeleteSurveyModal.style";
import DeleteSurveyModalProps from "./DeleteSurveyModal.type";

function DeleteSurveyModal({ closeModal, renderByDeleteForm, selectedSurvey }: DeleteSurveyModalProps) {
  const onClickDeleteSurvey = async () => {
    await axios.delete(`http://localhost:8080/api/forms/${selectedSurvey.id}`);
    renderByDeleteForm(selectedSurvey.index);
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
