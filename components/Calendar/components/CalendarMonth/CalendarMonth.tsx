import { FlatList, Text, Touchable, TouchableOpacity, View } from "react-native";
import CalendarDay from "../CalendarDay";
import CalendarMonthUnscheduled from "../CalendarMonthUnscheduled";
import { styles } from "./CalendarMonth.styles";
import { Action, Calendar, Customer } from "@/app/models/ChallengeData";
import { ThemedText } from "@/components/ThemedText";

interface CalendarMonthProps {
  customer: Customer;
  monthValues: Calendar;
  onClickDate: (action: Action, month: number, year: number) => void;
}

export default function CalendarMonth({ customer, monthValues, onClickDate }: Readonly<CalendarMonthProps>) {
  const { month, year, actions } = monthValues;
  const monthTitle = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const capitalizedMonthTitle = monthTitle.charAt(0).toUpperCase() + monthTitle.slice(1);

  const handleClickDate = (action: Action) => {
    onClickDate(action, monthValues.month, monthValues.year);
  }

  return (
    <View style={styles.calendarMonth}>
      <ThemedText type="defaultSemiBold" style={styles.monthTitle}>{capitalizedMonthTitle}</ThemedText>
      {actions.length === 0 ?
        <CalendarMonthUnscheduled /> :
        <FlatList
          data={actions}
          style={styles.calendarDayItems}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClickDate(item)}>
              <CalendarDay key={`day-${item.id}`} customerStreet={customer.street} action={item} />
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );
}