import { Image } from "@chakra-ui/react";

export default function PreviewImageAsset({ assetURL, h, w }) {
  return (
    <>
      {/* Use the url prop (assetURL) to display asset image */}
      <Image
        rounded="lg"
        height={h}
        width={w}
        fit="contain"
        src={assetURL}
      />
    </>
  );
}
