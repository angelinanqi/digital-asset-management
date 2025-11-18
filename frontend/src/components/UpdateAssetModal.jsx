"use client";

import { Box, Button, CloseButton, Dialog, Portal, FileUpload, Icon } from "@chakra-ui/react";
import { toaster } from "../styles/ui/toaster";
import { LuUpload } from "react-icons/lu";
import { useState, useEffect } from "react";
import { fileTypeFromBlob } from "file-type";
import axios from "axios";
import AssetTag from "./AssetTag.jsx";

export default function UpdateAssetModal({ asset }) {
  console.log("AssetTag", AssetTag);
  // state variables to store asset details
  const [file, setFile] = useState(null);
  const tags = asset.tags;
  const [verNo, setVerNo] = useState();

  async function fetchNewFileVerNo() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/get-new-version-no/" + asset.code + "/");
      setVerNo(res.data);
    } catch (error) {
      console.error("Failed to fetch new version number", error);
    }
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
    assetFormData.append("name", asset.name); // name
    assetFormData.append("description", asset.description); // description
    assetFormData.append("code", asset.code);
    assetFormData.append("uploaded_by", "bb"); // uploaded_by (hardcoded)
    assetFormData.append("file_type", file_type.ext); // file_type (.mime can be read as well)
    assetFormData.append("file_size", file_size); // file_size (in MB)
    assetFormData.append("url", file);
    tags.forEach((tag_id) => {
      assetFormData.append("tags", tag_id);
    });
    assetFormData.append("version_no", verNo);

    // POST method to upload asset (file) to backend endpoint
    try {
      await axios.post("http://127.0.0.1:8000/assets/", assetFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toaster.create({
        description: "Successfully Updated Only Asset File!",
        type: "info"
      });

    } catch (err) {
      // Does not do anything for now.
      console.log("error", err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNewFileVerNo();
  }, [asset.code]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface">Update</Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Asset File</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb="4">
              {/* Asset file upload */}
              <FileUpload.Root maxW="lg" alignItems="stretch" maxFiles={1}>
                <FileUpload.HiddenInput
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                    <LuUpload />
                  </Icon>

                  <FileUpload.DropzoneContent>
                    <Box>Drop your new file here.</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>

                <FileUpload.List />
              </FileUpload.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="surface" colorPalette="red">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>

              <Dialog.ActionTrigger asChild>
                <Button variant="surface" onClick={handleAssetFileUpload}>
                  Upload
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
