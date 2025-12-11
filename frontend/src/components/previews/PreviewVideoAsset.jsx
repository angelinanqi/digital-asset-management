import { AspectRatio } from "@chakra-ui/react";

export default function PreviewVideoAsset({ assetName, assetURL, h, w }) {
  return (
    <>
      {/* Display video file based on url (assetURL) */}
      <AspectRatio w={w} h={h} rounded="lg" overflow="hidden">
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
