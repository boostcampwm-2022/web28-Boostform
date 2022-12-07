import { format } from "path";
import { Response, FormResult, Answer } from "./types/Result.Interface";
import Form from "../Form/Form.Model";
import FormResponse from "../Response/Response.Model";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";

export default class ResultService {
  form: any;

  responseList: Array<any>;

  result: FormResult;

  constructor() {
    this.form = undefined;
    this.responseList = [];
    this.result = {
      formTitle: "",
      totalResponseCount: 0,
      acceptResponse: false,
      questionResultDict: {},
    };
  }

  public async init(formId: string) {
    this.form = undefined;
    this.responseList = [];
    const asyncForm = Form.findOne({ _id: formId })
      .lean()
      .exec()
      .catch(() => {
        throw new BadRequestException("Invalid formId");
      });
    const asyncResponseList = FormResponse.find({ form_id: formId }).lean().exec();
    const [form, responseList] = await Promise.all([asyncForm, asyncResponseList]);
    this.form = form;
    this.responseList = responseList;
    if (!this.form) throw new BadRequestException("Invalid formId");
    this.result = {
      formTitle: this.form.title,
      totalResponseCount: this.form.response_count,
      acceptResponse: this.form.accept_response,
      questionResultDict: this.initQuestionResultDict(),
    };
  }

  static questionOptionToAnswerTotal(question: { option: string[] }) {
    const answerTotal: any = {};
    question.option.forEach((element: string) => {
      answerTotal[element] = 0;
    });
    return answerTotal;
  }

  initQuestionResultDict() {
    const resultDict: any = {};
    this.form.question_list.forEach((question: any) => {
      resultDict[question.question_id] = {
        type: question.type,
        questionTitle: question.title,
        responseCount: 0,
        answerTotal: ResultService.questionOptionToAnswerTotal(question),
      };
    });
    return resultDict;
  }

  formResult(): FormResult {
    this.responseList.forEach((response) => this.aggregateResponse(response));
    return this.result;
  }

  aggregateResponse(response: Response) {
    response.answer_list.forEach((answer: Answer) => this.aggregateAnswer(answer));
  }

  aggregateAnswer(answer: Answer) {
    this.result.questionResultDict[answer.question_id].responseCount += 1;
    answer.answer.forEach((option: string) => this.countOptionSelected(option, answer.question_id));
  }

  countOptionSelected(option: string, questionId: number) {
    if (option in this.result.questionResultDict[questionId].answerTotal) {
      this.result.questionResultDict[questionId].answerTotal[option] += 1;
    } else {
      this.result.questionResultDict[questionId].answerTotal[option] = 1;
    }
  }
}
