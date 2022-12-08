import Form from "./Board.Model";
import { FormSortQuery, FormSearchQuery, SetQueryFn } from "./Board.Interface";
import { pageSize } from "./Board.Constants";
import { pipe } from "./Board.Utils";

class BoardService {
  static setOnBoard = (query: FormSearchQuery) => ({ ...query, on_board: true });

  static setCategory = (query: FormSearchQuery) => {
    const q = { ...query };
    if (q.category === "전체") delete q.category;
    return { ...q };
  };

  static setTitleRegEx(query: FormSearchQuery) {
    if (!("title" in query)) return query;
    const { title } = query;
    const titleRegex = { $regex: `${title}`, $options: "i" };
    return { ...query, title: titleRegex };
  }

  static setSorting(query: FormSortQuery) {
    const { orderBy } = query;
    if (orderBy === "latestAsc") return "-createdAt";
    if (orderBy === "responseAsc") return "-response_count";
    if (orderBy === "responseDesc") return "response_count";
    return "";
  }

  static setOptionFn = pipe<SetQueryFn, FormSearchQuery>(this.setOnBoard, this.setCategory, this.setTitleRegEx);

  static async searchByQuery(searchQuery: FormSearchQuery, sortQuery: FormSortQuery, pageNum: number) {
    const select = "_id title category response_count accept_response";
    const updatedSearchQuery = this.setOptionFn(searchQuery);
    const updatedSortQuery = this.setSorting(sortQuery);

    // offset vs cursor
    // 게시판 페이지 기능 <- 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ->
    // offset : /api/board?page=5
    // cursor : /api/board?id=120 : { 'id' : { '$gt' : 120 } }
    // cursor는 페이지 번호를 별도 계산해야 한다.
    const searchResults = await Form.find(updatedSearchQuery, select)
      .sort(updatedSortQuery)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();

    const updatedSearchResults = searchResults.map((result) => {
      return {
        // eslint-disable-next-line no-underscore-dangle
        formId: result._id,
        title: result.title,
        category: result.category,
        responseCount: result.response_count,
        acceptResponse: result.accept_response,
      };
    });

    return updatedSearchResults;
  }

  static async countByQuery(searchQuery: FormSearchQuery) {
    const updatedSearchQuery = this.setOptionFn(searchQuery);
    const searchResultsLength = await Form.count(updatedSearchQuery).exec();
    const lastPage = Math.ceil(searchResultsLength / pageSize);
    return lastPage;
  }
}

export default BoardService;
