import axios from "axios";
import { ResponseElement } from "types/response";
import API from "./routes";

const responseApi = {
  patchResponse: async (formId: string | undefined, responseId: string, response: ResponseElement[]) => {
    const { data } = await axios.patch(
      `${API.RESPONSE}/${formId}/${responseId}`,
      { answerList: response },
      { withCredentials: true }
    );
    return data.responseId;
  },
  sendResponse: async (formId: string | undefined, response: ResponseElement[]) => {
    const { data } = await axios.post(`${API.RESPONSE}/${formId}`, { answerList: response }, { withCredentials: true });
    return data.responseId;
  },
  getResponse: async (formId: string | undefined, responseId: string | undefined) => {
    if (!formId || !responseId) return [];
    const { data } = await axios.get(`${API.RESPONSE}/${formId}/${responseId}`, { withCredentials: true });
    return data.answerList;
  },
  checkDuplicateResponse: async (formId: string | undefined, userId: string | undefined) => {
    if (!userId) return null;
    const { data } = await axios.get(`${API.RESPONSE}/isSubmitted/${formId}`, { withCredentials: true });
    return data;
  },
};

export default responseApi;
