import Form from "./Board.Model";

interface FormSortQuery {
  order?: "asc" | "desc";
  order_by?: "title" | "category" | "response_count";
}

interface RegExOption {
  $regex: string;
  $options: string;
}

interface FormSearchQuery {
  title?: string | RegExOption;
  category?: string;
}

type SetToQueryFn = (query: FormSearchQuery) => FormSearchQuery;

class BoardService {
  static setOnBoardToQuery(query: FormSearchQuery) {
    return { ...query, on_board: false };
  }

  static setAcceptabilityToQuery(query: FormSearchQuery) {
    return { ...query, accept_response: true };
  }

  static setTitleRegExToQuery(query: FormSearchQuery) {
    if (!("title" in query)) return query;

    const { title } = query;
    const titleRegex = { $regex: `${title}`, $options: "i" };
    return { ...query, title: titleRegex };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static pipe<F extends Function, V>(...fns: F[]) {
    // pipe<H, F extends Function, V>(...fns: F[]): H - ReturnType 지정방법 찾아보기
    return (initial: V) => fns.reduce((acc, currentFn) => currentFn(acc), initial);
  }

  static setSortingToQuery(query: FormSortQuery) {
    if (!("order_by" in query) || !("order" in query)) return ``;
    const order = query.order === "asc" ? "" : "-";
    const orderBy = query.order_by;
    return `${order}${orderBy}`;
  }

  static async searchByQuery(searchQuery: FormSearchQuery, sortQuery: FormSortQuery) {
    const updatedSearchQuery = this.pipe<SetToQueryFn, FormSearchQuery>(
      this.setOnBoardToQuery,
      this.setAcceptabilityToQuery,
      this.setTitleRegExToQuery
    )(searchQuery);

    const updatedSortQuery = this.setSortingToQuery(sortQuery);

    const searchResults = await Form.find(updatedSearchQuery).sort(updatedSortQuery); // .skip(<number>).limit(<number>)
    return searchResults;
  }
}

export default BoardService;
