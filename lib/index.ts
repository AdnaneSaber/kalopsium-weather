import moment from "moment";

import "moment/locale/ko";
export const convertTimestampToDate = (
  timestamp: number,
  format: string,
  locale: string = "en"
): string => {
  moment.locale(locale);
  return moment.unix(timestamp).format(format);
};
