// providers/alert-dialog-provider.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createContext, ReactNode, useContext, useState } from "react";
import { Text } from "react-native";

// Types
interface AlertOptions {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  destructive?: boolean;
}

interface AlertContextType {
  confirm: (options: AlertOptions | string) => Promise<boolean>;
  alert: (options: AlertOptions | string) => Promise<void>;
}

interface AlertDialogProviderProps {
  children: ReactNode;
}

// Create context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Custom hook
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertDialogProvider");
  }
  return context;
};

// Main provider component
export const AlertDialogProvider: React.FC<AlertDialogProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean | void) => void) | null
  >(null);
  const [options, setOptions] = useState<AlertOptions>({});

  // Helper to parse options
  const parseOptions = (options: AlertOptions | string): AlertOptions => {
    if (typeof options === "string") {
      return { description: options };
    }
    return options;
  };

  // Confirm dialog - returns boolean promise
  const confirm = (options: AlertOptions | string): Promise<boolean> => {
    const parsedOptions = parseOptions(options);
    setOptions({
      title: parsedOptions.title || "Confirm",
      description: parsedOptions.description || "Are you sure?",
      cancelText: parsedOptions.cancelText || "Cancel",
      confirmText: parsedOptions.confirmText || "Confirm",
      destructive: parsedOptions.destructive || false,
    });

    setIsOpen(true);

    return new Promise((resolve) => {
      setResolvePromise(() => (value: boolean) => resolve(value));
    });
  };

  // Alert dialog - just shows message, returns void promise
  const alert = (options: AlertOptions | string): Promise<void> => {
    const parsedOptions = parseOptions(options);
    setOptions({
      title: parsedOptions.title || "Alert",
      description: parsedOptions.description || "",
      cancelText: parsedOptions.cancelText,
      confirmText: parsedOptions.confirmText || "OK",
      destructive: parsedOptions.destructive || false,
    });

    setIsOpen(true);

    return new Promise((resolve) => {
      setResolvePromise(() => (value: void) => resolve(value));
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(false);
  };

  const handleAlertConfirm = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise();
  };

  // Determine if this is an alert (no cancel) or confirm (with cancel)
  const isAlert = !options.cancelText;

  return (
    <AlertContext.Provider value={{ confirm, alert }}>
      {children}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            {options.description && (
              <AlertDialogDescription>
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-row justify-end gap-2">
            {!isAlert && (
              <AlertDialogCancel asChild>
                <Button variant="outline" onPress={handleCancel}>
                  <Text>{options.cancelText}</Text>
                </Button>
              </AlertDialogCancel>
            )}

            <AlertDialogAction asChild>
              <Button
                variant={"destructive"}
                onPress={isAlert ? handleAlertConfirm : handleConfirm}
              >
                <Text className="text-white">{options.confirmText}</Text>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
};
