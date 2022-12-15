import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import resultApi from "api/resultApi";
import FormLayout from "components/template/Layout";
import QuestionResult from "components/Result/QuestionResult";
import Skeleton from "components/common/Skeleton";
import useLoadingDelay from "hooks/useLoadingDelay";
import { ResultApi, QuestionSummary } from "types/result";
import * as S from "./style";

function Result() {
  const { id } = useParams();

  const fetchForm = (): Promise<ResultApi> => resultApi.getResult(id);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id, "result"],
    queryFn: fetchForm,
    retry: 2,
    useErrorBoundary: true,
  });

  const [formResult, setFormResult] = useState<ResultApi>();
  const [questionResult, setQuestionResult] = useState<QuestionSummary[]>([]);
  const delayLoading = useLoadingDelay(isLoading);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setFormResult(data);
      const results = Object.values(data.questionResultDict).map((value, index) => ({ ...value, key: index }));
      setQuestionResult(results);
    }
  }, [id, isSuccess, data]);

  const checkApiSuccess = () => {
    if (!delayLoading && isSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (isLoading || delayLoading || isError) return true;
    return false;
  };

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        {checkApiLoadingOrError() ? (
          <>
            <S.HeadContainer>
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </S.HeadContainer>
            {Array.from({ length: 2 }, (_, index) => index).map((value) => (
              <S.QuestionContainer key={value}>
                <Skeleton.Element type="formQuestionTitle" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </S.QuestionContainer>
            ))}
          </>
        ) : null}
        {checkApiSuccess() ? (
          <>
            <S.HeadContainer>
              <S.HeadTitle>{formResult?.formTitle}</S.HeadTitle>
              <S.OverallResponseCount>응답 {formResult?.totalResponseCount}개</S.OverallResponseCount>
            </S.HeadContainer>
            {questionResult.length ? (
              questionResult.map(({ type, questionTitle, responseCount, answerTotal, key }) => (
                <S.QuestionContainer key={key}>
                  <div>
                    <span>{questionTitle}</span>
                  </div>
                  {responseCount ? (
                    <S.QuestionResponseCount>
                      <span>응답 {responseCount}개</span>
                    </S.QuestionResponseCount>
                  ) : null}
                  {responseCount ? (
                    <QuestionResult type={type} answerTotal={answerTotal} />
                  ) : (
                    <S.NoResponseQuestion>질문에 대한 응답이 없습니다.</S.NoResponseQuestion>
                  )}
                </S.QuestionContainer>
              ))
            ) : (
              <S.QuestionContainer>
                <S.NoResponseForm>설문지에 대한 응답이 없습니다.</S.NoResponseForm>
              </S.QuestionContainer>
            )}
          </>
        ) : null}
      </S.Container>
    </FormLayout>
  );
}

export default Result;
