import { ResponseElement } from "types/response";
import FormViewAction from "./type";

function formViewReducer(state: ResponseElement[], action: FormViewAction) {
  const { type } = action;
  if (type === "FETCH_DATA") {
    const { init } = action;
    return [...init];
  }

  if (type === "ADD_RESPONSE") {
    const { value } = action;
    return [...state, value];
  }
  if (type === "DELETE_RESPONSE") {
    const { questionId } = action;
    const newState = state.filter(({ questionId: stateQuestionId }) => stateQuestionId !== questionId);

    return [...newState];
  }
  if (type === "EDIT_RESPONSE") {
    const { questionId, value } = action;
    const newState = state.filter(({ questionId: stateQuestionId }) => stateQuestionId !== questionId);
    const curr = state.find(({ questionId: stateQuestionId }) => stateQuestionId === questionId);

    if (curr) {
      curr.answer = value;
      return [...newState, curr];
    }

    return state;
  }

  return state;
}

export default formViewReducer;
