import { Button, CloseButton, Dialog, Portal, Input, Field } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default function AddTag() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="xs" background="purple.600" color="white"><LuPlus />New Tag</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {/*dialog hdr*/}
            <Dialog.Header>
              <Dialog.Title>Add New Tag</Dialog.Title>
            </Dialog.Header>

            {/*tag name input field*/}
            <Dialog.Body>
              <Field.Root>
                <Field.Label>Tag Name</Field.Label>
                <Input placeholder="Enter your tag name" />
              </Field.Root>
            </Dialog.Body>

            {/*cancel and save btn*/}
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>

            {/*close btn on top right*/}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
