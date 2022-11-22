import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout/FormLayout.component";
import Dropdown from "components/Dropdown";
import Question from "components/Question";
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
  | { type: "CHANGE_QUESTION_TITLE"; value: string; questionIndex: number }
  | { type: "CHANGE_QUESTION_TYPE"; value: "checkbox" | "multiple" | "paragraph"; questionIndex: number }
  | { type: "ADD_QUESTION_CHOICE"; questionIndex: number }
  | { type: "MODIFY_QUESTION_CHOICE"; questionIndex: number; choiceIndex: number; value: string };

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
      option: ["옵션1"],
    },
    {
      questionId: 2,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션1"],
    },
    {
      questionId: 3,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션1"],
    },
    {
      questionId: 4,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: ["옵션1"],
    },
  ],
};

function reducer(state: FormState, action: FormAction) {
  const { type } = action;

  if (type === "CHANGE_TITLE") {
    const { value } = action;

    return {
      ...state,
      form: {
        ...state.form,
        title: value,
      },
    };
  }
  if (type === "CHANGE_DESCRIPTION") {
    const { value } = action;

    return {
      ...state,
      form: {
        ...state.form,
        description: value,
      },
    };
  }
  if (type === "CHANGE_QUESTION_TITLE") {
    const { questionIndex, value } = action;

    const left = state.question.slice(0, questionIndex);
    const curr = { ...state.question[questionIndex], title: value };
    const right = state.question.slice(questionIndex + 1);

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }
  if (type === "CHANGE_QUESTION_TYPE") {
    const { questionIndex, value } = action;

    const left = state.question.slice(0, questionIndex);
    const curr = { ...state.question[questionIndex], type: value };
    const right = state.question.slice(questionIndex + 1);

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }
  if (type === "ADD_QUESTION_CHOICE") {
    const { questionIndex } = action;

    const optionLength = state.question[questionIndex].option.length;

    const left = state.question.slice(0, questionIndex);
    const curr = {
      ...state.question[questionIndex],
      option: [...state.question[questionIndex].option, `옵션${optionLength + 1}`],
    };
    const right = state.question.slice(questionIndex + 1);

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }
  if (type === "MODIFY_QUESTION_CHOICE") {
    const { value, questionIndex, choiceIndex } = action;

    const leftQuestion = state.question.slice(0, questionIndex);
    const rightQuestion = state.question.slice(questionIndex + 1);
    const leftChoice = state.question[questionIndex].option.slice(0, choiceIndex);
    const rightChoice = state.question[questionIndex].option.slice(choiceIndex + 1);
    const currQuestion = {
      ...state.question[questionIndex],
      option: [...leftChoice, value, ...rightChoice],
    };

    return {
      ...state,
      question: [...leftQuestion, currQuestion, ...rightQuestion],
    };
  }

  return state;
}

function Create() {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, question } = state;
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

  const onInputQuestionTitle = (value: string, questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_TITLE", questionIndex, value });
  };

  const onClickSetQuestionType = (value: "checkbox" | "multiple" | "paragraph", questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_TYPE", questionIndex, value });
  };

  const onClickAddQuestionChoice = (questionIndex: number) => {
    dispatch({ type: "ADD_QUESTION_CHOICE", questionIndex });
  };

  const onInputModifyQuestionChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    dispatch({ type: "MODIFY_QUESTION_CHOICE", questionIndex, choiceIndex, value });
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
        {question.map(({ questionId, title, type }, questionIndex) => (
          <QuestionContainer key={questionId} onClick={() => onClickQuestion(questionIndex)}>
            {focus === questionIndex && (
              <>
                <QuestionHead>
                  <QuestionTitleInput
                    onInput={(e) => onInputQuestionTitle(e.currentTarget.value, questionIndex)}
                    value={question[questionIndex].title}
                    placeholder="질문"
                  />
                  <Dropdown
                    state={type}
                    setState={(questionType) => {
                      onClickSetQuestionType(questionType, questionIndex);
                    }}
                  />
                </QuestionHead>
                <QuestionBody>
                  <Question
                    index={questionIndex}
                    questionState={question[questionIndex]}
                    addQuestionChoice={onClickAddQuestionChoice}
                    modifyChoice={onInputModifyQuestionChoice}
                  />
                </QuestionBody>
                <div>tail</div>
              </>
            )}
            {focus !== questionIndex && (
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
