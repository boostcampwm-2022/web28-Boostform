import { IconItem } from "components/molecules/Dropdown/IconDropdown/type";

const CATEGORY_LIST = ["개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

const QUESTION_TYPE_LIST: IconItem[] = [
  { text: "단수응답", icon: "checkbox", value: "checkbox" },
  { text: "복수응답", icon: "multiple", value: "multiple" },
  { text: "주관식", icon: "paragraph", value: "paragraph" },
];

const CATEGORY_FORUM_LIST = ["전체", "개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

export { CATEGORY_LIST, QUESTION_TYPE_LIST, CATEGORY_FORUM_LIST };
