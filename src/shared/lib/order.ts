export function createOrderString(field: string, order: "asc" | "desc") {
  return `${field}:${order}`;
}
