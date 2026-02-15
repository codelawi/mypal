import RecentSkeletonItem from "@/components/skeletons/recent-skeleton-item";
import { useDatabase } from "@/hooks/use-database";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function recent() {
  const { get } = useDatabase();
  const [loading, setLoading] = useState(true);
  const [recents, setRecents] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await get({
        table: "Trans",
      });
      setRecents(response.data);
    } catch (e) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const renderLoadingSkeleton = () => {
    return (
      <View>
        {[...Array(12)].map((_, index) => (
          <RecentSkeletonItem key={index} />
        ))}
      </View>
    );
  };
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="mb-6">
        <Text className="font-reg text-xl">Recnet transforms</Text>
      </View>
      {loading ? (
        renderLoadingSkeleton()
      ) : (
        <View className="gap-y-4">
          {recents.map((rec: any, key: any) => {
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
                  <Text className="text-lg text-green-600">+ {amount} JOD</Text>
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
        </View>
      )}
    </ScrollView>
  );
}
