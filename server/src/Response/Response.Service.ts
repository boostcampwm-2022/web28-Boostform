import SurveyResponse from "./Response.Model";
import Form from "../Form/Form.Model";
import FormService from "../Form/Form.Service";
import { AnswerInterface, ResponseInterface } from "./Response.Interface";

class ResponseService {
  static async checkAnswerExistence(formID: string, userID: number) {
    const isExist = await SurveyResponse.findOne({ form_id: formID, user_id: userID });

    return !(isExist === null);
  }

  static async saveResponse(formID: string, userID: number | undefined, answerList: Array<AnswerInterface>) {
    const newResponse = new SurveyResponse({
      user_id: userID,
      form_id: formID,
      answer_list: answerList,
    });

    await newResponse.save();
    await Form.findOneAndUpdate({ _id: formID }, { $inc: { response_count: 1 } });

    return newResponse.id;
  }

  static async getResponse(responseID: string): Promise<any> {
    const response = await SurveyResponse.findOne({ _id: responseID });
    return response;
  }

  static async updateResponse(responseID: string, answerList: Array<AnswerInterface>) {
    await SurveyResponse.findOneAndUpdate({ _id: responseID }, { answer_list: answerList });
  }
}

export default ResponseService;
