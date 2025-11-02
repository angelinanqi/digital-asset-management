import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import UploadAssetModal from "@/components/UploadAssetModal.jsx";
import AssetCard from "@/components/AssetCard.jsx";

export default function EditorHome() {
  return (
    <>
      <EditorLayout>
        <UploadAssetModal />
        <AssetCard/>
      </EditorLayout>
    </>
  );
}
