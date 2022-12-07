/* eslint-disable no-async-promise-executor */
import schedule from "node-schedule";
import Scheduler from "./Scheduler";
import { redisCli } from "../../app";
import Form from "../../Form/Form.Model";

class CountIncreaseScheduler extends Scheduler {
  static isWorking = false;

  static init() {
    schedule.scheduleJob("*/30 * * * * *", async () => {
      const countIncreaseListLength = await redisCli.hLen("count");
      if (!this.isWorking && countIncreaseListLength) {
        this.isWorking = true;

        const countList = await redisCli.hGetAll("count");

        await Promise.all(
          Object.keys(countList).map((formId) => {
            return new Promise((res, rej) => {
              const count = Number(countList[formId]);

              Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: count } })
                .exec()
                .then(redisCli.hIncrBy("count", formId, -count))
                .then(async () => {
                  if ((await redisCli.hGet("count", formId)) === "0") {
                    await redisCli.hDel("count", formId);
                  }
                  res(true);
                });
            });
          })
        );

        // const promises = Object.keys(countList).map((formId) => {
        //   return new Promise(async (res, rej) => {
        //     const count = Number(countList[formId]);
        //     await Form.findOneAndUpdate({ _id: formId }, { $inc: { response_count: count } }).exec();
        //     await redisCli.hIncrBy("count", formId, -count);
        //     if ((await redisCli.hGet("count", formId)) === "0") {
        //       await redisCli.hDel("count", formId);
        //     }
        //     res("success");
        //   });
        // });

        // await Promise.all(promises).catch((err) => console.log(err));

        this.isWorking = false;
        console.log("count job done");
      }
    });
  }
}

export default CountIncreaseScheduler;
