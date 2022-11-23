import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout/FormLayout.component";
import Dropdown from "components/Dropdown";
import Question from "components/Question";
import Icon from "components/Icon/Icon.component";
import ToggleButton from "components/ToggleButton";
import QuestionRead from "components/QuestionRead";
import writeReducer from "reducer/write/writeReducer";
import { FormState } from "types/form.type";
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

function Create() {
  const { id } = useParams();

  const [state, dispatch] = useReducer(writeReducer, initialState);
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
                <div>
                  <QuestionRead questionState={question[questionIndex]} />
                </div>
              </>
            )}
          </QuestionContainer>
        ))}
      </Container>
    </FormLayout>
  );
}

export default Create;
