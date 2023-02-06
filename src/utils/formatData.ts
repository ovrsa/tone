export const formatDate = (day: any) => {
  const today = new Date();
  let dayOfWeek = today.getDay();
  let todayValue;

  switch(day) {
    case "Today":
      break;
    case "Tomorrow":
      dayOfWeek += 1;
      todayValue = today.getDate() + 1;
      break;
    case "Completed":
      break;
    case "Next7Days":
      dayOfWeek += 7;
      todayValue = today.getDate() + 7;
      break;
    default:
      return;
  }

  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + todayValue + "/" + dayOfWeekStr;
  return todayValue;
};

// formatDate();
export const formatDateforFirebase = (date: any) => {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + dayOfWeekStr;
  }