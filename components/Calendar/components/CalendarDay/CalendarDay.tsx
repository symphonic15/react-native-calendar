import { Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon, MapPinIcon } from "react-native-heroicons/solid";
import { styles } from "./CalendarDay.styles";
import { Action, Customer } from "@/app/models/ChallengeData";
import { ThemedText } from "@/components/ThemedText";

const StatusIcons = {
  completed: CheckCircleIcon,
  scheduled: ClockIcon,
}

interface CalendarDayProps {
  customerStreet: string;
  action: Action;
}

export default function CalendarDay({ customerStreet, action }: Readonly<CalendarDayProps>) {
  const { arrivalStartWindow, arrivalEndWindow, name, scheduledDate, status, vendor } = action;

  const date = scheduledDate ? new Date(scheduledDate) : undefined;
  const dateText = date ? date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() : 'TBD';
  const dateNumber = date ? date.getDate() : undefined;
  const statusText = status === 'Unscheduled' ? 'Schedule date & time TBD' : status;
  const scheduledTime = arrivalStartWindow && arrivalEndWindow ? `${arrivalStartWindow} - ${arrivalEndWindow}` : undefined;

  const backgroundStyle = styles[status.toLowerCase()];
  const StatusIcon = StatusIcons[status.toLowerCase()];

  return (
    <View style={styles.calendarDay}>
      <View style={styles.date}>
        <ThemedText lightColor="#666666" type="captionSemiBold">{dateText}</ThemedText>
        <ThemedText type="subtitle">{dateNumber}</ThemedText>
        {StatusIcon && <StatusIcon size={16} color="#00b47d" />}
      </View>
      <View style={{ ...styles.info, ...backgroundStyle }}>
        <View>
          <ThemedText type="defaultSemiBold" style={styles.infoName}>{name}</ThemedText>
          {vendor && (
            <>
              <Text style={styles.infoVendorName}>{vendor.vendorName}</Text>
              <Text style={styles.infoVendorPhoneNumber}>{vendor.phoneNumber}</Text>
            </>
          )}
        </View>
        <View>
          <Text style={styles.infoCustomer}><MapPinIcon size={12} color="#fff" /> {customerStreet}</Text>
          <Text style={styles.infoCustomer}>{statusText} {scheduledTime}</Text>
        </View>
      </View>
    </View>
  )
}