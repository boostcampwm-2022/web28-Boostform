import Form from "./Board.Model";
import { FormSortQuery, RegExOption, FormSearchQuery, SetToQueryFn, EqualTypeReturnFn } from "./@types/query";

const categoryList = ["개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

class BoardService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static pipe<F extends Function, V>(...fns: F[]): EqualTypeReturnFn<V> {
    return (initial: V) => fns.reduce((acc, currentFn) => currentFn(acc), initial);
  }

  static setOnBoardToQuery(query: FormSearchQuery) {
    return { ...query, on_board: true };
  }

  static setAcceptabilityToQuery(query: FormSearchQuery) {
    return { ...query, accept_response: true };
  }

  static setCategoryFilterToQuery(query: FormSearchQuery) {
    if ("category" in query && !categoryList.includes(query.category as string))
      // eslint-disable-next-line no-param-reassign
      delete query.category;
    return { ...query };
  }

  static setTitleRegExToQuery(query: FormSearchQuery) {
    if (!("title" in query)) return query;

    const { title } = query;
    const titleRegex = { $regex: `${title}`, $options: "i" };
    return { ...query, title: titleRegex };
  }

  static setSortingToQuery(query: FormSortQuery) {
    const { orderBy } = query;
    if (!orderBy) return ``;
    if (orderBy === "latestAsc") return `-createdAt`;
    if (orderBy === "responseAsc") return `-response_count`;
    if (orderBy === "responseDesc") return `response_count`;
    return ``;
  }

  static async searchByQuery(searchQuery: FormSearchQuery, sortQuery: FormSortQuery, pageNum: number) {
    const select = "_id title category response_count";
    const updatedSearchQuery = this.pipe<SetToQueryFn, FormSearchQuery>(
      this.setOnBoardToQuery,
      this.setAcceptabilityToQuery,
      this.setCategoryFilterToQuery,
      this.setTitleRegExToQuery
    )(searchQuery);

    const updatedSortQuery = this.setSortingToQuery(sortQuery);

    const pageSize = 5;
    const searchResults = await Form.find(updatedSearchQuery, select)
      .sort(updatedSortQuery)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    const updatedSearchResults = searchResults.map((result) => {
      const resultObject = Object.entries(result.toObject()).map(([k, v]) => {
        if (k === "_id") return ["formId", v];
        if (k === "response_count") return ["responseCount", v];
        return [k, v];
      });
      return Object.fromEntries(resultObject);
    });

    const searchResultsLength = await Form.count(updatedSearchQuery);
    const lastPage = Math.ceil(searchResultsLength / pageSize);

    return { form: updatedSearchResults, lastPage };
  }
}

export default BoardService;
