import Form from "./Board.Model";

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

  static pipe(...fns: SetQueryOptionFn[]) {
    return (initialQuery: FormSearchQuery) => fns.reduce((accQuery, currentFn) => currentFn(accQuery), initialQuery);
  }

  static async searchByQuery(searchQueryObject: FormSearchQuery) {
    const query = this.pipe(this.setOnBoardOption, this.setAcceptabilityOption, this.setTitleRegEx)(searchQueryObject);

    const searchResult = await Form.find(query);
    return searchResult;
  }
}

export default BoardService;
