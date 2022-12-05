export interface FormSortQuery {
  orderBy?: "latestAsc" | "responseAsc" | "responseDesc";
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
