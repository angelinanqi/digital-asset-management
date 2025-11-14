"use client";

import { Box, Button, CloseButton, Dialog, Field, Input, Portal, Stack, FileUpload, Textarea, Icon } from "@chakra-ui/react";
import { toaster } from "../styles/ui/toaster";
import { MdCloudUpload } from "react-icons/md";
import { useState } from "react";
import { fileTypeFromBlob } from "file-type";
import axios from "axios";
import useTags from "../hooks/useTags";
import AssetTag from "./AssetTag.jsx";

export default function UploadAssetModal() {
  console.log("AssetTag", AssetTag);
  // state variables to store asset details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // state variable to store tag
  const { tags, loading, error } = useTags();
  const [selectedTag, setSelectedTag] = useState([]);

  // function to display successful upload toaster
  function displayUploadToast() {
    return toaster.create({
      description: 'File successfully uploaded',
      type: 'success',
    })
  }

  async function handleTagSelect(tag_id) {
    setSelectedTag((prevSelected) => {
      if (prevSelected.includes(tag_id)) {
        // if already selected, remove it
        return prevSelected.filter((id) => id !== tag_id);
      } else {
        // otherwise add it
        return [...prevSelected, tag_id];
      }
    });
  }

  async function handleAssetFileUpload() {
    // validate to ensure file exists
    if (!file) return;

    // convert file size from bytes to MB
    const file_size = file.size / (1024 * 1024);

    // get file type (some types can't be read)
    const file_type = await fileTypeFromBlob(file);

    // build key-value pairs for uploading an asset
    const assetFormData = new FormData();

    // add asset data (user input) to the FormData
    assetFormData.append("name", name); // name
    assetFormData.append("description", description); // description

    assetFormData.append("uploaded_by", "braaaaa_yaaaaan"); // uploaded_by (hardcoded)
    assetFormData.append("file_type", file_type.ext); // file_type (.mime can be read as well)
    assetFormData.append("file_size", file_size); // file_size (in MB)
    assetFormData.append("url", file);
    selectedTag.forEach((tag_id) => {
      assetFormData.append("tags", tag_id);
    });

    // POST method to upload asset (file) to backend endpoint
    try {
      await axios.post("http://127.0.0.1:8000/assets/", assetFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      displayUploadToast();

    } catch (err) {
      // Does not do anything for now.
      console.log("error", err);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size='sm' bg="blue.700" color="white">
          <MdCloudUpload /> Upload Asset
          </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Upload New Asset</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb="4">
              <Stack gap="4">
                {/* Name field */}
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field.Root>

                {/* Description field */}
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field.Root>

                {/* Asset file upload */}
                <FileUpload.Root maxW="lg" alignItems="stretch" maxFiles={1}>
                  <FileUpload.Label>File</FileUpload.Label>
                  <FileUpload.HiddenInput
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <MdCloudUpload/>
                    </Icon>

                    <FileUpload.DropzoneContent>
                      <Box>
                        Drop a file here. <br/>
                        Supported files only include (.jpg, .png, .mp4, and .glb).
                      </Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>

                  <FileUpload.List />
                </FileUpload.Root>

                {/* Add tags here */}
                <Field.Root>
                  <Field.Label>Tags</Field.Label>
                  <AssetTag
                    tags={tags}
                    loading={loading}
                    error={error}
                    selectedTags={selectedTag}
                    onSelectTag={handleTagSelect}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Dialog.ActionTrigger asChild>
                <Button onClick={handleAssetFileUpload} bg="blue.700" color="white">Upload</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
