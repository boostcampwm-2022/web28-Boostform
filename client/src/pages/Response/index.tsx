import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FormLayout from "components/organisms/Layout";
import { FormDataApi } from "types/form";
import { useQuery } from "@tanstack/react-query";
import formApi from "api/formApi";
import * as S from "./style";

function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data, isSuccess } = useQuery({ queryKey: [id], queryFn: fetchForm });

  const [form, setForm] = useState<FormDataApi>();

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setForm(data);
    }
  }, [isSuccess, data, id]);

  const onClickModifyPreviousResponse = () => {
    navigate(`/forms/${id}/view`, { state });
  };

  const onClickNavigateOtherResponse = () => {
    navigate(`/forms/${id}/view`);
  };

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.HeadContainer>
          <S.Title>{form?.title}</S.Title>
          <S.Description>응답이 기록되었습니다.</S.Description>
          <S.LinkWrapper>
            {form?.responseModifiable ? <S.Link onClick={onClickModifyPreviousResponse}>응답 수정</S.Link> : null}
            {!form?.loginRequired ? <S.Link onClick={onClickNavigateOtherResponse}>다른 응답 제출</S.Link> : null}
          </S.LinkWrapper>
        </S.HeadContainer>
      </S.Container>
    </FormLayout>
  );
}

export default Result;
