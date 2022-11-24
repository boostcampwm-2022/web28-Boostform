import { FormState, QuestionState, FormDataApi } from "types/form.type";

const fromApiToForm = (api: FormDataApi): FormState => {
  const { id, userID, title, description, category, questionList, acceptResponse, onBoard, loginRequired } = api;

  let formQuestionList: QuestionState[];

  if (!questionList.length)
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
    formQuestionList = questionList.map(({ page, type, essential, etcAdded, title: questionTitle, option }, index) => {
      const formOptionList = option.map((value, optionIndex) => {
        return {
          choiceId: optionIndex + 1,
          value,
        };
      });

      return {
        questionId: index + 1,
        page,
        type,
        essential,
        etcAdded,
        title: questionTitle,
        option: formOptionList,
        currentChoiceId: option.length,
      };
    });

  return {
    form: {
      id,
      userId: userID,
      title,
      description: description || "",
      category: category || "기타",
      acceptResponse,
      onBoard,
      currentQuestionId: questionList.length,
      loginRequired,
    },
    question: formQuestionList,
  };
};

const fromFormToApi = (state: FormState): FormDataApi => {
  const { form, question } = state;
  const { title, description, category, acceptResponse, onBoard, id, userId, loginRequired } = form;

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
    questionList: apiQuestionList,
  };
};

export { fromApiToForm, fromFormToApi };
