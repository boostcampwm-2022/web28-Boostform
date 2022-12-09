import schedule from "node-schedule";
import Scheduler from "./Scheduler.js";
import { redisCli } from "../connect.js";
import FormResponse from "../Response/Response.Model.js";

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
                  // 응답지가 DB에 존재하는 경우
                  // findOneAndUpdate 진행
                  const answerList = JSON.parse(answerListString);
                  await FormResponse.findOneAndUpdate(
                    { _id: responseId },
                    { answer_list: answerList.answer_list }
                  ).exec();

                  if (
                    answerListString ===
                    (await redisCli.hGet("response_update", responseId))
                  ) {
                    // 해당 responseId로 새로운 수정 사항이 생겼는지 확인
                    // 만약 새로운 수정 사항이 없다면 redis에서 삭제
                    // 만약 새로운 수정 사항이 있다면 다음 작업에서 처리하도록 남겨둠
                    await redisCli.hDel("response_update", responseId);
                  }
                } else {
                  // 응답지가 아직 DB에 존재하지 않는 경우
                  // findOneAndUpdate 메소드를 적용할 수 없으므로
                  // 이번 작업에서는 처리하지 않고, 다음 작업으로 미룸
                  await redisCli.hSet(
                    "response_update",
                    responseId,
                    answerListString
                  );
                }
                res(true);
              });
            });
          })
        );

        this.isWorking = false;
        console.log("update job done");
      }
    });
  }
}

export default ResponseUpdateScheduler;
