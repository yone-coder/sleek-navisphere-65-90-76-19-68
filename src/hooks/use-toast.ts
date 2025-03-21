
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast";
import {
  toast,
  useToast as useToastImpl,
} from "@radix-ui/react-toast";

export type { ToastProps };

export const useToast = () => {
  return useToastImpl();
};

export { toast };
