import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormState, FormDataApi } from "types/form.type";
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

  const [state, dispatch] = useReducer(formViewReducer, initialState);
  const { form, question } = state;

  useEffect(() => {
    if (!id) return;
    if (isSuccess) dispatch({ type: "FETCH_DATA", init: fromApiToForm(data) });
  }, [data, id, isSuccess]);

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.HeadContainer>
          <S.HeadTitle>{form.title}</S.HeadTitle>
          {form.description ? <S.HeadDescription>{form.description}</S.HeadDescription> : null}
        </S.HeadContainer>
        {question.map(({ questionId, title, type, essential }, questionIndex) => (
          <S.QuestionContainer key={questionId}>
            <div>
              <span>{title}</span>
              {essential ? <span>*</span> : null}
            </div>
            <QuestionView questionState={question[questionIndex]} />
          </S.QuestionContainer>
        ))}
        <S.BottomContainer>
          <S.SubmitButton type="button" onClick={() => console.log("hi")}>
            제출
          </S.SubmitButton>
        </S.BottomContainer>
      </S.Container>
    </FormLayout>
  );
}

export default View;
