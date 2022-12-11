import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormState, FormDataApi } from "types/form";
import formViewReducer from "reducer/formView";
import formApi from "api/formApi";
import { fromApiToForm } from "utils/form";
import { checkPrevResponseUpdateValidateCheckList, fromApiToValidateCheckList, validationCheck } from "utils/response";
import FormLayout from "components/template/Layout";
import QuestionView from "components/View/QuestionView";
import Button from "components/common/Button";
import Skeleton from "components/common/Skeleton";
import theme from "styles/theme";
import responseApi from "api/responseApi";
import useLoadingDelay from "hooks/useLoadingDelay";
import { ResponseElement, Validation } from "types/response";
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
    responseModifiable: false,
    currentQuestionId: 1,
  },
  question: [],
};

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: prevResponseId } = useLocation();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const {
    data: formData,
    isSuccess: formIsSuccess,
    isLoading: formIsLoading,
    isError: formIsError,
  } = useQuery({ queryKey: [id, "form"], queryFn: fetchForm });

  const fetchResponse = (): Promise<ResponseElement[]> => responseApi.getResponse(id, prevResponseId);
  const {
    data: responseData,
    isSuccess: responseIsSuccess,
    isLoading: responseIsLoading,
    isError: resposneIsError,
  } = useQuery({
    queryKey: [prevResponseId, "response"],
    queryFn: fetchResponse,
  });

  const loadingDelay = useLoadingDelay(formIsLoading || responseIsLoading);

  const [state, setState] = useState(initialState);
  const { form, question } = state;
  const [responseState, dispatch] = useReducer(formViewReducer, []);
  const [validationMode, setValidationMode] = useState(false);
  const [validation, setValidation] = useState<Validation>({});

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
    if (formIsSuccess) {
      setState(fromApiToForm(formData));
      const checkList = fromApiToValidateCheckList(formData);
      setValidation(checkList);
    }
    if (responseIsSuccess) dispatch({ type: "FETCH_DATA", init: responseData });

    if (formIsSuccess && responseIsSuccess) {
      const checkList = fromApiToValidateCheckList(formData);
      setValidation(checkPrevResponseUpdateValidateCheckList(checkList, responseData));
    }
  }, [formData, id, formIsSuccess, responseData, responseIsSuccess]);

  const onClickSubmitForm = async () => {
    setValidationMode(true);
    const checkResult = validationCheck(validation);
    if (checkResult) {
      let responseId;
      if (!prevResponseId) responseId = await responseApi.sendResponse(id, responseState);
      if (prevResponseId) responseId = await responseApi.patchResponse(id, prevResponseId, responseState);
      navigate(`/forms/${id}/response`, { state: responseId });
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
        <S.HeadContainer>
          {checkApiSuccess() && (
            <>
              <S.HeadTitle>{form.title}</S.HeadTitle>
              {form.description ? <S.HeadDescription>{form.description}</S.HeadDescription> : null}
            </>
          )}
          {formIsLoading || responseIsLoading || loadingDelay || formIsError || resposneIsError ? (
            <>
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </>
          ) : null}
        </S.HeadContainer>
        {checkApiSuccess() &&
          question.map(({ questionId, title, essential }, questionIndex) => (
            <S.QuestionContainer key={questionId} isEssential={validationMode && !validation[questionId] && essential}>
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
          ))}
        {checkApiLoadingOrError()
          ? Array.from({ length: 2 }, (_, index) => index).map((value) => (
              <S.QuestionContainer key={value} isEssential={false}>
                <Skeleton.Element type="formQuestionTitle" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </S.QuestionContainer>
            ))
          : null}
        <S.BottomContainer>
          {checkApiSuccess() && (
            <Button
              type="button"
              onClick={onClickSubmitForm}
              backgroundColor={theme.colors.blue5}
              border={theme.colors.grey3}
              color={theme.colors.white}
            >
              제출
            </Button>
          )}
          {checkApiLoadingOrError() ? (
            <>
              <Skeleton.Element type="button" />
              <Skeleton.Shimmer />
            </>
          ) : null}
        </S.BottomContainer>
      </S.Container>
    </FormLayout>
  );
}

export default View;
