import ResponseSaveScheduler from "./Scheduler/ResponseSaveScheduler.js";
import CountIncreaseScheduler from "./Scheduler/CountIncreaseScheduler.js";
import ResponseUpdateScheduler from "./Scheduler/ResponseUpdateScheduler.js";

try {
  ResponseSaveScheduler.init();
  CountIncreaseScheduler.init();
  ResponseUpdateScheduler.init();
} catch (err) {
  console.log(err);
}
