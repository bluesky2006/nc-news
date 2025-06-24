export function convertDate(oldDate) {
  const date = new Date(oldDate);
  const formatted = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatted;
}
