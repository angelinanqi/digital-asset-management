"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Input,
  Field,
} from "@chakra-ui/react";
import { toaster } from "../styles/ui/toaster";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";

export default function AddTag() {
  const BASE_API_URL = "http://127.0.0.1:8000/tags/";
  const [title, setTitle] = useState("");

  async function handleCreateTag() {
    const newTag = { title };

    try {
      await axios.post(BASE_API_URL, newTag);

      toaster.create({
        description: "Tag created successfully!🎉",
        duration: 3000,
        type: 'success'
      });

      setTitle(""); //clear input
    } catch (error) {
      toaster.create({
        description: "Error! Unable to create tag.",
        duration: 3000,
        type: 'error'
      });
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="xs" background="blue.700" color="white">
          <LuPlus />
          New Tag
        </Button>
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
                <Input
                  placeholder="Enter your tag name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field.Root>
            </Dialog.Body>

            {/*cancel and save btn*/}
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant='surface'>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button variant='surface'onClick={handleCreateTag} colorPalette='green'>Save</Button>
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
