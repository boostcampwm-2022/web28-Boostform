// 출처: https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
const mix = (a: number, b: number, v: number) => {
  return (1 - v) * a + v * b;
};

// 출처: https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
const HSVtoRGB = (H: number, S: number, V: number) => {
  const V2 = V * (1 - S);

  let r;
  if ((H >= 0 && H <= 60) || (H >= 300 && H <= 360)) r = V;
  else if (H >= 120 && H <= 240) r = V2;
  else if (H >= 60 && H <= 120) r = mix(V, V2, (H - 60) / 60);
  else if (H >= 240 && H <= 300) r = mix(V2, V, (H - 240) / 60);
  else r = 0;

  let g;
  if (H >= 60 && H <= 180) g = V;
  else if (H >= 240 && H <= 360) g = V2;
  else if (H >= 0 && H <= 60) g = mix(V2, V, H / 60);
  else if (H >= 180 && H <= 240) g = mix(V, V2, (H - 180) / 60);
  else g = 0;

  let b;
  if (H >= 0 && H <= 120) b = V2;
  else if (H >= 180 && H <= 300) b = V;
  else if (H >= 120 && H <= 180) b = mix(V2, V, (H - 120) / 60);
  else if (H >= 300 && H <= 360) b = mix(V, V2, (H - 300) / 60);
  else b = 0;

  return {
    R: Math.round(r * 255),
    G: Math.round(g * 255),
    B: Math.round(b * 255),
  };
};

const randomHSVGenerator = () => {
  const H = Math.floor(Math.random() * 360);
  const S = (Math.floor(Math.random() * 40) + 60) / 100;
  const V = (Math.floor(Math.random() * 30) + 70) / 100;
  return { H, S, V };
};

const randomRGBGenerator = () => {
  const { H, S, V } = randomHSVGenerator();
  const { R, G, B } = HSVtoRGB(H, S, V);
  return {
    borderColor: `rgba(${R}, ${G}, ${B}, 0.6)`,
    backgroundColor: `rgba(${R}, ${G}, ${B}, 0.2)`,
  };
};

export default randomRGBGenerator;
