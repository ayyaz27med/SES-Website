
export const formatAmount = (value) => {
  if (value === null || value === undefined || value === "") return "0";

  const num = Number(value);

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatWithCurrency = (value) => {
  return `Tzs ${formatAmount(value)}`;
};