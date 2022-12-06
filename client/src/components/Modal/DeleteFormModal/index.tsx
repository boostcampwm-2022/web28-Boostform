import React from "react";
import formApi from "api/formApi";
import Button from "components/atoms/Button";
import theme from "styles/theme";
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
        <Button
          type="button"
          onClick={onClickDeleteSurvey}
          backgroundColor={theme.colors.white}
          border={theme.colors.red1}
          color={theme.colors.red1}
          fontSize={theme.fontSize.sz12}
          custom="margin-right: 12px;"
          hover={theme.colors.grey2}
          active
        >
          확인
        </Button>
        <Button
          type="button"
          onClick={onClickCancelDelete}
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

export default DeleteFormModal;
