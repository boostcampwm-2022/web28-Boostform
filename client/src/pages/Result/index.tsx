import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout";
import ToggleButton from "components/ToggleButton";
import { useQuery } from "@tanstack/react-query";
import resultApi from "api/resultApi";
import { ResultApi, QuestionSummary } from "types/result";
import QuestionResult from "components/QuestionResult";
import * as S from "./style";

function Result() {
  const { id } = useParams();

  const fetchForm = (): Promise<ResultApi> => resultApi.getResult(id);
  const { data, isSuccess } = useQuery({ queryKey: [id], queryFn: fetchForm });

  const [formResult, setFormResult] = useState<ResultApi>();
  const [questionResult, setQuestionResult] = useState<QuestionSummary[]>([]);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setFormResult(data);
      setQuestionResult(Object.values(data.questionResultDict));
    }
  }, [id, isSuccess, data]);

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.HeadContainer>
          <S.HeadTitle>설문지 제목</S.HeadTitle>
          <S.ResponseCountWrapper>
            <S.ResponseCount>응답 10개</S.ResponseCount>
            <S.ToggleWrapper>
              <S.ToggleText>응답 받기</S.ToggleText>
              <ToggleButton state={!!"dd"} onClick={() => console.log("딸깍")} />
            </S.ToggleWrapper>
          </S.ResponseCountWrapper>
        </S.HeadContainer>
        {questionResult.map(({ type, questionTitle, responseCount, answerTotal }) => (
          <S.QuestionContainer key={questionTitle}>
            <div>
              <span>{questionTitle}</span>
            </div>
            {responseCount ? (
              <div>
                <span>{responseCount}</span>
              </div>
            ) : null}
            {responseCount ? (
              <QuestionResult type={type} answerTotal={answerTotal} />
            ) : (
              <div>질문에 대한 응답이 없습니다.</div>
            )}
          </S.QuestionContainer>
        ))}
      </S.Container>
    </FormLayout>
  );
}

export default Result;
