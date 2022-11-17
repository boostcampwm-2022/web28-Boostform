import axios, { CancelTokenSource } from "axios";
import API from "./routes";

const formApi = {
  deleteForm: async (formID: string) => {
    await axios.delete(`${API.FORM}/${formID}`, { withCredentials: true });
  },
  editName: async (formID: string, title: string) => {
    await axios.patch(
      `${API.FORM}/${formID}`,
      {
        title,
      },
      { withCredentials: true }
    );
  },
  createForm: async () => {
    const { data } = await axios.post(API.FORM, {}, { withCredentials: true });

    return data;
  },
  getFormLists: async (page: number, source: CancelTokenSource) => {
    return axios(`${API.FORM}/${page}`, { withCredentials: true, cancelToken: source.token });
  },
};

export default formApi;
