import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDatabase } from "@/hooks/use-database";
import { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { toast } from "sonner-native";

export function InsertBalanceContent() {
  const { insert } = useDatabase();
  const [content, setContent] = useState("");
  const [amont, setAmont] = useState("");

  const getCurrentDate = (): string => {
    const date = new Date();
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const getCurrentTime = (): string => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const handleInsert = async () => {
    const response = await insert({
      type: "up",
      date: getCurrentDate(),
      time: getCurrentTime(),
      content,
      amont: parseInt(amont),
    });

    if (response.error) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
  };
  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="w-full justify-center gap-4">
        <View className="gap-2">
          <Label>Title</Label>
          <Input
            onChangeText={setContent}
            placeholder="Example : freelancing incoming"
          />
        </View>
        <View className="gap-2">
          <Label>Amont</Label>
          <Input
            onChangeText={setAmont}
            placeholder="+ 20 JOD"
            keyboardType="numeric"
          />
        </View>
        <Button onPress={handleInsert}>
          <Text className="text-white">Insert</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
