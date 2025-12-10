const statuses = {
  in_stock: "In Stock",
  out_of_stock: "Out of Stock",
};

export default function statusFormatter(status) {
  return statuses[status] || status;
}
