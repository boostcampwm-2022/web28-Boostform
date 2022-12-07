/* eslint-disable no-async-promise-executor */
import schedule from "node-schedule";
import Scheduler from "./Scheduler";
import { redisCli } from "../../app";
import FormResponse from "../Response.Model";

class ResponseUpdateScheduler extends Scheduler {
  static isWorking = false;

  static init() {
    schedule.scheduleJob("*/30 * * * * *", async () => {
      const responseUpdateListLength = await redisCli.hLen("response_update");
      if (!this.isWorking && responseUpdateListLength) {
        this.isWorking = true;

        const responseUpdateList = await redisCli.hGetAll("response_update");

        await Promise.all(
          Object.keys(responseUpdateList).map((responseId) => {
            return new Promise((res, rej) => {
              const answerListString = responseUpdateList[responseId];

              FormResponse.exists({ _id: responseId }).then(async (result) => {
                if (result) {
                  const answerList = JSON.parse(answerListString);
                  await FormResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList }).exec();

                  if (answerListString === (await redisCli.hGet("response_update", responseId))) {
                    await redisCli.hDel("response_update", responseId);
                  }
                } else {
                  await redisCli.hSet("response_update", responseId, answerListString);
                }
                res(true);
              });
            });
          })
        );

        // const promises = Object.keys(responseUpdateList).map((responseId) => {
        //   return new Promise(async (res, rej) => {
        //     const answerListString = responseUpdateList[responseId];
        //     const isExist = await FormResponse.exists({ _id: responseId }).exec();

        //     if (isExist) {
        //       const answerList = JSON.parse(answerListString);
        //       await FormResponse.findOneAndUpdate({ _id: responseId }, { answer_list: answerList }).exec();
        //     } else if (!(await redisCli.hExists("response_update", responseId))) {
        //       await redisCli.hSet("reponse_update", responseId, answerListString);
        //     }

        //     await redisCli.hDel("reponse_update", responseId);
        //     res("success");
        //   });
        // });

        // await Promise.all(promises).catch((err) => console.log(err));

        this.isWorking = false;
        console.log("update job done");
      }
    });
  }
}

export default ResponseUpdateScheduler;
