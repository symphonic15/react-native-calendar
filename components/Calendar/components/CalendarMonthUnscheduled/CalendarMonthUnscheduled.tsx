import { Text, View } from "react-native";
import { styles } from "./CalendarMonthUnscheduled.styles";

export default function CalendarMonthUnscheduled() {
  return (
    <View style={styles.calendarMonthUnscheduled}>
      <View style={styles.leftSpacing} />
      <View style={{ ...styles.info }}>
        <View>
          <Text style={styles.infoTitle}>No Maintenance Scheduled</Text>
        </View>
      </View>
    </View>
  )
}