import { MainDropDown } from "@/components/elements/main-dropdown";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function home() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-med text-2xl ">
          Hello 👋 , <Text className="text-blue-500">M3ath hijazi</Text>
        </Text>
        <MainDropDown />
      </View>
      <View className="mt-4">
        <View className="p-4 bg-blue-600/10 rounded-3xl min-h-[180px] gap-y-10">
          <View className="flex flex-row items-center gap-x-4">
            <View className="bg-white p-2 rounded-full">
              <Banknote size={50} color={"blue"} strokeWidth={1.5} />
            </View>
            <View>
              <Text className="font-med text-xl text-blue-600">
                Total Balance
              </Text>
              <Text className="font-med text-sm text-blue-600/70">
                1/2 Salary
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-end">
            <Text className=" text-2xl text-blue-600">203 JOD</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 gap-y-3">
        <View className="flex flex-row items-center justify-between mb-2">
          <Text className="text-lg font-med">Recents transforms</Text>
          <Button
            variant={"link"}
            onPress={() => router.push("/(tabs)/recent")}
          >
            <Text className="text-blue-600 font-bold">See all</Text>
          </Button>
        </View>

        {/* Incoming */}
        <View className="p-4 bg-green-600/10 rounded-3xl flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <View className="bg-white p-2 rounded-full">
              <BanknoteArrowUp size={30} color={"green"} strokeWidth={1.5} />
            </View>
            <View>
              <Text className="font-med text-lg text-green-600">
                Freelance work
              </Text>
              <Text className="font-med text-sm text-green-600/70">
                10/2/2026 | 12:14 PM
              </Text>
            </View>
          </View>
          <Text className="text-lg text-green-600"> + 40 JOD </Text>
        </View>

        {/* Outgoing */}
        <View className="p-4 bg-red-600/10 rounded-3xl gap-y-10 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <View className="bg-white p-2 rounded-full">
              <BanknoteArrowDown size={30} color={"red"} strokeWidth={1.5} />
            </View>
            <View>
              <Text className="font-med text-lg text-red-600">
                Elictrec bill
              </Text>
              <Text className="font-med text-sm text-red-600/70">
                10/2/2026 | 12:14 PM
              </Text>
            </View>
          </View>
          <Text className="text-lg text-red-600"> - 40 JOD </Text>
        </View>
        {/* Outgoing */}
        <View className="p-4 bg-red-600/10 rounded-3xl gap-y-10 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <View className="bg-white p-2 rounded-full">
              <BanknoteArrowDown size={30} color={"red"} strokeWidth={1.5} />
            </View>
            <View>
              <Text className="font-med text-lg text-red-600">
                Transform to friend
              </Text>
              <Text className="font-med text-sm text-red-600/70">
                10/2/2026 | 12:14 PM
              </Text>
            </View>
          </View>
          <Text className="text-lg text-red-600"> - 40 JOD </Text>
        </View>
        {/* Outgoing */}
        <View className="p-4 bg-red-600/10 rounded-3xl gap-y-10 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-4">
            <View className="bg-white p-2 rounded-full">
              <BanknoteArrowDown size={30} color={"red"} strokeWidth={1.5} />
            </View>
            <View>
              <Text className="font-med text-lg text-red-600">
                Buy a coffee
              </Text>
              <Text className="font-med text-sm text-red-600/70">
                10/2/2026 | 12:14 PM
              </Text>
            </View>
          </View>
          <Text className="text-lg text-red-600"> - 40 JOD </Text>
        </View>
      </View>
    </ScrollView>
  );
}
