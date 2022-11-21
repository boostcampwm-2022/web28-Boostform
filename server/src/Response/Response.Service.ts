import SurveyResponse from "./Response.Model";
import AnswerInterface from "./Response.Interface";

class ResponseService {
  static async checkAnswerExistence(formID: string, userID: number) {
    const isExist = await SurveyResponse.findOne({ form_id: formID, user_id: userID });

    return !(isExist === null);
  }

  static async saveResponse(formID: string, userID: number | undefined, response: Array<AnswerInterface>) {
    const newResponse = new SurveyResponse({
      user_id: userID,
      form_id: formID,
      response,
    });

    await newResponse.save();

    return newResponse.id;
  }

  static async getResponse(responseID: string) {
    const response = await SurveyResponse.findOne({ _id: responseID });
    return response;
  }

  static async updateResponse(responseID: string, response: Array<AnswerInterface>) {
    await SurveyResponse.findOneAndUpdate({ _id: responseID }, { response });
  }
}

export default ResponseService;
