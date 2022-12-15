import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import formApi from "api/formApi";
import FormLayout from "components/template/Layout";
import { FormDataApi } from "types/form";
import * as S from "./style";

function Result() {
  const { id } = useParams();
  const { state } = useLocation() as {
    state: { responseId: string; type: "submitResponse" | "duplicateResponse" | "endResponse" };
  };
  const navigate = useNavigate();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data, isSuccess } = useQuery({
    queryKey: [id, "form"],
    queryFn: fetchForm,
    retry: false,
    onError: (error: { response: { status: number } }) => {
      const { status } = error.response;
      if (status === 400 || status === 404 || status === 404 || status === 500) navigate("/error", { state: status });
      if (status === 401) navigate("/login");
    },
  });

  const [form, setForm] = useState<FormDataApi>();

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setForm(data);
    }
  }, [isSuccess, data, id]);

  const onClickModifyPreviousResponse = () => {
    navigate(`/forms/${id}/view`, { state: state.responseId });
  };

  const onClickNavigateOtherResponse = () => {
    navigate(`/forms/${id}/view`);
  };

  const getTitle = () => {
    if (state && state.type === "submitResponse") return "응답이 기록되었습니다.";
    if (state && state.type === "duplicateResponse") return "이미 응답했습니다.";
    if (state && state.type === "endResponse") return "더 이상 응답을 받지 않습니다.";
    navigate("/");
    return "";
  };

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.ResponseWrapper>
          <S.Title>{form?.title}</S.Title>
          <S.Description>{getTitle()}</S.Description>
          {form?.acceptResponse ? (
            <S.LinkWrapper>
              {form?.responseModifiable ? <S.Link onClick={onClickModifyPreviousResponse}>응답 수정</S.Link> : null}
              {!form?.loginRequired ? <S.Link onClick={onClickNavigateOtherResponse}>다른 응답 제출</S.Link> : null}
            </S.LinkWrapper>
          ) : null}
        </S.ResponseWrapper>
      </S.Container>
    </FormLayout>
  );
}

export default Result;
