import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question_id: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
  },
  title: {
    type: String,
    default: "제목 없음",
  },
  option: {
    type: [String],
  },
  essential: {
    type: Boolean,
    default: false,
  },
  etc_added: {
    type: Boolean,
    default: true,
  },
});

const FormSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: "제목 없음",
    },
    description: {
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
      default: true,
    },
    on_board: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export { QuestionSchema, FormSchema };
