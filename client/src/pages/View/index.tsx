import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormState, FormDataApi, ResponseElement } from "types/form.type";
import formViewReducer from "reducer/formView";
import formApi from "api/formApi";
import { fromApiToForm } from "utils/form";
import FormLayout from "components/Layout";
import QuestionView from "components/QuestionView";

import * as S from "./style";

const initialState: FormState = {
  form: {
    id: "example",
    userId: 3,
    title: "",
    description: "",
    category: "기타",
    acceptResponse: false,
    onBoard: false,
    loginRequired: false,
    currentQuestionId: 1,
  },
  question: [],
};

function View() {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data, isSuccess } = useQuery({ queryKey: [id], queryFn: fetchForm });
  const [state, setState] = useState(initialState);
  const { form, question } = state;

  const [responseState, dispatch] = useReducer(formViewReducer, [
    { questionId: 1, answer: ["사자"] },
    { questionId: 2, answer: ["피자", "햄버거"] },
    { questionId: 4, answer: ["아이유"] },
  ]);

  const onClickAddResponse = (value: ResponseElement) => {
    dispatch({ type: "ADD_RESPONSE", value });
  };
  const onClickDeleteResponse = (questionId: number) => {
    dispatch({ type: "DELETE_RESPONSE", questionId });
  };
  const onClickEditResponse = (questionId: number, value: string[]) => {
    dispatch({ type: "EDIT_RESPONSE", value, questionId });
  };

  useEffect(() => {
    if (!id) return;
    if (isSuccess) setState(fromApiToForm(data));
  }, [data, id, isSuccess]);

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.HeadContainer>
          <S.HeadTitle>{form.title}</S.HeadTitle>
          {form.description ? <S.HeadDescription>{form.description}</S.HeadDescription> : null}
        </S.HeadContainer>
        {question.map(({ questionId, title, essential }, questionIndex) => (
          <S.QuestionContainer key={questionId}>
            <div>
              <span>{title}</span>
              {essential ? <span>*</span> : null}
            </div>
            <QuestionView
              questionState={question[questionIndex]}
              addResponse={onClickAddResponse}
              deleteResponse={onClickDeleteResponse}
              editResponse={onClickEditResponse}
              responseState={responseState}
            />
          </S.QuestionContainer>
        ))}
        <S.BottomContainer>
          <S.SubmitButton type="button" onClick={() => console.log(responseState)}>
            제출
          </S.SubmitButton>
        </S.BottomContainer>
      </S.Container>
    </FormLayout>
  );
}

export default View;
