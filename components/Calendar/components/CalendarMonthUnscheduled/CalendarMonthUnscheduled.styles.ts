import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  calendarMonthUnscheduled: {
    display: "flex",
    gap: 16,
    flexDirection: "row",
  },
  leftSpacing: {
    flexGrow: 0,
    gap: 4,
    width: 24,
  },
  info: {
    backgroundColor: "#848fa5",
    borderRadius: 4,
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    flexGrow: 1,
  },
  infoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
