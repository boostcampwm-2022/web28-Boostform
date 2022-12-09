import React from "react";
import theme from "styles/theme";
import Container from "./style";

function Notice({
  text,
  color = theme.colors.blue3,
  backgroundColor = theme.colors.white,
  border = theme.colors.blue3,
}: {
  text: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
}) {
  return (
    <Container color={color} backgroundColor={backgroundColor} border={border}>
      {text}
    </Container>
  );
}

Notice.defaultProps = {
  color: theme.colors.blue3,
  backgroundColor: theme.colors.white,
  border: theme.colors.blue3,
};

export default Notice;
