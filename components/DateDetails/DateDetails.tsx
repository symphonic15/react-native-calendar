import { Action, Customer } from "@/app/models/ChallengeData";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

interface DateDetailsProps {
  action: Action;
  month: number;
  year: number;
  customer: Customer;
  onSubmit: (name: string) => void;
}

export default function DateDetails({ action, month, year, customer, onSubmit }: Readonly<DateDetailsProps>) {
  const [name, setName] = useState(action.name);

  const monthTitle = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const capitalizedMonthTitle = monthTitle.charAt(0).toUpperCase() + monthTitle.slice(1);

  const handleSubmit = () => onSubmit(name);

  return (
    <View style={{ display: "flex", padding: 16, gap: 16 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText type="defaultSemiBold">{capitalizedMonthTitle}</ThemedText>
        <ThemedText type="defaultSemiBold">{action.status}</ThemedText>
      </View>
      <View>
        <ThemedText type="defaultSemiBold">Service name</ThemedText>
        <TextInput value={name} onChangeText={setName} style={{ backgroundColor: "#e1e1e1", height: 32, borderStyle: "solid", borderColor: "#cfcfcf" }} />
      </View>
      {action.vendor && (
        <View>
          <ThemedText type="defaultSemiBold">Provided by</ThemedText>
          <ThemedText>{action.vendor.vendorName}</ThemedText>
          <ThemedText style={{ color: "#00b47d" }}>{action.vendor.phoneNumber}</ThemedText>
        </View>
      )}
      <View>
        <ThemedText type="defaultSemiBold">Address</ThemedText>
        <ThemedText>{customer.street}</ThemedText>
        <ThemedText>{customer.city}, {customer.state} {customer.zip}</ThemedText>
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#00b47d", borderRadius: 16, height: 40 }}>
          <Text style={{ color: Colors.dark.text, fontWeight: 500 }}>SAVE CHANGES</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}