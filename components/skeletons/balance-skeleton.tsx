import { Skeleton } from "@/components/ui/skeleton";
import { View } from "react-native";

export default function BalanceSkeleton() {
  return (
    <View className="flex flex-row items-center gap-x-2">
      <Skeleton className="h-5 w-[40px] bg-blue-600/20" />
      <Skeleton className="h-5 w-[50px] bg-blue-600/20" />
    </View>
  );
}
