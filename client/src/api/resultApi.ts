import axios from "axios";
import API from "./routes";

const resultApi = {
  getResult: async (formId: string | undefined) => {
    const { data } = await axios.get(`${API.RESULT}/${formId}`, { withCredentials: true });
    return data;
  },
};

export default resultApi;
