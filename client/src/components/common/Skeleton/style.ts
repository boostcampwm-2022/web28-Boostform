import styled, { css } from "styled-components";
import { SkeletonType } from "./type";

const getSkeletonTypeCss = (type: SkeletonType) => {
  switch (type) {
    case "text":
      return css`
        width: 100%;
        height: 12px;
        margin: 10px 0;
      `;

    case "title":
      return css`
        width: 50%;
        height: 20px;
        margin-bottom: 15px;
        margin-top: 10px;
      `;

    case "formTitle":
      return css`
        width: 33%;
        height: 27px;
        padding: 5px 0;
        margin: 10px 0 20px;
      `;

    case "formCategoryBox":
      return css`
        width: 150px;
        height: 38px;
      `;

    case "formQuestionTitleEdit":
      return css`
        width: 33%;
        height: 16px;
        margin: 30px 0 20px;
      `;

    case "formQuestionTitle":
      return css`
        width: 33%;
        height: 16px;
        margin-bottom: 20px;
      `;

    case "button":
      return css`
        width: 55px;
        height: 30px;
      `;

    default:
      return css``;
  }
};

const Container = styled.div`
  margin: 20px auto;
  padding: 10px 15px;
  background-color: #f2f2f2;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

const Element = styled.div<{ type: SkeletonType }>`
  background-color: #ddd;
  border-radius: 3px;

  ${({ type }) => getSkeletonTypeCss(type)}
`;

const ShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 2.5s infinite;

  @keyframes loading {
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(150%);
    }
  }
`;

const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
`;

export { Container, Element, ShimmerWrapper, Shimmer };
