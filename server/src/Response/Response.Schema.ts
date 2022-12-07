import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  question_id: {
    type: Number,
  },
  answer: {
    type: [String],
  },
});

const ResponseSchema = new mongoose.Schema({
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
