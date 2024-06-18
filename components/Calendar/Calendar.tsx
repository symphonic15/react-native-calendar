import { FlatList, View } from "react-native";
import CalendarMonth from "./components/CalendarMonth";
import { styles } from "./Calendar.styles";
import { Action, ChallengeData } from "@/app/models/ChallengeData";
import { useState } from "react";
import DateDetails from "../DateDetails";

interface CalendarProps {
  data: ChallengeData | null;
  setActionName: (
    actionId: string,
    month: number,
    year: number,
    name: string
  ) => void;
}

export default function Calendar({ data, setActionName }: Readonly<CalendarProps>) {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const isActionSelected = selectedAction && selectedMonth && selectedYear;

  const handleClickDate = (action: Action, month: number, year: number) => {
    setSelectedAction(action);
    setSelectedMonth(month);
    setSelectedYear(year);
  }

  const handleSubmit = (name: string) => {
    if (isActionSelected) setActionName(selectedAction?.id, selectedMonth, selectedYear, name);
    cleanSelectedAction();
  }

  const cleanSelectedAction = () => {
    setSelectedAction(null);
    setSelectedMonth(null);
    setSelectedYear(null);
  }

  if (!data) return;

  if (isActionSelected) return <DateDetails action={selectedAction} month={selectedMonth} year={selectedYear} customer={data.customer} onSubmit={handleSubmit} />

  return (
    <FlatList
      data={data.calendar}
      renderItem={({ item, index }) => (
        <>
          <CalendarMonth key={`month-${item.month}-${item.year}`} customer={data.customer} monthValues={item} onClickDate={handleClickDate} />
          {index === data.calendar.length - 1 && <View style={styles.bottomSeparator} />}
        </>
      )}
      style={styles.calendar}
    />
  );
}