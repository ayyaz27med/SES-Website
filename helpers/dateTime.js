import moment from "moment";

export const formatDate = (
  dateValue,
  format = "DD-MM-YYYY",
  dateValueFormat = "DD-MM-YYYY hh:mm A"
) => {
  return moment(dateValue, dateValueFormat).format(format);
};
