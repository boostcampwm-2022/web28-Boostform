import request from "supertest";
import * as dotenv from "dotenv";
import { BeforeRecover } from "typeorm";
import app from "../app";
import connectMongoDB from "../Loader/Mongo.Loader";

dotenv.config();
beforeAll(async () => {
  await connectMongoDB();
});
describe("GET api/results/:formId", () => {
  const testFormId = "6396ab6baa73534ba0a86b12";
  const testResult = {
    formTitle: "TEST",
    totalResponseCount: 9,
    acceptResponse: true,
    questionResultDict: {
      "1": {
        type: "checkbox",
        questionTitle: "q1",
        responseCount: 9,
        answerTotal: {
          a1: 2,
          a2: 1,
          a3: 1,
          a4: 2,
          a5: 3,
        },
      },
      "2": {
        type: "multiple",
        questionTitle: "q2",
        responseCount: 9,
        answerTotal: {
          a1: 6,
          a2: 9,
          a3: 9,
          a4: 9,
          a5: 9,
        },
      },
      "3": {
        type: "paragraph",
        questionTitle: "q3",
        responseCount: 9,
        answerTotal: {
          "2": 1,
          "3": 2,
          "4": 1,
          "5": 2,
          "6": 2,
          a1: 1,
        },
      },
    },
  };
  test("유효한 설문에 대한 결과 요청", (done) => {
    request(app)
      .get(`/api/results/${testFormId}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(testResult);
        done();
      })
      .catch((err) => {
        console.error("######Error >>", err);
        done(err);
      });
  });

  test("유효하지 않은 설문에 대한 결과 요청", (done) => {
    request(app)
      .get(`/api/results/invalidForm`)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ status: 400, message: "Invalid formId" });
        done();
      })
      .catch((err) => {
        console.error("######Error >>", err);
        done(err);
      });
  });
});
