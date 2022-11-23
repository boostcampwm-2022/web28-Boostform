import { FormState, QuestionType, QuestionState } from "types/form.type";

interface QuestionDataApi {
  questionId: number;
  page: number;
  type: QuestionType;
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: string[];
}

interface FormDataApi {
  id: string;
  userID: number;
  title: string;
  description: string;
  category: string;
  questionList: QuestionDataApi[];
  acceptResponse: boolean;
  onBoard: boolean;
}

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
      description,
      category,
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

const initialState: FormState = {
  form: {
    id: "dfsdf",
    userId: 3,
    title: "제목 없음",
    description: "설문지 설명",
    category: "카테고리",
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

console.log(fromFormToApi(initialState));

export { fromApiToForm, fromFormToApi };
