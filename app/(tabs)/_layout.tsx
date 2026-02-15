import { Tabs } from "expo-router";
import { ChartBar, History, Home } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },

        // Tabs animation
        // animation: "fade",
        // transitionSpec: {
        //   animation: "timing",
        //   config: {
        //     duration: 100,
        //   },
        // },

        // Keyboard handler
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="recent"
        options={{
          title: "Recent",
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chart"
        options={{
          title: "Chart",
          tabBarIcon: ({ color, size }) => (
            <ChartBar size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
