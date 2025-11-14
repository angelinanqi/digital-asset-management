import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

export default function DeleteDialog() {
    return (
        <>
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant='outline' size='sm'>
                    Delete
                </Button>
                <Portal>
                    <Dialog.Backdrop />
                    
                </Portal>

            </Dialog.Trigger>
        </Dialog.Root>
        </>
    );
}