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
