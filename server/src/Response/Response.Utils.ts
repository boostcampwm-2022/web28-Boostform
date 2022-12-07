/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import schedule from "node-schedule";
import { redisCli } from "../app";
import FormResponse from "./Response.Model";
import Form from "../Form/Form.Model";

const deleteFromRedis = (key: string, Id: string) => {
  return new Promise((res, rej) => {
    res(redisCli.hDel(key, Id));
  });
};

const responseSchedule = () => {
  schedule.scheduleJob("*/30 * * * * *", async () => {
    // 제출된 응답 처리
    const responseLength = await redisCli.hLen("response");
    if (responseLength !== 0) {
      const responseList = await redisCli.hGetAll("response");

      const deletePromises = Object.keys(responseList).map((responseId) => deleteFromRedis("response", responseId));
      await Promise.all(deletePromises);

      const savePromises = Object.keys(responseList).map((responseId) => {
        return new Promise((res, rej) => {
          const responseObj = JSON.parse(responseList[responseId]);
          const response = new FormResponse(responseObj);

          res(response.save());
        });
      });
      await Promise.all(savePromises);

      console.log("save job done");
    }

    // 응답 카운트 증가
    const countLength = await redisCli.hLen("count");
    if (countLength !== 0) {
      const countList = await redisCli.hGetAll("count");

      const deletePromises = Object.keys(countList).map((formId) => deleteFromRedis("count", formId));
      await Promise.all(deletePromises);

      const updatePromises = Object.keys(countList).map((formId) => {
        return new Promise((res, rej) => {
          const count = Number(countList[formId]);

          res(Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: count } }).exec());
        });
      });
      await Promise.all(updatePromises);

      console.log("count job done");
    }

    // 제출된 응답 수정 처리
    const responseUpdateLength = await redisCli.hLen("response_update");
    if (responseUpdateLength !== 0) {
      const responseUpdateList = await redisCli.hGetAll("response_update");

      const deletePromises = Object.keys(responseUpdateList).map((responseId) =>
        deleteFromRedis("response_update", responseId)
      );
      await Promise.all(deletePromises);

      for (const responseId in responseUpdateList) {
        const answerList = JSON.parse(responseUpdateList[responseId]);

        await FormResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList });

        await redisCli.hDel("response_update", responseId);
      }

      console.log("update job done");
    }

    console.log("30 seconds passed");
  });
};

export default responseSchedule;
