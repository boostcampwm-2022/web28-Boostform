import React from "react";
import * as S from "./style";
import { SkeletonType, SkeletonContainerProps } from "./type";

function SkeletonContainer({ children, style }: SkeletonContainerProps) {
  return <S.Container style={style}>{children}</S.Container>;
}

function Element({ type }: { type: SkeletonType }) {
  return <S.Element type={type} />;
}

function Shimmer() {
  return (
    <S.ShimmerWrapper>
      <S.Shimmer />
    </S.ShimmerWrapper>
  );
}

const Skeleton = Object.assign(SkeletonContainer, { Element, Shimmer });

export default Skeleton;
