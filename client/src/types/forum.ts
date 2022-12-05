type ForumCategory = "전체" | "개발 및 학습" | "취업 및 채용" | "취미 및 여가" | "기타";

type OrderBy = "latestAsc" | "responseAsc" | "responseDesc";

interface Forum {
  title: string;
  category: ForumCategory;
  orderBy: OrderBy;
  page: number;
}

export type { ForumCategory, OrderBy, Forum };
