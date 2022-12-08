import mongoose from "mongoose";
import * as dotenv from "dotenv";
import FormResponse from "../../Response/Response.Model";

dotenv.config();

function connectDB() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.a7vmgdw.mongodb.net/database0?`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mongoDB is connected...");
      }
    }
  );
}

connectDB();

(async () => {
  try {
    await FormResponse.deleteMany({ form_id: "6390546972ed73337b4936ec" });
    console.log("delete success");
  } catch (err) {
    console.log(err);
  }
})();
