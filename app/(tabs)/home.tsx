import { MainDropDown } from "@/components/elements/main-dropdown";
import BalanceSkeleton from "@/components/skeletons/balance-skeleton";
import RecentSkeletonItem from "@/components/skeletons/recent-skeleton-item";
import { Button } from "@/components/ui/button";
import { useDatabase } from "@/hooks/use-database";
import { router } from "expo-router";
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function home() {
  const { get } = useDatabase();
  const [recents, setRecents] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [balanceLoading, setBalanceLoading] = useState<boolean>(true);
  const [recentLoading, setRecentLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const recentsResponse = await get({ table: "Trans" });
    const balanceResponse = await get({ table: "balance" });

    if (recentsResponse.error) {
      toast.error("Recent API " + recentsResponse.message);
      console.log("Recent API error", recentsResponse.error);
      return;
    }

    if (balanceResponse.error) {
      toast.error("Balance API " + balanceResponse.message);
      console.log("Balance API " + balanceResponse.error);
      return;
    }

    setRecents(recentsResponse.data);
    setBalance(balanceResponse.data);
    setRecentLoading(false);
    setBalanceLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {balanceLoading ? (
              <BalanceSkeleton />
            ) : (
              <Text className=" text-2xl text-blue-600">
                {balance?.total || 0} JOD
              </Text>
            )}
          </View>
        </View>
      </View>
      <View className="mt-4 gap-y-3">
        {recentLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <RecentSkeletonItem key={index} />
            ))}
          </>
        ) : (
          <>
            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="text-lg font-med">Recents transforms</Text>
              <Button
                variant={"link"}
                onPress={() => router.push("/(tabs)/recent")}
              >
                <Text className="text-blue-600 font-bold">See all</Text>
              </Button>
            </View>

            {recents.slice(-4).map((rec: any, key: any) => {
              // If rec.value is a Reanimated shared value
              const type = rec?.value?.type;
              const content = rec?.value?.content;
              const amount = rec?.value?.amont;
              const date = rec?.value?.date;
              const time = rec?.value?.time;

              if (type === "up") {
                return (
                  <View
                    key={key}
                    className="p-4 bg-green-600/10 rounded-3xl flex flex-row items-center justify-between"
                  >
                    <View className="flex flex-row items-center gap-x-4">
                      <View className="bg-white p-2 rounded-full">
                        <BanknoteArrowUp
                          size={30}
                          color={"green"}
                          strokeWidth={1.5}
                        />
                      </View>
                      <View>
                        <Text className="font-med text-lg text-green-600">
                          {content}
                        </Text>
                        <Text className="font-med text-sm text-green-600/70">
                          {date} | {time}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-lg text-green-600">
                      + {amount} JOD
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={key}
                    className="p-4 bg-red-600/10 rounded-3xl gap-y-10 flex flex-row items-center justify-between"
                  >
                    <View className="flex flex-row items-center gap-x-4">
                      <View className="bg-white p-2 rounded-full">
                        <BanknoteArrowDown
                          size={30}
                          color={"red"}
                          strokeWidth={1.5}
                        />
                      </View>
                      <View>
                        <Text className="font-med text-lg text-red-600">
                          {content}
                        </Text>
                        <Text className="font-med text-sm text-red-600/70">
                          10/2/2026 | 12:14 PM
                        </Text>
                      </View>
                    </View>
                    <Text className="text-lg text-red-600">- 40 JOD</Text>
                  </View>
                );
              }
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
}
