export function timestampToLocale(timestamp) {
  if (!timestamp) return "NA";
  return new Date(timestamp).toLocaleString();
}
