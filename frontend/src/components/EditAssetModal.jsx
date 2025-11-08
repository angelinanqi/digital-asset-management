"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import useTags from "../hooks/useTags";
import AssetTag from "./AssetTag.jsx";

export default function EditAssetModal({ asset }) {
  const BASE_API_URL = "http://127.0.0.1:8000/assets/";

  // State variables to store uploaded asset details
  const [name, setName] = useState(asset.name);
  const [description, setDescription] = useState(asset.description);

  // state variable to store tag
  const { tags, loading, error } = useTags();
  const [selectedTag, setSelectedTag] = useState([]);

  //get the already assigned tags for each asset to load selected tag ui in tags area
  async function fetchSelectedTags() {
    try {
      const response = await axios.get(BASE_API_URL + asset.id + "/");
      setSelectedTag(response.data.tags || []);
    } catch (err) {
      console.log(err);
    }
  }

  //called by AssetTag (onSelectTag) and will return the array of tag ids
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

  async function handleAssetFileEdit() {
    // Establish existing key-value pairs for asset
    const assetFormData = new FormData();

    assetFormData.append("name", name);
    assetFormData.append("description", description);

    //cannot make existing tags array to null due to m2m field in backend, this is a workaround
    if (selectedTag.length === 0) {
      await axios.patch("http://127.0.0.1:8000/clear-tags/" + asset.id + "/");
    } else {
      selectedTag.forEach((tag_id) => { //tag id set in AssetTag componenet
        assetFormData.append("tags", tag_id);
      });
    }

    // PATCH method to update asset name and description
    try {
      await axios.patch(BASE_API_URL + asset.id + "/", assetFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSelectedTags();
  }, []);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="surface">Edit</Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Asset: {asset.name}</Dialog.Title>
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
                      height="200px"
                    />
                  </Field.Root>

                  {/* tags */}
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
                  <Button onClick={handleAssetFileEdit} bg="blue.700" color="white">Save</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
