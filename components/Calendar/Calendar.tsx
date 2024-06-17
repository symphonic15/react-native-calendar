import { FlatList, View } from "react-native";
import CalendarMonth from "./components/CalendarMonth";
import { styles } from "./Calendar.styles";
import { ChallengeData } from "@/app/models/ChallengeData";

interface CalendarProps {
  data: ChallengeData | null;
}

export default function Calendar({ data }: Readonly<CalendarProps>) {
  if (!data) return;

  return (
    <FlatList
      data={data.calendar}
      renderItem={({ item, index }) => (
        <>
          <CalendarMonth key={`month-${item.month}-${item.year}`} customer={data.customer} monthValues={item} />
          {index === data.calendar.length - 1 && <View style={styles.bottomSeparator} />}
        </>
      )}
      style={styles.calendar}
    />
  );
}