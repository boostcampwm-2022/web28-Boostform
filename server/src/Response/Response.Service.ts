import FormResponse from "./Response.Model";
import Form from "../Form/Form.Model";
import FormService from "../Form/Form.Service";
import { AnswerInterface, AnswerFromRequest } from "./Response.Interface";

class ResponseService {
  static async checkAnswerExistence(formId: string, userID: number) {
    const isExist = await FormResponse.findOne({ form_id: formId, user_id: userID });

    return !(isExist === null);
  }

  static async saveResponse(formId: string, userID: number | undefined, answerList: Array<AnswerInterface>) {
    const newResponse = new FormResponse({
      user_id: userID,
      form_id: formId,
      answer_list: answerList,
    });

    await newResponse.save();
    await Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: 1 } });

    return newResponse.id;
  }

  static async getResponse(responseId: string): Promise<any> {
    const rawResponse = await FormResponse.findOne({ _id: responseId });

    const answerList = rawResponse?.answer_list.map((rawAnswer) => {
      return {
        questionId: rawAnswer.question_id,
        answer: rawAnswer.answer,
      };
    });

    const response = {
      userId: rawResponse?.user_id,
      formId: rawResponse?.form_id,
      answerList,
    };

    return response;
  }

  static async updateResponse(responseId: string, answerList: Array<AnswerInterface>) {
    await FormResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList });
  }

  static getAnswerListForDB(answerListFromRequest: Array<AnswerFromRequest>) {
    const answerList = answerListFromRequest.map((a) => {
      return {
        question_id: a.questionId,
        answer: a.answer,
      };
    });

    return answerList;
  }
}

export default ResponseService;
