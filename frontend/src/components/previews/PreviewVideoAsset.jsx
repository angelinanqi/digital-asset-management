import { AspectRatio } from "@chakra-ui/react";

export default function PreviewVideoAsset({ assetName, assetURL }) {
  return (
    <>
      {/* Display video file based on url (assetURL) */}
      <AspectRatio w="800px" h="500px" rounded="lg" overflow="hidden">
        <iframe
          title={assetName}
          width="100%"
          height="100%"
          src={assetURL}
          allowFullScreen
          style={{ borderRadius: "6px" }} // or 'lg' = 12px
        />
      </AspectRatio>
    </>
  );
}

