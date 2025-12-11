import { AspectRatio } from "@chakra-ui/react";

export default function PreviewVideoAsset({ assetName, assetURL }) {
  return (
    <>
      {/* Display video file based on url (assetURL) */}
      <AspectRatio w="830px" h="580px" rounded="lg" overflow="hidden">
        <iframe
          title={assetName}
          src={assetURL}
          allowFullScreen
          style={{ borderRadius: "6px" }}
        />
      </AspectRatio>
    </>
  );
}
