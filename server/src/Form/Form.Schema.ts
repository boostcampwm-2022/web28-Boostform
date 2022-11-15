import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question_id: {
    type: Number,
  },
  page: {
    type: Number,
  },
  title: {
    type: String,
  },
  option: {
    type: [String],
  },
  essential: {
    type: Boolean,
  },
  etc_added: {
    type: Boolean,
  },
});

const FormSchema = new mongoose.Schema({
  user_name: {
    type: Number,
  },
  title: {
    type: String,
    default: "제목 없음",
  },
  category: {
    type: String,
  },
  question: {
    type: [QuestionSchema],
  },
  accept_response: {
    type: Boolean,
    default: true,
  },
  on_board: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export { QuestionSchema, FormSchema };
