import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const logoSource = require("@/assets/images/mypal-logo.png");

import * as Font from "expo-font";

export default function index() {
  useEffect(() => {
    loadFont().then((ready) => {
      if (ready) {
        setTimeout(() => {
          router.replace("/(tabs)/home");
        }, 1300);
      } else {
        console.log("something went wrong!");
      }
    });
  }, []);

  // Function to load the fonts

  const loadFont = async () => {
    await Font.loadAsync({
      Regular: require("@/assets/fonts/regular.ttf"),
      bold: require("@/assets/fonts/bold.ttf"),
      light: require("@/assets/fonts/light.ttf"),
      med: require("@/assets/fonts/med.ttf"),
    });
    return true;
  };
  return (
    <View className="h-full w-full flex justify-center items-center">
      <Animated.View
        entering={FadeInDown.delay(400)}
        className="flex items-center"
      >
        <Image
          source={logoSource}
          style={{
            width: 180,
            height: 180,
          }}
        />
        <Text className="text-3xl font-bold">mypal</Text>
      </Animated.View>
    </View>
  );
}
