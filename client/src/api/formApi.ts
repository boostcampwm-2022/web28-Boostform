import axios, { CancelTokenSource } from "axios";
import { FormDataApi } from "types/form.type";
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
  getFormLists: async (size: number, source: CancelTokenSource) => {
    return axios(`${API.FORM}?size=${size}`, { withCredentials: true, cancelToken: source.token });
  },
  getForm: async (id: string | undefined) => {
    const { data } = await axios.get(`${API.FORM}/${id}`, { withCredentials: true });
    return data;
  },
  saveForm: async (id: string, apiData: FormDataApi) => {
    const { data } = await axios.patch(`${API.FORM}/${id}`, apiData, { withCredentials: true });
    return data;
  },
};

export default formApi;
