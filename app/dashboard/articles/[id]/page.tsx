import { PlateEditor } from "@/components/editor/plate-editor";
import { SettingsProvider } from "@/components/editor/settings";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="h-full w-full border-2 rounded-md" data-registry="plate">
      <SettingsProvider>
        <PlateEditor articleId={id} />
      </SettingsProvider>
    </div>
  );
}
