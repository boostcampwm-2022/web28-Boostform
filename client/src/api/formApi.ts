import axios, { CancelTokenSource } from "axios";
import API from "./routes";

const formApi = {
  deleteForm: async (formID: string) => {
    await axios.delete(`${API.FORM}/${formID}`);
  },
  editName: async (formID: string, title: string) => {
    await axios.patch(`${API.FORM}/${formID}`, {
      title,
    });
  },
  createForm: async (userID: number) => {
    const { data } = await axios.post(API.FORM, {
      userID,
    });

    return data;
  },
  getFormLists: async (userID: number, page: number, source: CancelTokenSource) => {
    return axios(`${API.FORM}/${userID}/${page}`, { withCredentials: true, cancelToken: source.token });
  },
};

export default formApi;
