import { Box, Stack } from '@chakra-ui/react';
import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import UploadAssetModal from "@/components/UploadAssetModal.jsx";
import AssetCard from "@/components/AssetCard.jsx";

export default function EditorHome() {
  return (
    <>
      <EditorLayout>

        <h1><b>Digital Assets</b></h1> <br/>

        {/* Display asset in card format  */}
        <AssetCard/>
        
        

      </EditorLayout>
    </>
  );
}
