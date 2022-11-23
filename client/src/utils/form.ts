import { FormState, QuestionState, FormDataApi } from "types/form.type";

const fromApiToForm = (api: FormDataApi): FormState => {
  const { id, userID, title, description, category, questionList, acceptResponse, onBoard } = api;

  let fQuestion: QuestionState[];

  if (!questionList.length)
    fQuestion = [
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
    fQuestion = questionList.map(
      ({ questionId, page, type, essential, etcAdded, title: questionTitle, option }, index) => {
        const fOption = option.map((value, optionIndex) => {
          return {
            choiceId: optionIndex,
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
          option: fOption,
          currentChoiceId: index + 1,
        };
      }
    );

  return {
    form: {
      id,
      userId: userID,
      title,
      description: description || "설문지 설명",
      category: category || "카테고리",
      acceptResponse,
      onBoard,
      currentQuestionId: questionList.length,
    },
    question: fQuestion,
  };
};

const fromFormToApi = (state: FormState): FormDataApi => {
  const { form, question } = state;
  const { title, description, category, acceptResponse, onBoard, id, userId } = form;

  const q = question.map(({ questionId, page, type, essential, etcAdded, title: qTitle, option }) => {
    const qOption = option.map(({ value }) => value);

    return { questionId, page, type, essential, etcAdded, title: qTitle, option: qOption };
  });

  return {
    id,
    userID: userId,
    title,
    description,
    category,
    acceptResponse,
    onBoard,
    questionList: q,
  };
};

export { fromApiToForm, fromFormToApi };
