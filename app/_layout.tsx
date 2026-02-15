import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
      <PortalHost />
    </SafeAreaView>
  );
}
