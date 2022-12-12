import React from "react";
import * as S from "./style";
import SkeletonType from "./type";

function SkeletonContainer({ children, custom = "" }: { children: React.ReactNode; custom?: string }) {
  return <S.Container custom={custom}>{children}</S.Container>;
}
SkeletonContainer.defaultProps = {
  custom: "",
};

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
