import styled from "styled-components";

type BackgroundColor = "white" | "blue";

const getBackgroundColor = (backgroundColor: BackgroundColor) => {
  if (backgroundColor === "white") return "#ffffff";
  if (backgroundColor === "blue") return "#3c64b1";
  return "#ffffff";
};

const Main = styled.main<{ backgroundColor: BackgroundColor }>`
  background-color: ${({ backgroundColor }) => getBackgroundColor(backgroundColor)};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export default Main;
