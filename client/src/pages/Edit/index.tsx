/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";

import FormLayout from "components/Layout";
import Dropdown from "components/QuestionTypeDropdown";
import Question from "components/Question";
import Icon from "components/Icon";
import ToggleButton from "components/ToggleButton";
import QuestionRead from "components/QuestionRead";
import TitleDropdown from "components/CategoryDropdown";
import ShareFormModal from "components/Modal/ShareFormModal";
import writeReducer from "reducer/formEdit";
import { FormState, FormDataApi } from "types/form";
import formApi from "api/formApi";
import { fromApiToForm, fromFormToApi } from "utils/form";
import useModal from "hooks/useModal";
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
  TitleCategoryWrapper,
  TitleCategoryText,
  BottomContainer,
  ShareButton,
  DragIndicator,
} from "./style";

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

function Edit() {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data, isSuccess } = useQuery({ queryKey: [id], queryFn: fetchForm });

  const [state, dispatch] = useReducer(writeReducer, initialState);
  const { form, question } = state;
  const [focus, setFocus] = useState("");
  const [hover, setHover] = useState("");
  const [drag, setDrag] = useState("");

  const { openModal, closeModal, ModalPortal } = useModal();

  useEffect(() => {
    if (!id) return;
    if (isSuccess) dispatch({ type: "FETCH_DATA", init: fromApiToForm(data) });
  }, [data, id, isSuccess]);

  const onClickTitle = () => {
    setFocus("title");
  };
  const onClickQuestion = (index: number) => {
    setFocus(`q${index}`);
  };

  const onMouseOverQuestion = (index: number) => {
    setHover(`q${index}`);
  };
  const onMouseOutQuestion = () => {
    setHover("");
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

  const onClickAddQuestion = (questionIndex: number) => {
    dispatch({ type: "ADD_QUESTION", questionIndex });
  };

  const onClickDeleteQuestion = (questionIndex: number) => {
    dispatch({ type: "DELETE_QUESTION", questionIndex });
  };

  const onClickChangeQuestionEssential = (questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_ESSENTIAL", questionIndex });
  };

  const onClickSelectCategory = (value: string) => {
    dispatch({ type: "SELECT_FORM_CATEGORY", value });
  };

  const onClickChangeLoginRequired = () => {
    dispatch({ type: "CHANGE_LOGIN_REQUIRED" });
  };

  const onClickChangeOnBoardShare = () => {
    dispatch({ type: "CHANGE_ON_BOARD_SHARED" });
  };

  const onClickSaveForm = () => {
    if (!id) return;
    const apiData = fromFormToApi(state);
    formApi.saveForm(id, apiData);
  };

  const onDragStart = (initial: DragStart) => {
    const { source } = initial;
    setDrag(`q${source.index}`);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    setDrag("");
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch({ type: "CHANGE_QUESTION_ORDER", destinationIndex: destination.index, originIndex: source.index });
    setFocus(`q${destination.index}`);
  };

  const showDragIndicator = (index: number) => {
    if (focus === `q${index}`) return true;
    if (drag === `q${index}`) return true;
    if (drag && drag !== hover) return false;
    if (hover === `q${index}`) return true;
    return false;
  };

  return (
    <FormLayout backgroundColor="blue">
      <Container>
        <TitleContainer onClick={() => onClickTitle()}>
          {focus !== "title" && (
            <>
              <TitleRead>{form.title}</TitleRead>
              <DescriptionRead isEmpty={!form.description}>
                {form.description ? form.description : "설문지 설명"}
              </DescriptionRead>
              <TitleCategoryWrapper>
                <TitleCategoryText>{form.category}</TitleCategoryText>
              </TitleCategoryWrapper>
            </>
          )}
          {focus === "title" && (
            <>
              <TitleInput onInput={onInputTitle} value={form.title} />
              <DescriptionInput onInput={onInputDescription} value={form.description} placeholder="설문지 설명" />
              <TitleDropdown state={form.category} setState={onClickSelectCategory} />
            </>
          )}
        </TitleContainer>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId="formQuestions">
            {(droppable) => (
              <div ref={droppable.innerRef} {...droppable.droppableProps}>
                {question.map(({ questionId, title, type, essential }, questionIndex) => (
                  <Draggable draggableId={questionId.toString()} index={questionIndex} key={questionId}>
                    {(draggable) => {
                      let transform = draggable.draggableProps.style?.transform;

                      if (transform) {
                        transform = transform.replace(/([0-9]+px)/, "0px");
                        draggable.draggableProps.style = {
                          ...draggable.draggableProps.style,
                          transform,
                        };
                      }

                      return (
                        <QuestionContainer
                          onClick={() => onClickQuestion(questionIndex)}
                          onMouseOver={() => onMouseOverQuestion(questionIndex)}
                          onMouseOut={() => onMouseOutQuestion()}
                          {...draggable.draggableProps}
                          ref={draggable.innerRef}
                        >
                          <DragIndicator {...draggable.dragHandleProps}>
                            {showDragIndicator(questionIndex) ? <Icon type="dragIndicator" size="16px" /> : null}
                          </DragIndicator>
                          {focus === `q${questionIndex}` && (
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
                                <QuestionTailButton type="button" onClick={() => onClickAddQuestion(questionIndex)}>
                                  <Icon type="add" size="21px" />
                                </QuestionTailButton>
                                <QuestionTailButton type="button" onClick={() => onClickCopyQuestion(questionIndex)}>
                                  <Icon type="copy" size="18px" />
                                </QuestionTailButton>
                                <QuestionTailButton type="button" onClick={() => onClickDeleteQuestion(questionIndex)}>
                                  <Icon type="trashcan" size="18px" />
                                </QuestionTailButton>
                                <EssentialWrapper>
                                  <EssentialText>필수</EssentialText>
                                  <ToggleButton
                                    state={essential}
                                    onClick={() => onClickChangeQuestionEssential(questionIndex)}
                                  />
                                </EssentialWrapper>
                              </QuestionTail>
                            </>
                          )}
                          {focus !== `q${questionIndex}` && (
                            <>
                              <div>{title}</div>
                              <QuestionRead questionState={question[questionIndex]} />
                            </>
                          )}
                        </QuestionContainer>
                      );
                    }}
                  </Draggable>
                ))}
                {droppable.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <BottomContainer>
          <ShareButton type="button" onClick={() => openModal()}>
            저장
          </ShareButton>
        </BottomContainer>
      </Container>

      <ModalPortal>
        <ShareFormModal
          formState={form}
          closeModal={closeModal}
          changeLoginRequired={onClickChangeLoginRequired}
          changeOnBoardShare={onClickChangeOnBoardShare}
          saveForm={onClickSaveForm}
        />
      </ModalPortal>
    </FormLayout>
  );
}

export default Edit;
