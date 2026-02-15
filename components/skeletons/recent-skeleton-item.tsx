import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";

export default function RecentSkeletonItem() {
  return (
    <View className="p-4 flex flex-row gap-x-4 items-center justify-between">
      <View className="flex flex-row items-center gap-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-blue-500/30" />
        <View className="gap-y-2">
          <Skeleton className="w-[160px] h-4 bg-blue-500/30" />
          <Skeleton className="w-[100px] h-4 bg-blue-500/30" />
        </View>
      </View>
      <Skeleton className="w-[45px] h-6 bg-blue-500/30" />
    </View>
  );
}
