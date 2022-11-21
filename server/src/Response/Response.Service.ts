import SurveyResponse from "./Response.Model";

class ResponseService {
  static async checkAnswerExistence(formID: string, userID: number) {
    const isExist = await SurveyResponse.findOne({ form_id: formID, user_id: userID });

    return !(isExist === null);
  }
}

export default ResponseService;
