import { FormResult } from "./types/Result.Interface";
import Form from "../Form/Form.Model";
import FormResponse from "../Response/Response.Model";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";

export default class ResultService {
  form: any;

  responses: Array<any>;

  constructor() {
    this.form = undefined;
    this.responses = [];
  }

  public async init(formId: string) {
    this.form = undefined;
    this.responses = [];
    this.form = await Form.findOne({ _id: formId })
      .exec()
      .catch(() => {
        throw new BadRequestException("Invalid formId");
      });
    this.responses = await FormResponse.find({ form_id: formId });
    if (!this.form) throw new BadRequestException();
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
    const result: FormResult = {
      formTitle: this.form.title,
      totalResponseCount: this.form.response_count,
      acceptResponse: this.form.accept_response,
      questionResultDict: this.initQuestionResultDict(),
    };
    this.responses.forEach((response) => {
      response.answer_list.forEach((answer: any) => {
        result.questionResultDict[answer.question_id].responseCount += 1;
        answer.answer.forEach((e: string) => {
          if (e in result.questionResultDict[answer.question_id].answerTotal) {
            result.questionResultDict[answer.question_id].answerTotal[e] += 1;
          } else {
            result.questionResultDict[answer.question_id].answerTotal[e] = 1;
          }
        });
      });
    });
    return result;
  }
}
