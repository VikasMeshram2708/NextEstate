export const formatDate = (value: string | null) => {
  if (!value) return "";
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });
  return formatter.format(new Date(value));
};
