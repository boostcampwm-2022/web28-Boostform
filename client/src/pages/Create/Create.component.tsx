import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout/FormLayout.component";
import Dropdown from "components/Dropdown";
import Question from "components/\bQuestion";
import {
  Container,
  TitleContainer,
  QuestionContainer,
  TitleInput,
  DescriptionInput,
  TitleRead,
  DescriptionRead,
  QuestionHead,
  QuestionTitleInput,
  QuestionBody,
} from "./Create.style";

type FormAction =
  | { type: "CHANGE_TITLE"; value: string }
  | { type: "CHANGE_DESCRIPTION"; value: string }
  | { type: "CHANGE_QUESTION_TITLE"; value: string; index: number }
  | { type: "CHANGE_QUESTION_TYPE"; value: "checkbox" | "multiple" | "paragraph"; index: number };

interface FormState {
  form: { title: string; description: string; category: string; acceptResponse: boolean; onBoard: boolean };
  question: {
    questionId: number;
    page: number;
    type: "checkbox" | "multiple" | "paragraph";
    essential: boolean;
    etcAdded: boolean;
    title: string;
    option: string[];
  }[];
}

const initialState: FormState = {
  form: {
    title: "제목 없음",
    description: "설문지 설명",
    category: "-",
    acceptResponse: false,
    onBoard: false,
  },
  question: [
    {
      questionId: 1,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션 1"],
    },
    {
      questionId: 2,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션 1"],
    },
    {
      questionId: 3,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션 1"],
    },
    {
      questionId: 4,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션 1"],
    },
  ],
};

function reducer(state: FormState, action: FormAction) {
  const { type } = action;

  if (type === "CHANGE_TITLE") {
    return {
      ...state,
      form: {
        ...state.form,
        title: action.value,
      },
    };
  }
  if (type === "CHANGE_DESCRIPTION") {
    return {
      ...state,
      form: {
        ...state.form,
        description: action.value,
      },
    };
  }
  if (type === "CHANGE_QUESTION_TITLE") {
    const left = state.question.slice(0, action.index);
    const curr = { ...state.question[action.index], title: action.value };
    const right = state.question.slice(action.index + 1);

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }
  if (type === "CHANGE_QUESTION_TYPE") {
    const left = state.question.slice(0, action.index);
    const curr = { ...state.question[action.index], type: action.value };
    const right = state.question.slice(action.index + 1);

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }

  return state;
}

function Create() {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { form, question } = state;

  // const [questions, setQuestions] = useState<
  //   { qId: string; qTitle: string; qType: "checkbox" | "multiple" | "paragraph" }[]
  // >([
  //   { qId: "a", qTitle: "질문", qType: "checkbox" },
  //   { qId: "b", qTitle: "질문", qType: "checkbox" },
  //   { qId: "c", qTitle: "질문", qType: "checkbox" },
  // ]);
  const [focus, setFocus] = useState(-1);

  const onClickTitle = () => {
    setFocus(-1);
  };

  const onClickQuestion = (index: number) => {
    setFocus(index);
  };

  const onInputTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "CHANGE_TITLE", value: e.target.value });
  };

  const onInputDescription: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "CHANGE_DESCRIPTION", value: e.target.value });
  };

  const onInputQuestionTitle = (value: string, index: number) => {
    dispatch({ type: "CHANGE_QUESTION_TITLE", index, value });
  };

  const onClickSetQuestionType = (value: "checkbox" | "multiple" | "paragraph", index: number) => {
    dispatch({ type: "CHANGE_QUESTION_TYPE", index, value });
  };

  return (
    <FormLayout>
      <Container>
        <TitleContainer onClick={() => onClickTitle()}>
          {focus !== -1 && (
            <>
              <TitleRead>{form.title}</TitleRead>
              <DescriptionRead>{form.description ? form.description : "Form description"}</DescriptionRead>
            </>
          )}
          {focus === -1 && (
            <>
              <TitleInput onInput={onInputTitle} value={form.title} />
              <DescriptionInput onInput={onInputDescription} value={form.description} placeholder="Form description" />
            </>
          )}
        </TitleContainer>
        {question.map(({ questionId, title, type }, index) => (
          <QuestionContainer key={questionId} onClick={() => onClickQuestion(index)}>
            {focus === index && (
              <>
                <QuestionHead>
                  <QuestionTitleInput
                    onInput={(e) => onInputQuestionTitle(e.currentTarget.value, index)}
                    value={question[index].title}
                    placeholder="질문"
                  />
                  <Dropdown
                    state={type}
                    setState={(questionType) => {
                      onClickSetQuestionType(questionType, index);
                    }}
                  />
                </QuestionHead>
                <QuestionBody>
                  <Question type={type} />
                </QuestionBody>
                <div>tail</div>
              </>
            )}
            {focus !== index && (
              <>
                <div>{title}</div>
                <div>body</div>
              </>
            )}
          </QuestionContainer>
        ))}
      </Container>
    </FormLayout>
  );
}

export default Create;
