import { format } from "date-fns";

export const getFormatDate = (date: string) => {
  try {
    const formatDate = format(new Date(date), "yyyy-MM-dd");
    return formatDate;
  } catch (e) {
    const a = new Date(date);
    return `${a.getFullYear()}-${a.getMonth() - 1}-${a.getDate()}`;
  }
};
