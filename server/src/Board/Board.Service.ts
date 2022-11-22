import Form from "./Board.Model";

interface FormSearchQueryObject {
  title?: string;
  category?: string;
}

class BoardService {
  // .find() : {title: 정규표현식}, {category: 카테고리}
  // .sort() : {컬럼: 정렬방식}, 컬럼:[제목, 응답자 수, 카테고리 순], 정렬방식:[1(ASC), -1(DESC)]

  static setTitleRegEx(query: FormSearchQueryObject) {
    if (!("title" in query)) return query;

    const { title } = query;
    const titleRegex = { $regex: `${title}`, $options: "i" };
    return { ...query, title: titleRegex };
  }

  static async searchByQuery(searchQueryObject: FormSearchQueryObject) {
    const titleQuery = this.setTitleRegEx(searchQueryObject);

    const searchResult = await Form.find(titleQuery);
    return searchResult;
  }
}

export default BoardService;
