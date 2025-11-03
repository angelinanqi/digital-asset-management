import { Image } from '@chakra-ui/react';

export default function PreviewImageAsset({ assetURL }) {
    return (
        <>
        {/* Use the url prop (assetURL) to display asset image */}
            <Image
                rounded='lg'
                height='500px'
                width='1000px'
                fit='contain'
                src={assetURL}
            />
        </>
    )
}