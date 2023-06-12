export const round = (numb: number) => {
  return Math.round((numb + Number.EPSILON) * 100) / 100;
};
