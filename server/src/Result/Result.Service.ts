import { TotalResult } from "./types/result.Interface";
import Form from "../Form/Form.Model";
import SurveyResponse from "../Response/SurveyResponse.Model";

class ResultService {
  form: any;

  responses: Array<any>;

  constructor() {
    this.form = undefined;
    this.responses = [];
  }

  async loadData(formID: number) {
    this.form = await Form.findOne({ id: formID }).exec();
    this.responses = await SurveyResponse.find({ form_id: formID }).exec();
  }

  initQuestionResultList() {
    const results: any = {};
    this.form.question.forEach((element: any) => {
      results[element.id] = {
        questionID: element.id,
        type: element.type,
        title: element.title,
        responseCount: 0,
        answers: {},
      };
    });
    return results;
  }

  result(): TotalResult {
    const result: TotalResult = {
      totalResponseCount: 0,
      acceptResponse: this.form.accept_response,
      results: this.initQuestionResultList(),
    };
    this.responses.forEach((response) => {
      response.answers.forEach((answer: any) => {
        result.results[answer.question_id].responseCount += 1;
      });
    });
  }
}

export default ResultService;
