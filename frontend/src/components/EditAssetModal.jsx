'use client';

import { Box, Button, CloseButton, Dialog, Field, Input, Portal, Stack, Textarea, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

export default function EditAssetModal({ asset }) {
    // State variables to store uploaded asset details
    const [name, setName] = useState(asset.name);
    const [description, setDescription] = useState(asset.description);

    async function handleAssetFileEdit() {
        // Establish existing key-value pairs for asset
        const assetFormData = new FormData();

        assetFormData.append('name', name);
        assetFormData.append('description', description);

        // PATCH method to update asset name and description
        try {
            await axios.patch('http://127.0.0.1:8000/assets/' + asset.id + '/', assetFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button variant='outline'>Edit</Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />

                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit Asset: {asset.name}</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body pb='4'>
                                <Stack gap='4'>
                                    {/* Name field */}
                                    <Field.Root>
                                        <Field.Label>Name</Field.Label>
                                        <Input
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Field.Root>

                                    {/* Description field */}
                                    <Field.Root>
                                        <Field.Label>Description</Field.Label>
                                        <Textarea
                                            placeholder='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            height='200px'
                                        />
                                    </Field.Root>

                                    {/* Add tags here */}

                                </Stack>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant='outline'>Cancel</Button>
                                </Dialog.ActionTrigger>

                                <Dialog.ActionTrigger asChild>
                                    <Button onClick={handleAssetFileEdit}>Edit</Button>
                                </Dialog.ActionTrigger>

                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}