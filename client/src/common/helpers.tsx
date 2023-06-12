export const createUrlString = (data: any): string => {
  return new URLSearchParams(data).toString();
};
export const round = (numb: number): number => {
  return Math.round((numb + Number.EPSILON) * 100) / 100;
};
