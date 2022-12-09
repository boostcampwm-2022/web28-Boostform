import schedule from "node-schedule";
import Scheduler from "./Scheduler.js";
import { redisCli } from "../connect.js";
import FormResponse from "../Response/Response.Model.js";

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

              response
                .save()
                .then(redisCli.hDel("response", responseId))
                .then(res);
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
