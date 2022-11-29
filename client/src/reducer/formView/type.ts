import { ResponseElement } from "types/response";

type FormViewAction =
  | { type: "FETCH_DATA"; init: ResponseElement[] }
  | { type: "ADD_RESPONSE"; value: ResponseElement }
  | { type: "DELETE_RESPONSE"; questionId: number }
  | { type: "EDIT_RESPONSE"; questionId: number; value: string[] };

export default FormViewAction;
