import Form from "./Form.Model";
import { UpdateFormRequestBody } from "./Form.Interface";

class FormService {
  static createNewForm(userID: number) {
    const newForm = new Form({ user_id: userID });
    newForm.save();

    return newForm.id;
  }

  static async getFormList(userID: number, page: number) {
    const allFormList = await Form.find({ user_id: userID }).sort({ created_at: -1 });
    return allFormList.slice((page - 1) * 5, page * 5 - 1);
  }

  static async updateFormList(formID: string, body: UpdateFormRequestBody) {
    const updated = {
      title: body.title,
      category: body.category,
      question: body.question,
      accept_response: body.acceptResponse,
      on_board: body.onBoard,
    };
    await Form.findOneAndUpdate({ id: formID }, updated);
  }

  static async deleteForm(formID: string) {
    await Form.deleteOne({ id: formID });
  }
}

export default FormService;
