import styled from "styled-components";
import theme from "styles/theme";

type BackgroundColor = "white" | "blue";

const getBackgroundColor = (backgroundColor: BackgroundColor) => {
  if (backgroundColor === "white") return theme.colors.white;
  if (backgroundColor === "blue") return theme.colors.blue3;
  return "#ffffff";
};

const Main = styled.main<{ backgroundColor: BackgroundColor }>`
  background-color: ${({ backgroundColor }) => getBackgroundColor(backgroundColor)};
  min-height: calc(100vh - 60px);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export default Main;
