import { Calendar, ChallengeData } from "@/app/models/ChallengeData";
import { sortByDayAndHour, sortByYearAndMonth } from "@/utils/sortDates";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseChallengeDataResult {
  challengeData: ChallengeData | null;
  setActionName: (
    actionId: string,
    month: number,
    year: number,
    name: string
  ) => void;
}

export default function useChallengeData(): Readonly<UseChallengeDataResult> {
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(
    null
  );

  useEffect(() => {
    fetchCalendar().then((data) => {
      setChallengeData({
        ...data,
        calendar: sortCalendar(data.calendar),
      });
    });
  }, []);

  const fetchCalendar = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge"
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const setActionName = (
    actionId: string,
    month: number,
    year: number,
    name: string
  ) => {
    if (!challengeData) return;

    setChallengeData({
      ...challengeData,
      calendar: challengeData.calendar.map((calendarItem) => {
        if (calendarItem.month === month && calendarItem.year === year) {
          return {
            ...calendarItem,
            actions: calendarItem.actions.map((action) => {
              if (action.id === actionId) {
                return {
                  ...action,
                  name,
                };
              }
              return action;
            }),
          };
        }
        return calendarItem;
      }),
    });
  };

  const sortCalendar = (data: Calendar[]) => {
    let sortedCalendar = sortByYearAndMonth(data);

    sortedCalendar.forEach((month) => {
      month.actions = sortByDayAndHour(month.actions);
    });

    return sortedCalendar;
  };

  return { challengeData, setActionName };
}
