/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import formApi from "api/formApi";
import FormLayout from "components/template/Layout";
import IconDropdown from "components/common/Dropdown/IconDropdown";
import Question from "components/Edit/QuestionEdit";
import Icon from "components/common/Icon";
import ToggleButton from "components/common/ToggleButton";
import QuestionRead from "components/Edit/QuestionRead";
import TextDropdown from "components/common/Dropdown/TextDropdown";
import Skeleton from "components/common/Skeleton";
import ShareFormModal from "components/Modal/ShareFormModal";
import Button from "components/common/Button";
import IconButton from "components/common/IconButton";
import ErrorBoundary from "components/common/ErrorBoundary";
import useModal from "hooks/useModal";
import useLoadingDelay from "hooks/useLoadingDelay";
import writeReducer from "reducer/formEdit";
import { CATEGORY_LIST, INITIAL_FORM, QUESTION_TYPE_LIST } from "store/form";
import theme from "styles/theme";
import { FormDataApi, QuestionType } from "types/form";
import { fromApiToForm, fromFormToApi } from "utils/form";
import * as S from "./style";

function Edit() {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: fetchForm,
    refetchOnWindowFocus: false,
    retry: 2,
    useErrorBoundary: true,
  });

  const [state, dispatch] = useReducer(writeReducer, INITIAL_FORM);
  const { form, question } = state;
  const [focus, setFocus] = useState("");
  const [hover, setHover] = useState("");
  const [drag, setDrag] = useState("");

  const { openModal, closeModal, ModalPortal } = useModal();
  const delayLoading = useLoadingDelay(isLoading);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) dispatch({ type: "FETCH_DATA", init: fromApiToForm(data, "edit") });
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

  const onClickSetQuestionType = (value: QuestionType, questionIndex: number) => {
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
    const toastCallback = () => {
      toast.error("삭제가 불가능합니다!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    dispatch({ type: "DELETE_QUESTION", questionIndex, callback: toastCallback });
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

  const onClickChangeAcceptResponse = () => {
    dispatch({ type: "CHANGE_ACCEPT_RESPONSE" });
  };

  const onClickChangeResponseModifiable = () => {
    dispatch({ type: "CHANGE_RESPONSE_MODIFIABLE" });
  };

  const onClickCopyLink = () => {
    window.navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_ORIGIN_URL}/forms/${id}/view`);
    toast.success("링크가 복사되었습니다!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onClickSaveForm = () => {
    if (!id) return;
    if (!form.title) {
      toast.error("제목을 작성해주세요!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!form.category) {
      toast.error("카테고리를 정해주세요!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const apiData = fromFormToApi(state);
    formApi.saveForm(id, apiData);
    toast.success("저장이 완료되었습니다.!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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

  const checkApiSuccess = () => {
    if (!delayLoading && isSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (isLoading || delayLoading || isError) return true;
    return false;
  };

  return (
    <ErrorBoundary>
      <FormLayout backgroundColor="blue">
        <S.Container>
          {checkApiLoadingOrError() ? (
            <>
              <S.TitleContainer>
                <Skeleton.Element type="formTitle" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
              </S.TitleContainer>
              {Array.from({ length: 2 }, (_, index) => index).map((value) => (
                <S.QuestionContainer key={value}>
                  <Skeleton.Element type="formQuestionTitleEdit" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Shimmer />
                </S.QuestionContainer>
              ))}
              <S.BottomContainer>
                <Skeleton.Element type="button" />
                <Skeleton.Shimmer />
              </S.BottomContainer>
            </>
          ) : null}
          {checkApiSuccess() ? (
            <>
              <S.TitleContainer onClick={() => onClickTitle()}>
                <S.TitleInput onInput={onInputTitle} value={form.title} placeholder="제목을 작성해주세요" />
                <S.DescriptionInput
                  onInput={onInputDescription}
                  value={form.description}
                  placeholder="설문지에 대한 간단한 설명을 작성해주세요"
                />
                <TextDropdown state={form.category} defaultState="카테고리">
                  <TextDropdown.Head />
                  <TextDropdown.ItemList>
                    {CATEGORY_LIST.map((value) => (
                      <TextDropdown.Item key={value} value={value} onClick={() => onClickSelectCategory(value)} />
                    ))}
                  </TextDropdown.ItemList>
                </TextDropdown>
              </S.TitleContainer>
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
                              <S.QuestionContainer
                                onClick={() => onClickQuestion(questionIndex)}
                                onMouseOver={() => onMouseOverQuestion(questionIndex)}
                                onMouseOut={() => onMouseOutQuestion()}
                                {...draggable.draggableProps}
                                ref={draggable.innerRef}
                              >
                                <S.DragIndicator {...draggable.dragHandleProps}>
                                  {showDragIndicator(questionIndex) ? <Icon type="dragIndicator" size="16px" /> : null}
                                </S.DragIndicator>
                                {focus === `q${questionIndex}` && (
                                  <>
                                    <S.QuestionHead>
                                      <S.QuestionTitleInput
                                        onInput={(e) => onInputQuestionTitle(e.currentTarget.value, questionIndex)}
                                        value={question[questionIndex].title}
                                        placeholder="질문"
                                      />
                                      <IconDropdown
                                        state={type}
                                        setState={(questionType: string) => {
                                          const isQuestionType = (str: string): str is QuestionType =>
                                            str === "checkbox" || str === "multiple" || str === "paragraph";

                                          if (isQuestionType(questionType))
                                            onClickSetQuestionType(questionType, questionIndex);
                                        }}
                                        items={QUESTION_TYPE_LIST}
                                        defaultValue="선택해주세요"
                                      />
                                    </S.QuestionHead>
                                    <S.QuestionBody>
                                      <Question
                                        index={questionIndex}
                                        questionState={question[questionIndex]}
                                        addQuestionChoice={onClickAddQuestionChoice}
                                        modifyChoice={onInputModifyQuestionChoice}
                                        deleteChoice={onClickDeleteQuestionChoice}
                                      />
                                    </S.QuestionBody>
                                    <S.HorizontalRule />
                                    <S.QuestionTail>
                                      <IconButton
                                        type="button"
                                        onClick={() => onClickAddQuestion(questionIndex)}
                                        icon="add"
                                        size="21px"
                                        style={{ marginRight: "12px" }}
                                      />
                                      <IconButton
                                        type="button"
                                        onClick={() => onClickCopyQuestion(questionIndex)}
                                        icon="copy"
                                        size="18px"
                                        style={{ marginRight: "12px" }}
                                      />
                                      <IconButton
                                        type="button"
                                        onClick={() => onClickDeleteQuestion(questionIndex)}
                                        icon="trashcan"
                                        size="18px"
                                        style={{ marginRight: "12px" }}
                                      />
                                      <S.EssentialWrapper>
                                        <S.EssentialText>필수</S.EssentialText>
                                        <ToggleButton
                                          state={essential}
                                          onClick={() => onClickChangeQuestionEssential(questionIndex)}
                                        />
                                      </S.EssentialWrapper>
                                    </S.QuestionTail>
                                  </>
                                )}
                                {focus !== `q${questionIndex}` && (
                                  <>
                                    <div>{title}</div>
                                    <QuestionRead questionState={question[questionIndex]} />
                                  </>
                                )}
                              </S.QuestionContainer>
                            );
                          }}
                        </Draggable>
                      ))}
                      {droppable.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <S.BottomContainer>
                <Button
                  type="button"
                  onClick={() => openModal()}
                  backgroundColor={theme.colors.blue5}
                  border={theme.colors.grey3}
                  color={theme.colors.white}
                >
                  저장
                </Button>
              </S.BottomContainer>
            </>
          ) : null}
        </S.Container>

        <ModalPortal>
          <ShareFormModal
            formState={form}
            closeModal={closeModal}
            changeLoginRequired={onClickChangeLoginRequired}
            changeOnBoardShare={onClickChangeOnBoardShare}
            changeAcceptResponse={onClickChangeAcceptResponse}
            changeResponseModifiable={onClickChangeResponseModifiable}
            saveForm={onClickSaveForm}
            copyLink={onClickCopyLink}
          />
        </ModalPortal>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </FormLayout>
    </ErrorBoundary>
  );
}

export default Edit;
