// eslint-disable-next-line import/no-extraneous-dependencies
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
  const testFormId = "637e2d875d07882cfce8a076";
  const testResult = {
    formTitle: "Form Mock Data",
    totalResponseCount: 28363,
    acceptResponse: true,
    questionResultDict: {
      "1": {
        type: "checkbox",
        questionTitle: "좋아하는 동물",
        responseCount: 12389,
        answerTotal: {
          dog: 3114,
          cat: 3059,
          rabbit: 3163,
          question1: 3053,
        },
      },
      "2": {
        type: "multiple",
        questionTitle: "좋아하는 음식",
        responseCount: 12389,
        answerTotal: {
          pizza: 3114,
          chicken: 3059,
          kimbap: 3163,
          bread: 0,
          question2: 3053,
        },
      },
      "3": {
        type: "paragraph",
        questionTitle: "의견을 남겨주세요",
        responseCount: 12389,
        answerTotal: {
          answer1: 3110,
          answer2: 3059,
          answer3: 3163,
          question3: 3053,
          의견1: 4,
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
