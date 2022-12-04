import axios from "axios";
import API from "./routes";

const boardApi = {
  getFormList: async ({
    title,
    order,
    orderBy,
    page,
  }: {
    title: string;
    order: "asc" | "desc";
    orderBy: "title" | "category" | "responseCount";
    page: number;
  }) => {
    const { data } = await axios.get(`${API.BOARD}?title=${title}&order=${order}&order_by=${orderBy}&page=${page}`, {
      withCredentials: true,
    });
    return data;
  },
};

export default boardApi;
