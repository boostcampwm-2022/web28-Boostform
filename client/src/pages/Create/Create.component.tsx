import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import lodash from "lodash";
import FormLayout from "components/Layout/FormLayout.component";
import Dropdown from "components/Dropdown";
import Question from "components/Question";
import Icon from "components/Icon/Icon.component";
import ToggleButton from "components/ToggleButton";
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
  HorizontalRule,
  QuestionTail,
  QuestionTailButton,
  EssentialWrapper,
  EssentialText,
} from "./Create.style";

type FormAction =
  | { type: "CHANGE_TITLE"; value: string }
  | { type: "CHANGE_DESCRIPTION"; value: string }
  | { type: "CHANGE_QUESTION_TITLE"; value: string; questionIndex: number }
  | { type: "CHANGE_QUESTION_TYPE"; value: "checkbox" | "multiple" | "paragraph"; questionIndex: number }
  | { type: "ADD_QUESTION_CHOICE"; questionIndex: number }
  | { type: "MODIFY_QUESTION_CHOICE"; questionIndex: number; choiceIndex: number; value: string }
  | { type: "DELETE_QUESTION_CHOICE"; questionIndex: number; choiceIndex: number }
  | { type: "DELETE_QUESTION"; questionIndex: number }
  | { type: "COPY_QUESTION"; questionIndex: number }
  | { type: "CHANGE_QUESTION_ESSENTIAL"; questionIndex: number };

interface FormState {
  form: {
    title: string;
    description: string;
    category: string;
    acceptResponse: boolean;
    onBoard: boolean;
    currentQuestionId: number;
  };
  question: {
    questionId: number;
    currentChoiceId: number;
    page: number;
    type: "checkbox" | "multiple" | "paragraph";
    essential: boolean;
    etcAdded: boolean;
    title: string;
    option: {
      choiceId: number;
      value: string;
    }[];
  }[];
}

const initialState: FormState = {
  form: {
    title: "제목 없음",
    description: "설문지 설명",
    category: "-",
    acceptResponse: false,
    onBoard: false,
    currentQuestionId: 1,
  },
  question: [
    {
      questionId: 1,
      currentChoiceId: 1,
      page: 1,
      type: "checkbox",
      essential: false,
      etcAdded: false,
      title: "질문",
      option: [{ choiceId: 1, value: "옵션1" }],
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
    const prevType = state.question[questionIndex].type;
    if (prevType === value) return state;

    const left = state.question.slice(0, questionIndex);
    const right = state.question.slice(questionIndex + 1);
    let curr;

    if ((prevType === "checkbox" || prevType === "multiple") && value === "paragraph")
      curr = {
        ...state.question[questionIndex],
        type: value,
        option: [],
      };
    else if (prevType === "paragraph" && (value === "checkbox" || value === "multiple"))
      curr = {
        ...state.question[questionIndex],
        type: value,
        option: [{ choiceId: 1, value: "옵션1" }],
        currentChoiceId: 1,
      };
    else curr = { ...state.question[questionIndex], type: value };

    return {
      ...state,
      question: [...left, curr, ...right],
    };
  }
  if (type === "ADD_QUESTION_CHOICE") {
    const { questionIndex } = action;

    const optionLength = state.question[questionIndex].option.length;
    const { currentChoiceId } = state.question[questionIndex];

    const left = state.question.slice(0, questionIndex);
    const curr = {
      ...state.question[questionIndex],
      currentChoiceId: currentChoiceId + 1,
      option: [
        ...state.question[questionIndex].option,
        { choiceId: currentChoiceId + 1, value: `옵션${optionLength + 1}` },
      ],
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
      option: [...leftChoice, { ...state.question[questionIndex].option[choiceIndex], value }, ...rightChoice],
    };

    return {
      ...state,
      question: [...leftQuestion, currQuestion, ...rightQuestion],
    };
  }
  if (type === "DELETE_QUESTION_CHOICE") {
    const { questionIndex, choiceIndex } = action;

    const leftQuestion = state.question.slice(0, questionIndex);
    const rightQuestion = state.question.slice(questionIndex + 1);
    const leftChoice = state.question[questionIndex].option.slice(0, choiceIndex);
    const rightChoice = state.question[questionIndex].option.slice(choiceIndex + 1);
    const currQuestion = {
      ...state.question[questionIndex],
      option: [...leftChoice, ...rightChoice],
    };

    return {
      ...state,
      question: [...leftQuestion, currQuestion, ...rightQuestion],
    };
  }
  if (type === "COPY_QUESTION") {
    const { questionIndex } = action;

    const { currentQuestionId } = state.form;
    const leftQuestion = state.question.slice(0, questionIndex);
    const rightQuestion = state.question.slice(questionIndex + 1);
    const currentQuestion = state.question[questionIndex];
    const copyQuestion = { ...lodash.cloneDeep(currentQuestion), questionId: currentQuestionId + 1 };

    return {
      form: { ...state.form, currentQuestionId: currentQuestionId + 1 },
      question: [...leftQuestion, currentQuestion, copyQuestion, ...rightQuestion],
    };
  }
  if (type === "DELETE_QUESTION") {
    const { questionIndex } = action;

    const leftQuestion = state.question.slice(0, questionIndex);
    const rightQuestion = state.question.slice(questionIndex + 1);

    return {
      ...state,
      question: [...leftQuestion, ...rightQuestion],
    };
  }
  if (type === "CHANGE_QUESTION_ESSENTIAL") {
    const { questionIndex } = action;
    const prevState = state.question[questionIndex].essential;

    const leftQuestion = state.question.slice(0, questionIndex);
    const rightQuestion = state.question.slice(questionIndex + 1);
    const currQuestion = {
      ...state.question[questionIndex],
      essential: !prevState,
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

  const onClickDeleteQuestionChoice = (questionIndex: number, choiceIndex: number) => {
    dispatch({ type: "DELETE_QUESTION_CHOICE", questionIndex, choiceIndex });
  };

  const onClickCopyQuestion = (questionIndex: number) => {
    dispatch({ type: "COPY_QUESTION", questionIndex });
  };

  const onClickDeleteQuestion = (questionIndex: number) => {
    dispatch({ type: "DELETE_QUESTION", questionIndex });
  };

  const onClickChangeQuestionEssential = (questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_ESSENTIAL", questionIndex });
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
        {question.map(({ questionId, title, type, essential }, questionIndex) => (
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
                    deleteChoice={onClickDeleteQuestionChoice}
                  />
                </QuestionBody>
                <HorizontalRule />
                <QuestionTail>
                  <QuestionTailButton type="button" onClick={() => onClickCopyQuestion(questionIndex)}>
                    <Icon type="copy" size="18px" />
                  </QuestionTailButton>
                  <QuestionTailButton type="button" onClick={() => onClickDeleteQuestion(questionIndex)}>
                    <Icon type="trashcan" size="18px" />
                  </QuestionTailButton>
                  <EssentialWrapper>
                    <EssentialText>필수</EssentialText>
                    <ToggleButton state={essential} onClick={() => onClickChangeQuestionEssential(questionIndex)} />
                  </EssentialWrapper>
                </QuestionTail>
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
