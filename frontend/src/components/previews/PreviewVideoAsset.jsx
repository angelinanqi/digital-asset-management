import { AspectRatio } from "@chakra-ui/react";

export default function PreviewVideoAsset({ assetURL }) {
  return (
    <AspectRatio
      maxW="700px"
      ratio={16 / 9}
      borderRadius="12px"
    >
      <video
        src={assetURL}
        controls
        style={{
          width: "100%",
          height: "100%",
          objectFit: 'cover',
          borderRadius: "12px"
        }}
      >
        Sorry, your browser does not support embedded videos.
      </video>
    </AspectRatio>
  );
}
