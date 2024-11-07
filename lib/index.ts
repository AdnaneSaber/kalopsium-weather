import moment from "moment";

export const convertTimestampToDate = (
  timestamp: number,
  format: string
): string => {
  return moment.unix(timestamp).format(format);
};
