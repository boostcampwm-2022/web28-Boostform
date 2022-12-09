import styled, { css } from "styled-components";

const getSkeletonTypeCss = (type: string) => {
  switch (type) {
    case "text":
      return css`
        width: 100%;
        height: 12px;
      `;

    case "title":
      return css`
        width: 50%;
        height: 20px;
        margin-bottom: 15px;
      `;

    default:
      return css``;
  }
};

const Container = styled.div<{ custom: string }>`
  margin: 20px auto;
  padding: 10px 15px;
  background-color: #f2f2f2;
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  ${({ custom }) => custom}
`;

const Element = styled.div<{ type: string }>`
  background-color: #ddd;
  margin: 10px 0;
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
