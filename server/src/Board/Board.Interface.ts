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

export type SetQueryFn = (query: FormSearchQuery) => FormSearchQuery;

export type TypeToTypeFn<T> = (arg: T) => T;
