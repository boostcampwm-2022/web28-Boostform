import axios from "axios";
import { FormDataApi } from "types/form.type";
import API from "./routes";

const formApi = {
  deleteForm: async (formId: string) => {
    await axios.delete(`${API.FORM}/${formId}`, { withCredentials: true });
  },
  editName: async (formId: string, title: string) => {
    await axios.patch(
      `${API.FORM}/${formId}`,
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
  getFormLists: async (size: number) => {
    return axios(`${API.FORM}?size=${size}`, { withCredentials: true });
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
