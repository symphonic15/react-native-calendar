import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  calendarDay: {
    gap: 16,
    flexDirection: "row",
  },
  date: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 0,
    gap: 4,
    justifyContent: "flex-start",
    width: 24,
  },
  info: {
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flex: 1,
    flexDirection: "column",
    flexGrow: 1,
    gap: 12,
  },
  completed: { backgroundColor: "#00b47d" },
  scheduled: { backgroundColor: "#006a4b" },
  unscheduled: { backgroundColor: "#011638" },
  infoName: {
    color: "#fff",
    lineHeight: 16,
    marginBottom: 4,
  },
  infoVendorName: { color: "#fff", fontSize: 12, lineHeight: 16 },
  infoVendorPhoneNumber: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  infoCustomer: { color: "#fff", fontSize: 12, lineHeight: 16 },
});
