import { FormDataApi } from "types/form";
import { Validation, ResponseElement } from "types/response";

const fromApiToValidateCheckList = (api: FormDataApi): Validation => {
  const question = api.questionList;
  const validationCheckList: Validation = {};

  question.forEach(({ essential, questionId }) => {
    if (essential) validationCheckList[questionId] = false;
  });

  return validationCheckList;
};

const checkPrevResponseUpdateValidateCheckList = (
  prevValidation: Validation,
  response: ResponseElement[]
): Validation => {
  if (!response.length) return prevValidation;
  const keys = Object.keys(prevValidation);
  const validation: Validation = {};

  keys.forEach((key) => {
    if (response.find(({ questionId }) => key === questionId.toString())) validation[key] = true;
  });

  return validation;
};

const validationCheck = (validation: Validation) => {
  const result = Object.values(validation).every((v) => v);
  return result;
};

export { fromApiToValidateCheckList, checkPrevResponseUpdateValidateCheckList, validationCheck };
