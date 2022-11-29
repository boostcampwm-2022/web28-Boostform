import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormState, FormDataApi } from "types/form.type";
import formViewReducer from "reducer/formView";
import formApi from "api/formApi";
import { fromApiToForm } from "utils/form";
import { checkPrevResponseUpdateValidateCheckList, fromApiToValidateCheckList, validationCheck } from "utils/response";
import FormLayout from "components/Layout";
import QuestionView from "components/QuestionView";
import responseApi from "api/responseApi";
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
    currentQuestionId: 1,
  },
  question: [],
};

function View() {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id);
  const { data: formData, isSuccess: formIsSuccess } = useQuery({ queryKey: [id], queryFn: fetchForm });

  const fetchResponse = (): Promise<ResponseElement[]> => responseApi.getResponse(id, "63859e28159d764514e1f2cf");
  const { data: responseData, isSuccess: responseIsSuccess } = useQuery({
    queryKey: ["63859e28159d764514e1f2cf"],
    queryFn: fetchResponse,
  });

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
      const responseId = await responseApi.sendResponse(id, responseState);
      // console.log(responseId);
    }
    // console.log("submit");
    // console.log(validation);
    // console.log(checkResult);
  };

  return (
    <FormLayout backgroundColor="blue">
      <S.Container>
        <S.HeadContainer>
          <S.HeadTitle>{form.title}</S.HeadTitle>
          {form.description ? <S.HeadDescription>{form.description}</S.HeadDescription> : null}
        </S.HeadContainer>
        {question.map(({ questionId, title, essential }, questionIndex) => (
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
        <S.BottomContainer>
          <S.SubmitButton type="button" onClick={onClickSubmitForm}>
            제출
          </S.SubmitButton>
        </S.BottomContainer>
      </S.Container>
    </FormLayout>
  );
}

export default View;
