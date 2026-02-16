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
  Trash2,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDatabase } from "@/hooks/use-database";
import { toast } from "sonner-native";

import { InsertBalanceContent } from "@/components/contents/insert-balance-content";
import { useAlert } from "@/providers/alert-dialog-provider";
import { useDialog } from "@/providers/dialog-provider";

export function MainDropDown() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  const { insert, clear } = useDatabase();
  const { open } = useDialog();
  const { alert, confirm } = useAlert();

  const insertAction = async () => {
    open(<InsertBalanceContent />, "Insert an incoming balance");
  };

  const showClearDialog = async () => {
    const confirmed = await confirm({
      title: "Clear all data",
      description:
        "Are you sure you want to clear the month data? You will lose everything and you have to insert a new balance again.",
      cancelText: "Keep it",
      confirmText: "Yes, Delete it",
      destructive: true,
    });
    if (confirmed) {
      clearData();
    }
  };

  const clearData = async () => {
    const response = await clear();
    const { message, error, status } = response;

    if (status !== 200 && error) {
      toast.error(message);
      return;
    }
    toast.success(message);
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
          <DropdownMenuItem onPress={insertAction}>
            <BanknoteArrowUp color={"#16a34a"} size={15} />
            <Text className="text-green-600">Inseart a balance</Text>
            <DropdownMenuShortcut>JOD</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BanknoteArrowDown color={"#dc2626"} size={15} />
            <Text className="text-red-600">Make a transformation</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onPress={showClearDialog}>
            <Trash2 color={"#dc2626"} size={15} />
            <Text className="text-red-600">Clear data</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
