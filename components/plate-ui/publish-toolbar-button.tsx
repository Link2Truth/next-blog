import { Upload } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export function PublishToolbarButton() {
  return (
    <ToolbarButton>
      <Upload />
      <span>发布</span>
    </ToolbarButton>
  );
}
