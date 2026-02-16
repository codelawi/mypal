// providers/dialog-provider.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  Text,
} from "react-native";

// Types
interface DialogContextType {
  open: (content: ReactNode, title?: string) => void;
  close: () => void;
}

interface DialogProviderProps {
  children: ReactNode;
}

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Create context
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Custom hook
export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

// Main provider component
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const bottomPadding = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true);

        // Animate bottom padding
        Animated.timing(bottomPadding, {
          toValue: e.endCoordinates.height + 20,
          duration: 250,
          useNativeDriver: false,
        }).start();

        // Scroll to bottom when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false);

        // Animate bottom padding back
        Animated.timing(bottomPadding, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const open = (content: ReactNode, title: string = "") => {
    setDialogContent(content);
    setDialogTitle(title);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    Keyboard.dismiss();
    // Clear content after animation
    setTimeout(() => {
      setDialogContent(null);
      setDialogTitle("");
    }, 200);
  };

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}

      {/* Global Dialog - Full Width with Keyboard Avoidance */}
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent
          className="w-full max-w-full mx-0"
          style={{
            width: width - 32,
            maxWidth: width - 32,
          }}
        >
          <DialogHeader>
            <DialogTitle>{dialogTitle || "Dialog"}</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <Animated.View
            style={{
              maxHeight: keyboardVisible ? height * 0.5 : height * 0.7,
              marginBottom: bottomPadding,
            }}
          >
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingVertical: 16 }}
            >
              {dialogContent}
            </ScrollView>
          </Animated.View>

          <DialogFooter className={keyboardVisible ? "pb-2" : ""}>
            <DialogClose asChild>
              <Button onPress={close} variant="outline">
                <Text>Close</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};
