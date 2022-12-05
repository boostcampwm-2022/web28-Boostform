/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import schedule from "node-schedule";
import { redisCli } from "../app";
import FormResponse from "./Response.Model";
import Form from "../Form/Form.Model";

const responseSchedule = () => {
  schedule.scheduleJob("*/30 * * * * *", async () => {
    // 제출된 응답 처리
    const responseLength = await redisCli.hLen("response");
    if (responseLength !== 0) {
      const responseList = await redisCli.hGetAll("response");
      let saveCount = 0;

      for (const responseId in responseList) {
        const responseObj = JSON.parse(responseList[responseId]);
        const response = new FormResponse(responseObj);

        await response.save();

        await redisCli.hDel("response", responseId);

        saveCount += 1;
        if (saveCount >= 1500) {
          break;
        }
      }

      console.log("save job done");
    }

    // 제출된 응답 수정 처리
    const responseUpdateLength = await redisCli.hLen("response_update");
    if (responseUpdateLength !== 0) {
      const responseUpdateList = await redisCli.hGetAll("response_update");

      for (const responseId in responseUpdateList) {
        const answerList = JSON.parse(responseUpdateList[responseId]);

        await FormResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList });

        await redisCli.hDel("response_update", responseId);
      }

      console.log("update job done");
    }

    // 응답 카운트 증가
    const countLength = await redisCli.hLen("count");
    if (countLength !== 0) {
      const countList = await redisCli.hGetAll("count");

      for (const formId in countList) {
        const count = Number(countList[formId]);

        await Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: count } }).exec();

        await redisCli.hDel("count", formId);
      }

      console.log("count job done");
    }

    console.log("30 seconds passed");
  });
};

export default responseSchedule;
