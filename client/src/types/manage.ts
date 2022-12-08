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

interface FormList {
  form: FormItems[];
  lastId: string;
}

export type { FormItems, FormList };
