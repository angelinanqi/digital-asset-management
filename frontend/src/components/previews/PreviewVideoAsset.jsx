import { AspectRatio } from "@chakra-ui/react";

export default function PreviewVideoAsset({ assetName, assetURL }) {
    return (
        <>
            {/* Display video file based on url (assetURL) */}
            <AspectRatio maxW='700px' ratio={16 / 9}>
                <iframe
                    title={assetName}
                    width='500px'
                    height='800px'
                    allowFullScreen
                    src={assetURL}
                />
            </AspectRatio>
        </>
    );
}