const colors = {
  white: "#ffffff",
  black: "#000000",
  grey0: "#f8f9fa",
  grey1: "#eaeaea",
  grey2: "#dfdfdf",
  grey3: "#c8c8c8",
  grey4: "#afafaf",
  grey5: "#828282",
  grey6: "#666666",
  grey7: "#5f6368",
  grey8: "#555555",
  grey9: "#444444",
  blue1: "#1a73e8",
  blue2: "#0066cc",
  blue3: "#3c64b1",
  blue4: "#3e57cb",
  blue5: "#284b8f",
  red1: "#d93025",
};

const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const theme = {
  colors,
  common,
};

export default theme;
