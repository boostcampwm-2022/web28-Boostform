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
  },
  category: {
    type: String,
  },
  question: {
    type: [QuestionSchema],
  },
  accept_response: {
    type: Boolean,
  },
  on_board: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export { QuestionSchema, FormSchema };
