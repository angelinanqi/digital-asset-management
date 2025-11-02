import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import UploadAssetModal from "@/components/UploadAssetModal.jsx";

export default function EditorHome() {
  return (
    <>
      <EditorLayout>
        <UploadAssetModal />
      </EditorLayout>
    </>
  );
}
