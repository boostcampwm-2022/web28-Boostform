import { Schema } from "mongoose";
import { AnswerInterface, ResponseInterface } from "./Response.Interface";

const AnswerSchema = new Schema<AnswerInterface>({
  question_id: {
    type: Number,
  },
  answer: {
    type: [String],
  },
});

const ResponseSchema = new Schema<ResponseInterface>({
  user_id: {
    type: Number,
  },
  form_id: {
    type: String,
    index: true,
  },
  answer_list: {
    type: [AnswerSchema],
  },
});

export { AnswerSchema, ResponseSchema };
