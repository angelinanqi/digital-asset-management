import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
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
