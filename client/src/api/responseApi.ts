import axios from "axios";
import { ResponseElement } from "types/response";
import API from "./routes";

const responseApi = {
  sendResponse: async (id: string | undefined, response: ResponseElement[]) => {
    const { data } = await axios.post(`${API.RESPONSE}/${id}`, { answerList: response }, { withCredentials: true });
    return data.responseId;
  },
  getResponse: async (formId: string | undefined, responseId: string | undefined) => {
    const { data } = await axios.get(`${API.RESPONSE}/${formId}/${responseId}`, { withCredentials: true });
    return data.answerList;
  },
};

export default responseApi;
