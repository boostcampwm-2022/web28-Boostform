import Form from "./Board.Model";
import { FormSortQuery, FormSearchQuery, SetQueryFn } from "./Board.Interface";
import { pageSize } from "./Board.Constants";
import { pipe } from "./Board.Utils";

class BoardService {
  static setOnBoard = (query: FormSearchQuery) => ({ ...query, on_board: true });

  static setAccept = (query: FormSearchQuery) => ({ ...query, accept_response: true });

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

  static setOptionFn = pipe<SetQueryFn, FormSearchQuery>(this.setOnBoard, this.setAccept, this.setTitleRegEx);

  static async searchByQuery(searchQuery: FormSearchQuery, sortQuery: FormSortQuery, pageNum: number) {
    const select = "_id title category response_count";
    const updatedSearchQuery = this.setOptionFn(searchQuery);
    const updatedSortQuery = this.setSorting(sortQuery);

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
