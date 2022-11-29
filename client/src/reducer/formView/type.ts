import { ResponseElement } from "types/form.type";

type FormViewAction =
  | { type: "ADD_RESPONSE"; value: ResponseElement }
  | { type: "DELETE_RESPONSE"; questionId: number }
  | { type: "EDIT_RESPONSE"; questionId: number; value: string[] };

export default FormViewAction;
