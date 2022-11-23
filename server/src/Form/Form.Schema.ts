import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question_id: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
    enum: ["single", "multiple", "narrative"],
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
    default: false,
  },
});

const FormSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      alias: "formId",
    },
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
    login_required: {
      type: Boolean,
      default: false,
    },
    response_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret, options) {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        // delete ret._id;
        // eslint-disable-next-line no-param-reassign
        delete ret.id;
      },
    },
  }
);

export { QuestionSchema, FormSchema };
