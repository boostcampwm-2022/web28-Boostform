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

type SetQueryOptionFn = (obj: FormSearchQuery) => FormSearchQuery;

class BoardService {
  // .find() : {title: 정규표현식}, {category: 카테고리}
  // .sort() : {컬럼: 정렬방식}, 컬럼:[제목, 응답자 수, 카테고리 순], 정렬방식:[1(ASC), -1(DESC)]

  static setOnBoardOption(query: FormSearchQuery) {
    // return { ...query, on_board: true };
    return { ...query, on_board: false };
  }

  static setAcceptabilityOption(query: FormSearchQuery) {
    return { ...query, accept_response: true };
  }

  static setTitleRegEx(query: FormSearchQuery) {
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

  static setSortingOption(query: FormSortQuery) {
    if (!("order_by" in query) || !("order" in query)) return ``;
    const order = query.order === "asc" ? "" : "-";
    const orderBy = query.order_by;
    return `${order}${orderBy}`;
  }

  static async searchByQuery(searchQueryObject: FormSearchQuery, sortQueryObject: FormSortQuery) {
    const searchQuery = this.pipe<SetQueryOptionFn, FormSearchQuery>(
      this.setOnBoardOption,
      this.setAcceptabilityOption,
      this.setTitleRegEx
    )(searchQueryObject);

    const sortQuery = this.setSortingOption(sortQueryObject);

    const searchResult = await Form.find(searchQuery).sort(sortQuery); // .skip(<number>).limit(<number>)
    return searchResult;
  }
}

export default BoardService;
