import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "group toast group flex w-full items-center justify-between space-x-2 rounded-md border p-4 pr-6 shadow-lg",
          title: "text-sm font-semibold",
          description: "text-sm opacity-90",
          success: "bg-background text-foreground border-border",
          error: "destructive text-destructive-foreground",
          info: "bg-background text-foreground border-border",
        },
      }}
    />
  );
}
