import React from "react";
import { useNavigate } from "react-router-dom";
import formApi from "api/formApi";
import Button from "components/common/Button";
import Icon from "components/common/Icon";
import theme from "styles/theme";
import * as S from "./style";

function ManageHead() {
  const navigate = useNavigate();

  const onClickCreateForm = async () => {
    const { formId } = await formApi.createForm();
    navigate(`/forms/${formId}/edit`);
  };

  return (
    <S.HeaderContainer>
      <Button
        type="button"
        onClick={onClickCreateForm}
        backgroundColor={theme.colors.blue3}
        color={theme.colors.white}
        fontSize={theme.fontSize.sz16}
      >
        <Icon type="plus" size="24px" fill="white" />
        <S.NewFormText>새 설문지</S.NewFormText>
      </Button>
      <S.Header>
        <S.Title>제목</S.Title>
        <S.Status>상태</S.Status>
        <S.ResponseCount>응답수</S.ResponseCount>
        <S.Date>수정 날짜</S.Date>
        <S.Share>게시판 공유</S.Share>
        <S.Category>카테고리</S.Category>
        <S.More>더보기</S.More>
      </S.Header>
    </S.HeaderContainer>
  );
}

export default ManageHead;
