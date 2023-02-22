export const formatDate = (day: any) => {
  const today = new Date();
  let date = new Date();
  let dayOfWeek = date.getDay();
  let todayValue;

  switch(day) {
    case 'All':
      date.setDate(date.getDate());
      dayOfWeek = date.getDay();
      todayValue = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      break;
    case "Today":
      todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
      break;
    case "Tomorrow":
      date.setDate(date.getDate() + 1);
      dayOfWeek = date.getDay();
      todayValue = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      break;
    case "Completed":
      date.setDate(date.getDate() - 1);
      dayOfWeek = date.getDay();
      todayValue = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      break;
    case "Next7Days":
      date.setDate(date.getDate() + 7);
      dayOfWeek = date.getDay();
      todayValue = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      break;
    default:
      return;
  }

  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  return todayValue + "/" + dayOfWeekStr;
};

export const formatDateforFirebase = (date: any) => {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + dayOfWeekStr;
};
