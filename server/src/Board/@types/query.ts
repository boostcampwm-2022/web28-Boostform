export interface FormSortQuery {
  order?: "asc" | "desc";
  order_by?: "title" | "category" | "response_count";
}

export interface RegExOption {
  $regex: string;
  $options: string;
}

export interface FormSearchQuery {
  title?: string | RegExOption;
  category?: string;
}

export type SetToQueryFn = (query: FormSearchQuery) => FormSearchQuery;

export type EqualTypeReturnFn<T> = (arg: T) => T;
