import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

export default function DeleteDialog() {
    return (
        <>
            <Dialog.Root role="alertdialog">
                <Dialog.Trigger asChild>
                    <Button variant="outline" size="sm">
                        Delete
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Are you sure?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>
                                    This action cannot be undone. This will permanently delete your
                                    asset and remove it from the system.
                                </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button colorPalette="red">Delete</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}