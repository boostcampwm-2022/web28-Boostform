import SurveyResponse from "./Response.Model";
import Form from "../Form/Form.Model";
import FormService from "../Form/Form.Service";
import { AnswerInterface, ResponseInterface } from "./Response.Interface";

class ResponseService {
  static async checkAnswerExistence(formId: string, userID: number) {
    const isExist = await SurveyResponse.findOne({ form_id: formId, user_id: userID });

    return !(isExist === null);
  }

  static async saveResponse(formId: string, userID: number | undefined, answerList: Array<AnswerInterface>) {
    const newResponse = new SurveyResponse({
      user_id: userID,
      form_id: formId,
      answer_list: answerList,
    });

    await newResponse.save();
    await Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: 1 } });

    return newResponse.id;
  }

  static async getResponse(responseId: string): Promise<any> {
    const response = await SurveyResponse.findOne({ _id: responseId });
    return response;
  }

  static async updateResponse(responseId: string, answerList: Array<AnswerInterface>) {
    await SurveyResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList });
  }
}

export default ResponseService;
