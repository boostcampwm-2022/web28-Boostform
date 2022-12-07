/* eslint-disable no-async-promise-executor */
import schedule from "node-schedule";
import Scheduler from "./Scheduler";
import { redisCli } from "../../app";
import FormResponse from "../Response.Model";

const savePromise = (response: any, responseId: string): Promise<string> => {
  return new Promise((res, rej) => {
    response.save().then();
  });
};

const deletePromise = (responseId: string) => {
  return new Promise((res, rej) => {
    redisCli.hDel("response", responseId, () => {
      res("success");
    });
  });
};

class ResponseSaveScheduler extends Scheduler {
  static isWorking = false;

  static init() {
    schedule.scheduleJob("*/30 * * * * *", async () => {
      const responseSaveListLength = await redisCli.hLen("response");
      if (!this.isWorking && responseSaveListLength) {
        this.isWorking = true;

        const responseSaveList = await redisCli.hGetAll("response");

        await Promise.all(
          Object.keys(responseSaveList).map((responseId) => {
            return new Promise(async (res, rej) => {
              const responseObj = JSON.parse(responseSaveList[responseId]);
              const response = new FormResponse(responseObj);

              response.save().then(redisCli.hDel("response", responseId)).then(res);
            }).catch((err) => {
              console.log(err);
            });
          })
        );

        this.isWorking = false;
        console.log("save job done");
      }
    });
  }
}

export default ResponseSaveScheduler;
