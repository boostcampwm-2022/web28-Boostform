import axios from "axios";
import { Forum } from "types/forum";
import API from "./routes";

const forumApi = {
  getFormList: async ({ title, category, orderBy, page }: Forum) => {
    const { data } = await axios.get(
      `${API.BOARD}?title=${title}&category=${category}&orderBy=${orderBy}&page=${page}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },
};

export default forumApi;
