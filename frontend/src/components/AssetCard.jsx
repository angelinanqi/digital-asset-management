'use client';

import { Avatar, Button, Card, CloseButton, Dialog, Flex, Portal, Image, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useDownloader from 'react-use-downloader';
import axios from 'axios';

export default function AssetCard() {
    // Stores list of each asset and its details
    const [assets, setAssets] = useState([]);

    // Handler to download asset files
    const { download } = useDownloader();

    const getAssets = async () => {
        // Axios GET method: Retrieves asset and its details
        const response = await axios.get('http://127.0.0.1:8000/assets/');

        // Used for debugging purposes - Need to be removed
        console.log('response', response.data.results);

        // Store fetched data from GET method into the 'assets' array
        // Note: Must see how response data is structured to access it
        setAssets(response.data.results);
    };

    const deleteAsset = async (asset_id) => {
        // Axios DELETE method: Delete an asset based on its ID
        await axios.delete('http://127.0.0.1:8000/assets/' + asset_id + '/');
    }

    useEffect(() => {
        // Call this function to retrieve all assets
        // Note: Using [] to only call getAssets() once for each render
        getAssets();

    }, []);

    // JSX and Chakra UI components
    return (
        <div>
            <br />
            {/* Temporary header for the Digital Assets segment */}
            <h1><b>Digital Assets</b></h1>
            <br />

            {/* Loop through the 'assets' array based on ID */}
            <Flex gap={25} direction='row' wrap='wrap'>
                {assets.map((asset) => {
                    return (
                        <Card.Root
                            key={asset.id}
                            width='320px'
                            variant='elevated'
                            colorPalette='purple'
                        >
                            <Card.Body gap='2' colorPalette='gray'>
                                {/* Using Flex to display preview, asset name, and size */}
                                <Flex gap='4'>
                                    {/* Display preview (image) of asset */}
                                    <Avatar.Root size='xl' shape='rounded'>
                                        <Avatar.Image src={asset.url} />
                                    </Avatar.Root>

                                    {/* Display asset name and size (in MB) */}
                                    <Flex direction='column'>
                                        <Card.Title>{asset.name}</Card.Title>
                                        <p>{asset.file_size} MB</p>
                                    </Flex>
                                </Flex>

                                {/* Display asset description */}
                                <Card.Description>{asset.description}</Card.Description>

                                {/* Display other asset details (uploaded_by and upload_datetime) */}
                                <Flex direction='column'>
                                    <Card.Description>
                                        <b>Uploaded By:</b> {asset.uploaded_by}
                                    </Card.Description>
                                    <Card.Description>
                                        <b>Datetime: </b> {asset.upload_datetime}
                                    </Card.Description>
                                </Flex>
                            </Card.Body>

                            {/* Asset card footer with buttons and its dialogs */}
                            <Card.Footer justifyContent='flex-end'>
                                {/* View Button - dialog modal' */}
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <Button variant='outline'>View</Button>
                                    </Dialog.Trigger>
                                    <Portal>
                                        <Dialog.Backdrop />
                                        <Dialog.Positioner>
                                            <Dialog.Content>
                                                <Dialog.Header>
                                                    <Dialog.Title>{asset.name}</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body>
                                                    <Flex gap='4' direction='row'>
                                                        <Flex direction='column'>
                                                            <Stack>
                                                                {/* Display asset preview (image/model) */}
                                                                {/* Note: this part needs to be changed later */}

                                                                <Image
                                                                    rounded='lg'
                                                                    height='200px'
                                                                    width='1000px'
                                                                    wrap='wrap'
                                                                    src={asset.url}
                                                                />

                                                                {/* Display asset details */}
                                                                <p>
                                                                    <b>Type:</b> {asset.file_type}
                                                                </p>
                                                                <p>
                                                                    <b>Size:</b> {asset.file_size} MB
                                                                </p>
                                                                <p>
                                                                    <b>Uploaded By:</b> {asset.uploaded_by}
                                                                </p>
                                                                <p>
                                                                    <b>Upload Datetime:</b> {asset.upload_datetime}
                                                                </p>
                                                            </Stack>
                                                        </Flex>

                                                        <Flex direction='column'>
                                                            <Stack>
                                                                <h1>
                                                                    <b>Description</b>
                                                                </h1>
                                                                <p>{asset.description}</p>

                                                                <Button
                                                                variant='outline'
                                                                colorPalette='purple'
                                                                >
                                                                    Preview Asset
                                                                </Button>

                                                                <Button
                                                                    variant="outline"
                                                                    colorPalette='purple'
                                                                    onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}
                                                                >
                                                                    Download Asset
                                                                </Button>

                                                                <Button variant='outline' colorPalette='purple'>
                                                                    Edit Asset
                                                                </Button>

                                                                <Button 
                                                                variant='outline' 
                                                                colorPalette='purple'
                                                                onClick={() => deleteAsset(asset.id)}
                                                                >
                                                                    Delete Asset
                                                                </Button>

                                                            </Stack>
                                                        </Flex>
                                                    </Flex>
                                                </Dialog.Body>
                                                <Dialog.CloseTrigger asChild>
                                                    <CloseButton size='sm' />
                                                </Dialog.CloseTrigger>
                                            </Dialog.Content>
                                        </Dialog.Positioner>
                                    </Portal>
                                </Dialog.Root>

                                {/* Can insert more features here (Button) */}
                                <Button
                                    variant='outline'
                                    onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}
                                >
                                    Download
                                </Button>

                                <Button variant='outline'>Edit</Button>
                            </Card.Footer>
                        </Card.Root>
                    );
                })}
            </Flex>
        </div>
    );
}
