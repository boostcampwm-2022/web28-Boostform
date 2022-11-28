import { FormState, QuestionState } from "types/form.type";
import FormViewAction from "./type";

function formViewReducer(state: FormState, action: FormViewAction) {
  const { type } = action;

  if (type === "FETCH_DATA") {
    const { init } = action;
    return { ...state, ...init };
  }

  return state;
}

export default formViewReducer;
