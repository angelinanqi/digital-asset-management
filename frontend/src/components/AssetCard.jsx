'use client';

import { Box, Button, Card, Center, Flex, Image, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PreviewAssetModal from './previews/PreviewAssetModal';
import EditAssetModal from './EditAssetModal';
import useDownloader from 'react-use-downloader';
import axios from 'axios';

import { useSelector } from 'react-redux';

export default function AssetCard() {
    // Stores list of each asset and its details
    const [assets, setAssets] = useState([]);

    const keyword = useSelector((state) => state.search.keyword);

    // Handler to download asset files
    const { download } = useDownloader();

    useEffect(() => {
        const getAssets = async () => {
            // Axios GET method: Retrieves asset and its details
            const url = keyword
                ? 'http://127.0.0.1:8000/assets/?search=' + keyword
                : 'http://127.0.0.1:8000/assets/'

            const response = await axios.get(url);

            // Store fetched data from GET method into the 'assets' array
            setAssets(response.data.results);
        };

        // Call this function to retrieve all assets
        getAssets();
    }, [keyword]);

    return (
        <div>
            <br />
            <h1>Digital Assets</h1>
            <br />

            <Flex gap={31} direction="row" wrap="wrap">
                {assets.map((asset) => {
                    return (
                        <Card.Root
                            key={asset.id}
                            width="320px"
                            variant="elevated"
                        >
                            <Card.Body gap="2" colorPalette="gray">

                                <Stack>
                                    <Box h='140px'>
                                        {(asset.file_type === 'png' || asset.file_type === 'jpg') && (

                                            <Center>
                                                <Image
                                                    src={asset.url}
                                                    w="full"
                                                    maxH="140px"
                                                    alt={asset.name}
                                                    borderRadius="10px"
                                                />

                                            </Center>

                                        )}

                                        {asset.file_type === 'glb' && (
                                            <model-viewer
                                                alt={asset.name}
                                                src={asset.url}
                                                shadow-intensity="1"
                                                camera-controls
                                                touch-action="pan-y"
                                            />
                                        )}
                                    </Box>

                                    <Box>
                                        <Card.Title>{asset.name}</Card.Title>
                                        <p>{Number(asset.file_size).toFixed(2)} MB</p>
                                        <Card.Description>{asset.description}</Card.Description>

                                    </Box>

                                </Stack>

                                <Flex direction="column">
                                    <Card.Description>
                                        <b>Uploaded By:</b> {asset.uploaded_by}
                                    </Card.Description>
                                    <Card.Description>
                                        <b>Datetime:</b> {asset.upload_datetime}
                                    </Card.Description>
                                </Flex>
                            </Card.Body>

                            <Card.Footer justifyContent="flex-end">
                                <PreviewAssetModal asset={asset}/>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        download(
                                            asset.url,
                                            asset.name + '.' + asset.file_type
                                        )
                                    }
                                >
                                    Download
                                </Button>

                                <EditAssetModal asset={asset} />
                            </Card.Footer>
                        </Card.Root>
                    );
                })}
            </Flex>
        </div>
    );
}
