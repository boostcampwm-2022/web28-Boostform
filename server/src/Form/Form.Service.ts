import Form from "./Form.Model";
import { UpdateFormRequestBody, QuestionInRequestBody, QuestionInDB } from "./Form.Interface";
import getDateString from "../Common/Utils/GetDateString";

class FormService {
  static createNewForm(userID: number) {
    const newForm = new Form({ user_id: userID });
    newForm.save();

    return newForm.id;
  }

  static async getFormList(userID: number, size: number) {
    const rawFormList = await Form.find({ user_id: userID }).sort({ createdAt: -1 }).skip(size).limit(5);
    const formList = rawFormList.map((form: any) => {
      return {
        _id: form.id,
        title: form.title,
        acceptResponse: form.accept_response,
        updatedAt: getDateString(form.updatedAt),
        onBoard: form.on_board,
        category: form.category,
        response: form.response_count,
      };
    });
    return formList;
  }

  static async updateForm(formID: string, body: UpdateFormRequestBody) {
    const question = body.question.map((q: QuestionInRequestBody) => {
      return {
        question_id: q.questionID,
        page: q.page,
        type: q.type,
        title: q.title,
        option: q.option,
        essential: q.essential,
        etc_added: q.etcAdded,
      };
    });

    const updated = {
      title: body.title,
      category: body.category,
      question,
      accept_response: body.acceptResponse,
      on_board: body.onBoard,
    };

    await Form.findOneAndUpdate({ _id: formID }, updated);
  }

  static async deleteForm(formID: string) {
    await Form.deleteOne({ _id: formID });
  }

  static async getForm(formID: string): Promise<any> {
    const form = await Form.findOne({ form_id: formID });

    return form;
  }

  static getQuestionForResponse(rawQuestion: QuestionInDB) {
    return {
      questionID: rawQuestion.question_id,
      page: rawQuestion.page,
      type: rawQuestion.type,
      title: rawQuestion.title,
      option: rawQuestion.option,
      essential: rawQuestion.essential,
      etcAdded: rawQuestion.etc_added,
    };
  }
}

export default FormService;
