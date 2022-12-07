interface SelectedForm {
  id: string;
  index: number;
}

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

export type { SelectedForm, FormItems };
