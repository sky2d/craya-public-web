import { format } from "date-fns";
export const formatToISODate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const formatISOToNormalDate = (isoDateString: string): string => {
  return format(new Date(isoDateString), "yyyy-MM-dd");
};
