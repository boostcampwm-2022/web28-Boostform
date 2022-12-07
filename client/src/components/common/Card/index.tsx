import React from "react";
import * as S from "./style";

function Container({ children }: { children: React.ReactNode }) {
  return <S.divFormList>{children}</S.divFormList>;
}

function Item({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <S.divFormItem>
      <S.h3ItemTitle>{title}</S.h3ItemTitle>
      {children}
    </S.divFormItem>
  );
}

function ItemText({ children }: { children: React.ReactNode }) {
  return <S.spanItem>{children}</S.spanItem>;
}

function ButtonWrapper({ children }: { children: React.ReactNode }) {
  return <S.divItemButtonWrapper>{children}</S.divItemButtonWrapper>;
}

const Card = Object.assign(Container, { ItemText, Item, ButtonWrapper });

export default Card;

// <S.divFormList>
// {data?.map(({ formId, title, category: formCategory, responseCount }) => (
//   <S.divFormItem key={formId}>
//     <S.h3ItemTitle>{title}</S.h3ItemTitle>
//     <div>
//       <S.spanItemDate>카테고리: {formCategory}</S.spanItemDate>
//     </div>
//     <div>
//       <S.spanItemDate>응답 수: {responseCount}</S.spanItemDate>
//     </div>
//     <S.divItemButtonWrapper>
//       <Button
//         type="button"
//         onClick={() => navigate(`/forms/${formId}/view`)}
//         backgroundColor={theme.colors.blue3}
//         color={theme.colors.white}
//         custom="margin-right: 8px;"
//       >
//         설문조사 참여하기
//       </Button>
//       <Button
//         type="button"
//         onClick={() => navigate(`/forms/${formId}/result`)}
//         border={theme.colors.blue3}
//         backgroundColor={theme.colors.white}
//         color={theme.colors.blue3}
//       >
//         설문조사 결과보기
//       </Button>
//     </S.divItemButtonWrapper>
//   </S.divFormItem>
// ))}
// </S.divFormList>
