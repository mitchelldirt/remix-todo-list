export function tasksQtyEmoji(taskQty: number) {
  console.log("taskQty", taskQty)
  if (taskQty === 0) return "🤷‍♂️";
  if (taskQty >= 1 && taskQty <= 4) return "👌";
  if (taskQty >= 5 && taskQty <= 9) return "🔥";
  if (taskQty >= 10 && taskQty <= 19) return "🚀";
  if (taskQty >= 20) return "🤯";
  return "❔";
};