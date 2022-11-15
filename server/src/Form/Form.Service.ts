import Form from "./Form.Model";

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
}

export default FormService;
