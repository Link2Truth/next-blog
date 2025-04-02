import { PlateEditor } from "@/components/editor/plate-editor";
import { SettingsProvider } from "@/components/editor/settings";

import { Toaster } from "sonner";

export default function Page() {
  return (
    <div className="h-full w-full border-2 rounded-md" data-registry="plate">
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
