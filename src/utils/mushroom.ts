/*
 * Wide at the bottom when factor is big,
 * gets smaller the higher it is
 */
export const radius = (
  minimum: number,
  index: number,
  factor: number,
  prng: any,
) => {
  return minimum + (1 - index) * (1 + prng.next()) * factor;
};

/*
 * Minimal gradient from botton to top based on mixing
 * color1 with color2 and using the index on color2
 */
export const color = (
  color1: [number, number, number],
  color2: [number, number, number],
  index: number,
  factor: number,
  prng: any,
) => {
  const noise = prng.next() * factor;
  return [
    color1[0] + index * color2[0] + noise,
    color1[1] + index * color2[1] + noise,
    color1[2] + index * color2[2] + noise,
  ];
};
