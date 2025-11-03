import { Box, Button, CloseButton, Dialog, Grid, GridItem, NumberInput, Portal, Stack, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import PreviewImageAsset from './PreviewImageAsset';
import PreviewVideoAsset from './PreviewVideoAsset';
import Preview3DAsset from './Preview3DAsset';
import useDownloader from 'react-use-downloader';
import EditAssetModal from '../EditAssetModal';
import axios from 'axios';

export default function PreviewAssetModal({ asset }) {

    /*
    State variable handling for 3D models (assets)
    Handler to control and adjust light intensity of 3D models

    Note: Recommended values in range (0 - 10)
    */
    const [lightIntensity, setLightIntensity] = useState(1);

    // Handler to adjust wheel scroll sensitivity
    const [wheelPrecision, setWheelPrecision] = useState(20);

    /* 
    State variables for handling background RGBA 
    
    Note: Default values have been set
    */
    const [rComponent, setRComponent] = useState(0);
    const [gComponent, setGComponent] = useState(0);
    const [bComponent, setBComponent] = useState(0);
    const [aComponent, setAComponent] = useState(0.1);

    // Handler to download asset files
    const { download } = useDownloader();

    const deleteAsset = async (asset_id) => {
        // Axios DELETE method: Delete an asset based on its ID
        await axios.delete('http://127.0.0.1:8000/assets/' + asset_id + '/');
    }

    return (
        <>
            {/* Button: View - > Opens */}
            <Dialog.Root size='full' placement='center'>
                <Dialog.Trigger asChild>
                    <Button variant='outline'>Preview</Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Asset Name: {asset.name}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>

                                {/* Refactor this part (New UI) */}

                                <Grid templateColumns='repeat(4, 2fr )' gap='6'>

                                    {/* Display Asset */}
                                    <GridItem colSpan={3}>
                                        <Box h='20'>

                                            {asset.file_type === 'png' && <PreviewImageAsset assetURL={asset.url} />}
                                            {asset.file_type === 'jpg' && <PreviewImageAsset assetURL={asset.url} />}
                                            {asset.file_type === 'mp4' && <PreviewVideoAsset assetName={asset.name} assetURL={asset.url} />}

                                            {asset.file_type === 'glb' &&
                                                <Preview3DAsset
                                                    assetURL={asset.url}
                                                    lightIntensity={lightIntensity}
                                                    wheelPrecision={wheelPrecision}
                                                    rComponent={rComponent}
                                                    gComponent={gComponent}
                                                    bComponent={bComponent}
                                                    aComponent={aComponent}
                                                />}

                                        </Box>
                                    </GridItem>

                                    {/* Display Asset Details */}
                                    <GridItem colSpan={1}>
                                        <Box h='20'>
                                            <Dialog.Title>Asset Details</Dialog.Title>

                                            <Dialog.Description><b>Model Code:</b> {asset.code}</Dialog.Description>
                                            <Dialog.Description><b>Name:</b> {asset.name}</Dialog.Description>
                                            <Dialog.Description><b>Description:</b> {asset.description}</Dialog.Description>
                                            <Dialog.Description><b>Upload Datetime:</b> {asset.upload_datetime}</Dialog.Description>
                                            <Dialog.Description><b>Uploaded By:</b> {asset.uploaded_by}</Dialog.Description>
                                            <Dialog.Description><b>File Type:</b> {asset.file_type}</Dialog.Description>
                                            <Dialog.Description><b>File Size:</b> {asset.file_size} MB</Dialog.Description>

                                            <br />

                                            <Stack>
                                                <Button
                                                    variant='outline'
                                                    onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}
                                                >
                                                    Download

                                                </Button>

                                                {/* Button: Edit asset (name and description) */}
                                                <EditAssetModal asset={asset} />


                                                <Button variant='outline'>Update</Button>

                                                <Button
                                                    variant='outline'
                                                    onClick={() => deleteAsset(asset.id)}
                                                >
                                                    Delete

                                                </Button>

                                            </Stack>

                                            <br />

                                            {asset.file_type === 'glb' &&
                                                <Stack>
                                                    <Dialog.Title>Advanced Options</Dialog.Title>

                                                    {/* 3D Asset: Light Intensity */}
                                                    <Dialog.Description><b>Light Intensity</b></Dialog.Description>
                                                    <NumberInput.Root
                                                        width='310px'
                                                        value={lightIntensity}
                                                        onValueChange={(e) => setLightIntensity(e.value)}
                                                        step={0.1}
                                                        allowMouseWheel
                                                    >
                                                        <NumberInput.Control />
                                                        <NumberInput.Input />
                                                    </NumberInput.Root>

                                                    {/* 3D Asset: Wheel Precision */}
                                                    <Dialog.Description><b>Wheel Precision</b></Dialog.Description>
                                                    <NumberInput.Root
                                                        width='310px'
                                                        value={wheelPrecision}
                                                        onValueChange={(e) => setWheelPrecision(e.value)}
                                                        step={10}
                                                        allowMouseWheel
                                                    >
                                                        <NumberInput.Control />
                                                        <NumberInput.Input />
                                                    </NumberInput.Root>

                                                    <Dialog.Description><b>Adjust Background RGBA</b></Dialog.Description>
                                                    <Grid templateColumns='repeat(4, 1fr)' gap='6'>
                                                        <NumberInput.Root
                                                            width='65px'
                                                            value={rComponent}
                                                            onValueChange={(e) => setRComponent(e.value)}
                                                            step={0.1}
                                                            min={0}
                                                            max={1}
                                                            allowMouseWheel
                                                        >
                                                            <NumberInput.Control />
                                                            <NumberInput.Input />
                                                        </NumberInput.Root>

                                                        <NumberInput.Root
                                                            width='65px'
                                                            value={gComponent}
                                                            onValueChange={(e) => setGComponent(e.value)}
                                                            step={0.1}
                                                            min={0}
                                                            max={1}
                                                            allowMouseWheel
                                                        >
                                                            <NumberInput.Control />
                                                            <NumberInput.Input />
                                                        </NumberInput.Root>

                                                        <NumberInput.Root
                                                            width='65px'
                                                            value={bComponent}
                                                            onValueChange={(e) => setBComponent(e.value)}
                                                            step={0.1}
                                                            min={0}
                                                            max={1}
                                                            allowMouseWheel
                                                        >
                                                            <NumberInput.Control />
                                                            <NumberInput.Input />
                                                        </NumberInput.Root>

                                                        <NumberInput.Root
                                                            width='65px'
                                                            value={aComponent}
                                                            onValueChange={(e) => setAComponent(e.value)}
                                                            step={0.1}
                                                            min={0}
                                                            max={1}
                                                            allowMouseWheel
                                                        >
                                                            <NumberInput.Control />
                                                            <NumberInput.Input />
                                                        </NumberInput.Root>
                                                    </Grid>
                                                </Stack>
                                            }
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}