export const getColorByClientLevel = (level: number) => {
  if (level < 10) return "amber";
  if (level < 20) return "green";
  if (level < 30) return "blue";
  if (level < 40) return "teal";
  if (level < 50) return "pink";

  return "violet";
};
