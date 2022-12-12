import { FormState, QuestionState, FormDataApi } from "types/form";

const fromApiToForm = (api: FormDataApi, pageType: string): FormState => {
  const {
    id,
    userID,
    title,
    description,
    category,
    questionList,
    acceptResponse,
    onBoard,
    loginRequired,
    responseModifiable,
  } = api;

  let formQuestionList: QuestionState[];
  let currentQuestionId = 1;

  if (pageType === "edit" && !questionList.length)
    formQuestionList = [
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
    ];
  else
    formQuestionList = questionList.map(
      ({ questionId, page, type, essential, etcAdded, title: questionTitle, option }) => {
        if (currentQuestionId <= questionId) currentQuestionId = questionId;

        const formOptionList = option.map((value, optionIndex) => {
          return {
            choiceId: optionIndex + 1,
            value,
          };
        });

        return {
          questionId,
          page,
          type,
          essential,
          etcAdded,
          title: questionTitle,
          option: formOptionList,
          currentChoiceId: option.length,
        };
      }
    );

  return {
    form: {
      id,
      userId: userID,
      title,
      description: description || "",
      category,
      acceptResponse,
      onBoard,
      currentQuestionId,
      loginRequired,
      responseModifiable,
    },
    question: formQuestionList,
  };
};

const fromFormToApi = (state: FormState): FormDataApi => {
  const { form, question } = state;
  const { title, description, category, acceptResponse, onBoard, id, userId, loginRequired, responseModifiable } = form;

  const apiQuestionList = question.map(({ questionId, page, type, essential, etcAdded, title: qTitle, option }) => {
    const apiQuestionOption = option.map(({ value }) => value);

    return { questionId, page, type, essential, etcAdded, title: qTitle, option: apiQuestionOption };
  });

  return {
    id,
    userID: userId,
    title,
    description,
    category,
    acceptResponse,
    onBoard,
    loginRequired,
    responseModifiable,
    questionList: apiQuestionList,
  };
};

export { fromApiToForm, fromFormToApi };
