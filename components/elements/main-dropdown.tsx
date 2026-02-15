import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    Ellipsis,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function MainDropDown() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable className="p-2 bg-zinc-100 rounded-full active:bg-zinc-200">
          <Ellipsis size={20} color={"blue"} />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        insets={contentInsets}
        sideOffset={2}
        className="w-56"
        align="start"
      >
        <DropdownMenuLabel>Money actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BanknoteArrowUp color={"#16a34a"} size={15} />
            <Text className="text-green-600">Inseart a balance</Text>
            <DropdownMenuShortcut>JOD</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BanknoteArrowDown color={"#dc2626"} size={15} />
            <Text className="text-red-600">Make a transformation</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
