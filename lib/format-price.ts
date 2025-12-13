export function formatPrice(value: number | string | undefined) {
  if (!value) return "₹0";
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "₹0";
  return `${num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  })}`;
}
