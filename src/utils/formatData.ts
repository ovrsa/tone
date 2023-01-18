// 今日の日付を取得

export const formatDate = (day: any) => {
  const today = new Date();
  // Today
  if (day === "Today") {
    const dayOfWeek = today.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr;
    return todayValue
  } 
    // Tomorrow
    else if (day === "Tomorrow") {
    const dayOfWeek = today.getDay() + 1;
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate() + 1) + "/" + dayOfWeekStr;
    return todayValue
  } 
  // Completed
    else if (day === "Completed") {
    const dayOfWeek = today.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr;
    return todayValue
    }
  // Next 7 Days
    else {
    const dayOfWeek = today.getDay() + 7;
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate() + 7) + "/" + dayOfWeekStr;
    return todayValue
  } 
};

// formatDate();
export const formatDateforFirebase = (date: any) => {
  const today = new Date(date);
  const dayOfWeek = today.getDay();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr;
  return todayValue
}
