import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Form from "../../Form/Form.Model";
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

const option1 = ["dog", "cat", "rabbit"];
const option2 = ["pizza", "chicken", "kimbap", "bread"];

async function createFormMockData(id: number) {
  const mockData = new Form({
    user_id: id,
    title: "Form Mock Data",
    description: "테스트를 위한 Mock Data",
    category: "기타",
    question_list: [
      {
        question_id: 1,
        type: "checkbox",
        title: "좋아하는 동물",
        option: option1,
        essential: false,
        etc_added: false,
      },
      {
        question_id: 2,
        type: "multiple",
        title: "좋아하는 음식",
        option: option2,
        essential: true,
        etc_added: true,
      },
      {
        question_id: 3,
        type: "paragraph",
        title: "의견을 남겨주세요",
        essential: false,
      },
    ],
  });
  await mockData.save();
}

async function createResponseMockData(
  count: number,
  formId: string,
  answer1: number,
  answer2: Array<number>,
  answer3: string
) {
  const answer2List = answer2.map((val) => option2[val - 1]);
  for (let i = 0; i < count; i += 1) {
    const mockData = new FormResponse({
      form_id: formId,
      answer_list: [
        {
          question_id: 1,
          answer: option1[answer1 - 1],
        },
        {
          question_id: 2,
          answer: answer2List,
        },
        {
          question_id: 3,
          answer: answer3,
        },
      ],
    });
    mockData.save();
  }
}

// 설문지 생성
// (async () => {
//   try {
//     await createFormMockData(4);
//     console.log("created successfully");
//   } catch (err) {
//     console.log(err);
//   }
// })();

// 응답 생성
// (async () => {
//   try {
//     await createResponseMockData(3, "637e2d988defe2cc0404ff2c", 3, [2, 3, 4], "의견3");
//     console.log("created successfully");
//   } catch (err) {
//     console.log(err);
//   }
// })();
