import { Action, Calendar } from "@/app/models/ChallengeData";

export function sortByYearAndMonth(data: Calendar[]) {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });

  return sortedData;
}

export function sortByDayAndHour(data: Action[]) {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.scheduledDate && b.scheduledDate) {
      const dateA = new Date(
        `${a.scheduledDate.split("T")[0]}T${convertTo24Hour(
          a.arrivalStartWindow
        )}:00Z`
      ).getTime();
      const dateB = new Date(
        `${b.scheduledDate.split("T")[0]}T${convertTo24Hour(
          b.arrivalStartWindow
        )}:00Z`
      ).getTime();

      return dateA - dateB;
    }
    if (a.scheduledDate) return -1;
    if (b.scheduledDate) return 1;
    return 0;
  });

  return sortedData;
}

function convertTo24Hour(time?: string): string {
  if (!time) return "00:00";
  const [hour, minute, period] = time.split(/[:\s]/);
  let h = parseInt(hour);
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${minute}`;
}
