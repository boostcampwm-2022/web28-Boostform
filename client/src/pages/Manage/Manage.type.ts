interface FormItems {
  _id: string;
  title: string;
  acceptResponse: boolean;
  response: number;
  createdAt: string;
  updatedAt: string;
  onBoard: boolean;
  category: string;
}

type CreateFormResponse = {
  formID: string;
};

interface SelectedForm {
  id: string;
  index: number;
}

export type { FormItems, CreateFormResponse, SelectedForm };
