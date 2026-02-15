import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
        <PortalHost />
        <Toaster />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
