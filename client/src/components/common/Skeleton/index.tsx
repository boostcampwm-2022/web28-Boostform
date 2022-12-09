import React from "react";
import * as S from "./style";

function SkeletonContainer({ children, custom = "" }: { children: React.ReactNode; custom?: string }) {
  return <S.Container custom={custom}>{children}</S.Container>;
}
SkeletonContainer.defaultProps = {
  custom: "",
};

function Element({ type }: { type: string }) {
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
