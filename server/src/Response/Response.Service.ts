/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import FormResponse from "./Response.Model";
import redisCli from "../Loader/Redis.Loader";
import { AnswerInterface, AnswerDTOInterface } from "./Response.Interface";

class ResponseService {
  static async checkAnswerExistence(formId: string, userID: number) {
    const response = await FormResponse.findOne({ form_id: formId, user_id: userID });

    if (!response) {
      const responseInRedis = await redisCli.hGetAll("response");

      for (const responseId in responseInRedis) {
        const tmpResponse = JSON.parse(responseInRedis[responseId]);
        if (tmpResponse.form_id === formId && tmpResponse.user_id === userID) {
          return responseId;
        }
      }
    }

    if (response !== null) {
      return response.id;
    }

    return null;
  }

  static async saveResponse(formId: string, userID: number | undefined, answerList: Array<AnswerInterface>) {
    const newResponse = new FormResponse({
      user_id: userID,
      form_id: formId,
      answer_list: answerList,
    });

    await redisCli.hSet("response", newResponse.id, JSON.stringify(newResponse));
    await redisCli.hIncrBy("count", formId, 1);

    return newResponse.id;
  }

  static async getResponse(responseId: string) {
    // redis에서 이전에 제출한 응답 찾기
    let rawResponse = await redisCli.hGet("response_update", responseId);
    if (!rawResponse) {
      rawResponse = await redisCli.hGet("response", responseId);
    }

    // redis에서 이전에 제출한 응답을 찾았다면, JSON형태로 변환해준다
    // redis에서 이전에 제출한 응답을 찾지 못했다면, DB에 접근하여 이전에 제출한 응답을 찾는다
    if (rawResponse) {
      rawResponse = JSON.parse(rawResponse);
    } else {
      rawResponse = await FormResponse.findById(responseId);
    }

    const answerList = rawResponse?.answer_list.map((rawAnswer: AnswerInterface) => {
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
    await redisCli.hSet("response_update", responseId, JSON.stringify({ answer_list: answerList }));
  }

  static getAnswerListForDB(answerListFromRequest: Array<AnswerDTOInterface>) {
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
