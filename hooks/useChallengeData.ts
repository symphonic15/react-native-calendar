import { Calendar, ChallengeData } from "@/app/models/ChallengeData";
import { sortByDayAndHour, sortByYearAndMonth } from "@/utils/sortDates";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useChallengeData(): ChallengeData | null {
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

  const sortCalendar = (data: Calendar[]) => {
    let sortedCalendar = sortByYearAndMonth(data);

    sortedCalendar.forEach((month) => {
      month.actions = sortByDayAndHour(month.actions);
    });

    return sortedCalendar;
  };

  return challengeData;
}
