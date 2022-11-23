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

  static async updateForm(formId: string, body: UpdateFormRequestBody) {
    const questionList = body.questionList.map((q: QuestionInRequestBody) => {
      return {
        question_id: q.questionId,
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
      description: body.description,
      category: body.category,
      question_list: questionList,
      accept_response: body.acceptResponse,
      on_board: body.onBoard,
      login_required: body.loginRequired,
      response_modifiable: body.responseModifiable,
    };

    await Form.findOneAndUpdate({ _id: formId }, updated);
  }

  static async deleteForm(formId: string) {
    await Form.deleteOne({ _id: formId });
  }

  static async getForm(formId: string): Promise<any> {
    const form = await Form.findOne({ form_id: formId });

    return form;
  }

  static getQuestionListForResponse(rawQuestion: Array<QuestionInDB>) {
    const questionList = rawQuestion.map((question) => {
      return {
        questionId: question.question_id,
        page: question.page,
        type: question.type,
        essential: question.essential,
        etcAdded: question.etc_added,
        title: question.title,
        option: question.option,
      };
    });
    return questionList;
  }
}

export default FormService;
