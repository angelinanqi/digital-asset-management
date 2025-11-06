import { Accordion, Box, Button, Card, CloseButton, Dialog, Grid, GridItem, NumberInput, Portal, Span } from '@chakra-ui/react';
import { useState } from 'react';

import { hsvaToHex } from '@uiw/color-convert';
import Sketch from '@uiw/react-color-sketch';

import PreviewAssetCard from './PreviewAssetCard';

import PreviewImageAsset from './PreviewImageAsset';
import PreviewVideoAsset from './PreviewVideoAsset';


export default function PreviewAssetModal({ asset }) {
    const [exposure, setExposure] = useState(1);
    const [shadowIntensity, setShadowIntensity] = useState(1);
    const [shadowSoftness, setShadowSoftness] = useState(1);

    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100, a: 0 });
    const [disableAlpha, setDisableAlpha] = useState(false);

    return (
        <>
            {/* Button: Preview - > Opens */}
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

                                <Grid templateColumns='repeat(2, 1fr)' gap='6'>

                                    {/* Item 1 */}
                                    <GridItem>

                                        {/* Display 3D models */}
                                        {asset.file_type === 'glb' &&
                                            <model-viewer
                                                alt={asset.name}
                                                src={asset.url}
                                                shadow-intensity={shadowIntensity}
                                                shadow-softness={shadowSoftness}
                                                exposure={exposure}
                                                camera-controls
                                                auto-rotate
                                                touch-action="pan-y"
                                                environment-image="neutral"

                                                style={{
                                                    width: '700px',
                                                    height: "600px",
                                                    borderRadius: "12px",
                                                    backgroundColor: hsvaToHex(hsva)
                                                }}
                                            />
                                        }

                                        {/* Display png and jpg images */}
                                        {(asset.file_type === 'png' || asset.file_type === 'jpg') && 
                                            <PreviewImageAsset assetURL={asset.url}/>
                                        }

                                        
                                        {/* Display mp4 */}
                                        {asset.file_type === 'mp4' && 
                                            <PreviewVideoAsset assetURL={asset.url}/>
                                        }

                                    </GridItem>

                                    {/* Item 2 */}
                                    <GridItem>
                                        <PreviewAssetCard asset={asset} /> <br />

                                        {/* Only for 3D models (glb) */}
                                        <Accordion.Root collapsible size='sm'>
                                            <Accordion.Item value='advanced'>
                                                <Accordion.ItemTrigger>
                                                    <Span flex='1'>Advanced Options</Span>
                                                </Accordion.ItemTrigger>

                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>

                                                        <Grid templateColumns='repeat(2, 1fr)' gap='6'>

                                                            {/* Card for Item 1 */}
                                                            <Card.Root>
                                                                <Card.Body>

                                                                    {/* Item 1 */}
                                                                    <GridItem>
                                                                        <Dialog.Description>Exposure</Dialog.Description> <br />
                                                                        <NumberInput.Root
                                                                            width='200px'
                                                                            value={exposure}
                                                                            onValueChange={(e) => setExposure(e.value)}
                                                                            min='0'
                                                                            max='2'
                                                                            step={0.01}
                                                                            allowMouseWheel
                                                                        >
                                                                            <NumberInput.Control />
                                                                            <NumberInput.Input />
                                                                        </NumberInput.Root> <br />

                                                                        <Dialog.Description>Shadow Intensity</Dialog.Description> <br />
                                                                        <NumberInput.Root
                                                                            width='200px'
                                                                            value={shadowIntensity}
                                                                            onValueChange={(e) => setShadowIntensity(e.value)}
                                                                            min='0'
                                                                            max='2'
                                                                            step={0.01}
                                                                            allowMouseWheel
                                                                        >
                                                                            <NumberInput.Control />
                                                                            <NumberInput.Input />
                                                                        </NumberInput.Root> <br />

                                                                        <Dialog.Description>Shadow Softness</Dialog.Description> <br />
                                                                        <NumberInput.Root
                                                                            width='200px'
                                                                            value={shadowSoftness}
                                                                            onValueChange={(e) => setShadowSoftness(e.value)}
                                                                            min='0'
                                                                            max='1'
                                                                            step={0.01}
                                                                            allowMouseWheel
                                                                        >
                                                                            <NumberInput.Control />
                                                                            <NumberInput.Input />
                                                                        </NumberInput.Root> <br />

                                                                    </GridItem>


                                                                </Card.Body>
                                                            </Card.Root>

                                                            {/* Card for Item 2 */}
                                                            <Card.Root>
                                                                <Card.Body>
                                                                    {/* Item 2 */}
                                                                    <GridItem>
                                                                        <Dialog.Description>Background Color</Dialog.Description> <br />

                                                                        <Box display='flex' justifyContent='center'>
                                                                            <Sketch
                                                                            style={{ width: 380 }}
                                                                            color={hsva}
                                                                            disableAlpha={disableAlpha}
                                                                            onChange={(color) => { setHsva(color.hsva) }}
                                                                        />
                                                                        </Box>

                                                                    </GridItem>

                                                                </Card.Body>
                                                            </Card.Root>

                                                        </Grid>
                                                    </Accordion.ItemBody>

                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>
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