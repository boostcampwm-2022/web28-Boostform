import schedule from "node-schedule";

class Scheduler {
  static isWorking = false;

  static init() {
    schedule.scheduleJob("*/30 * * * * *", async () => {
      console.log("30 seconds passed");
    });
  }
}

export default Scheduler;
