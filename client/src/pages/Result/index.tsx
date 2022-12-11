import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/template/Layout";
import { useQuery } from "@tanstack/react-query";
import resultApi from "api/resultApi";
import { ResultApi, QuestionSummary } from "types/result";
import QuestionResult from "components/Result/QuestionResult";
import Skeleton from "components/common/Skeleton";
import useLoadingDelay from "hooks/useLoadingDelay";
import * as S from "./style";

function Result() {
  const { id } = useParams();

  const fetchForm = (): Promise<ResultApi> => resultApi.getResult(id);
  const { data, isSuccess, isLoading, isError } = useQuery({ queryKey: [id, "result"], queryFn: fetchForm });

  const [formResult, setFormResult] = useState<ResultApi>();
  const [questionResult, setQuestionResult] = useState<QuestionSummary[]>([]);
  const delayLoading = useLoadingDelay(isLoading);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setFormResult(data);
      setQuestionResult(Object.values(data.questionResultDict));
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
        <S.HeadContainer>
          {checkApiSuccess() && (
            <>
              <S.HeadTitle>{formResult?.formTitle}</S.HeadTitle>
              <S.OverallResponseCount>응답 {formResult?.totalResponseCount}개</S.OverallResponseCount>
            </>
          )}
          {checkApiLoadingOrError() ? (
            <>
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </>
          ) : null}
        </S.HeadContainer>
        {checkApiSuccess() &&
          (questionResult.length ? (
            questionResult.map(({ type, questionTitle, responseCount, answerTotal }) => (
              <S.QuestionContainer key={questionTitle}>
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
          ))}
        {checkApiLoadingOrError()
          ? Array.from({ length: 2 }, (_, index) => index).map((value) => (
              <S.QuestionContainer key={value}>
                <Skeleton.Element type="formQuestionTitle" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </S.QuestionContainer>
            ))
          : null}
      </S.Container>
    </FormLayout>
  );
}

export default Result;
