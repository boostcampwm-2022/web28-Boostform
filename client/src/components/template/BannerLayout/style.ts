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
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
`;

const imgBanner = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const h1Title = styled.h1`
  position: absolute;
  font-size: ${theme.fontSize.sz32};
  font-weight: 500;
  text-align: center;
  color: ${theme.colors.white};
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50px;
`;

const pDescription = styled.p`
  position: absolute;
  text-align: center;
  font-size: ${theme.fontSize.sz16};
  font-weight: 400;
  color: ${theme.colors.grey0};
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 100px;
`;

export { Main, BannerContainer, imgBanner, h1Title, pDescription };
