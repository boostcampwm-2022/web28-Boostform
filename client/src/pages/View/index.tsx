import React, { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import formApi from "api/formApi";
import responseApi from "api/responseApi";
import { AuthContext } from "contexts/authProvider";
import FormLayout from "components/template/Layout";
import QuestionView from "components/View/QuestionView";
import Button from "components/common/Button";
import Skeleton from "components/common/Skeleton";
import LoginModal from "components/Modal/LoginModal";
import useLoadingDelay from "hooks/useLoadingDelay";
import useModal from "hooks/useModal";
import formViewReducer from "reducer/formView";
import theme from "styles/theme";
import { INITIAL_FORM } from "store/form";
import { ResponseElement, Validation } from "types/response";
import { FormDataApi } from "types/form";
import { fromApiToForm } from "utils/form";
import { checkPrevResponseUpdateValidateCheckList, fromApiToValidateCheckList, validationCheck } from "utils/response";
import * as S from "./style";

function View() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state: prevResponseId } = useLocation();
  const { openModal, closeModal, ModalPortal } = useModal({ setBackgroundClickClose: true });

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const {
    data: formData,
    isSuccess: formIsSuccess,
    isLoading: formIsLoading,
    isError: formIsError,
  } = useQuery({
    queryKey: [id, "form"],
    queryFn: fetchForm,
    retry: 2,
    useErrorBoundary: true,
  });

  const fetchResponse = (): Promise<ResponseElement[]> => responseApi.getResponse(id, prevResponseId);
  const {
    data: responseData,
    isSuccess: responseIsSuccess,
    isLoading: responseIsLoading,
    isError: resposneIsError,
  } = useQuery({
    queryKey: [prevResponseId, "response"],
    queryFn: fetchResponse,
    retry: 2,
    useErrorBoundary: true,
  });

  const checkDuplicateResponse = (): Promise<{ responseId: string | null }> =>
    responseApi.checkDuplicateResponse(id, auth?.userId);
  const { data: isDuplicateResponse } = useQuery({
    queryKey: [id, "duplicateResponse", auth?.userId],
    queryFn: checkDuplicateResponse,
    onError: (error: { response: { status: number } }) => {
      const { status } = error.response;
      if (status === 400 || status === 404 || status === 404 || status === 500) navigate("/error", { state: status });
      if (status === 401) navigate("/login");
    },
  });

  const loadingDelay = useLoadingDelay(formIsLoading || responseIsLoading);

  const [state, setState] = useState(INITIAL_FORM);
  const { form, question } = state;
  const [responseState, dispatch] = useReducer(formViewReducer, []);
  const [validationMode, setValidationMode] = useState(false);
  const [validation, setValidation] = useState<Validation>({});

  useEffect(() => {
    if (formIsSuccess && !formData.acceptResponse) {
      navigate(`/forms/${id}/response`, {
        state: { responseId: "", type: "endResponse" },
      });
      return;
    }
    if (
      formIsSuccess &&
      formData.loginRequired &&
      isDuplicateResponse?.responseId &&
      formData.responseModifiable &&
      prevResponseId
    ) {
      // 중복 응답이 불가능(로그인 필수)하지만 재수정하는 경우
      return;
    }

    if (formIsSuccess && formData.loginRequired && isDuplicateResponse?.responseId) {
      // 중복 응답이 불가능(로그인 필수)하고 재수정이 아닌 경우
      navigate(`/forms/${id}/response`, {
        state: { responseId: isDuplicateResponse.responseId, type: "duplicateResponse" },
      });
      return;
    }
    if (formIsSuccess && formData.loginRequired && auth?.isSuccess && !auth?.userId) {
      openModal();
    }
  }, [auth, formData, formIsSuccess, navigate, openModal, isDuplicateResponse, prevResponseId, id, closeModal]);

  useEffect(() => {
    if (!id) return;
    if (formIsSuccess) {
      setState(fromApiToForm(formData, "view"));
      const checkList = fromApiToValidateCheckList(formData);
      setValidation(checkList);
    }
    if (responseIsSuccess) dispatch({ type: "FETCH_DATA", init: responseData });

    if (formIsSuccess && responseIsSuccess) {
      const checkList = fromApiToValidateCheckList(formData);
      setValidation(checkPrevResponseUpdateValidateCheckList(checkList, responseData));
    }
  }, [formData, id, formIsSuccess, responseData, responseIsSuccess]);

  const onClickAddResponse = (value: ResponseElement) => {
    dispatch({ type: "ADD_RESPONSE", value });
  };
  const onClickDeleteResponse = (questionId: number) => {
    dispatch({ type: "DELETE_RESPONSE", questionId });
  };
  const onClickEditResponse = (questionId: number, value: string[]) => {
    dispatch({ type: "EDIT_RESPONSE", value, questionId });
  };

  const onClickSubmitForm = async () => {
    setValidationMode(true);
    const checkResult = validationCheck(validation);
    if (!checkResult)
      toast.error("필수 질문을 작성해주세요!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    if (checkResult) {
      let responseId;
      if (!prevResponseId) responseId = await responseApi.sendResponse(id, responseState);
      if (prevResponseId) responseId = await responseApi.patchResponse(id, prevResponseId, responseState);
      navigate(`/forms/${id}/response`, { state: { responseId, type: "submitResponse" } });
    }
  };

  const checkApiSuccess = () => {
    if (!loadingDelay && formIsSuccess && responseIsSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (formIsLoading || responseIsLoading || loadingDelay || formIsError || resposneIsError) return true;
    return false;
  };

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        {checkApiLoadingOrError() ? (
          <>
            <S.HeadContainer>
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </S.HeadContainer>
            {Array.from({ length: 2 }, (_, index) => index).map((value) => (
              <S.QuestionContainer key={value} isEssential={false}>
                <Skeleton.Element type="formQuestionTitle" />
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
            <S.HeadContainer>
              <S.HeadTitle>{form.title}</S.HeadTitle>
              {form.description ? <S.HeadDescription>{form.description}</S.HeadDescription> : null}
            </S.HeadContainer>
            {question.length ? (
              question.map(({ questionId, title, essential }, questionIndex) => (
                <S.QuestionContainer
                  key={questionId}
                  isEssential={validationMode && !validation[questionId] && essential}
                >
                  <div>
                    <span>{title}</span>
                    {essential ? <S.Essential>*</S.Essential> : null}
                  </div>
                  <QuestionView
                    questionState={question[questionIndex]}
                    addResponse={onClickAddResponse}
                    deleteResponse={onClickDeleteResponse}
                    editResponse={onClickEditResponse}
                    responseState={responseState}
                    validationMode={validationMode}
                    validation={validation}
                    setValidation={setValidation}
                  />
                </S.QuestionContainer>
              ))
            ) : (
              <S.QuestionContainer isEssential={false}>
                <S.NoResponseForm>설문지 문항이 존재하지 않습니다.</S.NoResponseForm>
              </S.QuestionContainer>
            )}
            {question.length ? (
              <S.BottomContainer>
                <Button
                  type="button"
                  onClick={onClickSubmitForm}
                  backgroundColor={theme.colors.blue5}
                  border={theme.colors.grey3}
                  color={theme.colors.white}
                >
                  제출
                </Button>
              </S.BottomContainer>
            ) : null}
          </>
        ) : null}

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
        <ModalPortal>
          <LoginModal closeModal={closeModal} />
        </ModalPortal>
      </S.Container>
    </FormLayout>
  );
}

export default View;
