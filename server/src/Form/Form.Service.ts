import Form from "./Form.Model";
import { UpdateFormRequestBody } from "./Form.Interface";
import getDateString from "../Common/Utils/GetDateString";

class FormService {
  static createNewForm(userID: number) {
    const newForm = new Form({ user_id: userID });
    newForm.save();

    return newForm.id;
  }

  static async getFormList(userID: number, page: number) {
    const rawFormList = await Form.find({ user_id: userID })
      .sort({ created_at: 1 })
      .skip((page - 1) * 5)
      .limit(5);
    const formList = rawFormList.map((form) => {
      return {
        _id: form.id,
        title: form.title,
        acceptResponse: form.accept_response,
        createdAt: form.created_at.toString(),
        updatedAt: getDateString(form.updated_at),
        onBoard: form.on_board,
        category: form.category,
      };
    });
    return formList;
  }

  static async updateFormList(formID: string, body: UpdateFormRequestBody) {
    const updated = {
      title: body.title,
      category: body.category,
      question: body.question,
      accept_response: body.acceptResponse,
      on_board: body.onBoard,
    };
    await Form.findOneAndUpdate({ _id: formID }, updated);
  }

  static async deleteForm(formID: string) {
    await Form.deleteOne({ _id: formID });
  }
}

export default FormService;
