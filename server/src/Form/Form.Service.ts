import Form from "./Form.Model";
import UpdateFormRequestBody from "./Form.Interface";
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
