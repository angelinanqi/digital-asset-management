"use client";

import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import {
  Heading,
  Button,
  Table,
  Stack,
  Box,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { toaster } from "../../../styles/ui/toaster.jsx";
import AddTag from "../../../components/AddTag.jsx";
import { useState } from "react";
import axios from "axios";
import useTags from "../../../hooks/useTags.js";

//TODO: when add tag, reflect that in the ui immediately instead of reload
//TODO: when input value in edit tag mode is not changed/same, disable save
//TODO: when delete show confirmatory dialog
//TODO: delete all tags

export default function TagManagement() {
  const BASE_API_URL = "http://127.0.0.1:8000/tags/";
  const { tags, loading, error } = useTags();

  const [editingID, setEditingID] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  async function handleDeleteTags(tag_id) {
    try {
      await axios.delete(BASE_API_URL + tag_id + "/");
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tag_id));
      toaster.create({
        description: "Tag deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function selectEdit(tag) {
    setEditingID(tag.id);
    setEditingTitle(tag.title);
  }

  async function handleSaveEdit(tag_id) {
    const updated_title = editingTitle;
    try {
      await axios.put(BASE_API_URL + tag_id + "/", { title: updated_title });

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag.id === tag_id ? { ...tag, title: editingTitle } : tag
        )
      );

      toaster.create({
        description: "Tag updated!",
        duration: 3000,
      });

      setEditingID(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error", error);
      toaster.create({
        description: "Error updating tag!",
        duration: 3000,
      });
    }
  }

  return (
    <EditorLayout>
      <Heading>Tag Management</Heading>

      <Stack>
        {/*new tag btn*/}
        <Box display="flex" justifyContent="flex-end">
          <AddTag />
        </Box>

        {/*tag table*/}
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Tag Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Usage Count
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Loading state */}
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  <Spinner size="lg" color="purple.500" />
                </Table.Cell>
              </Table.Row>
            ) : error ? (
              // Error state
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center" color="red.500">
                  {error}
                </Table.Cell>
              </Table.Row>
            ) : tags.length > 0 ? (
              // Normal tags list
              tags.map((tag) => (
                <Table.Row key={tag.id}>
                  <Table.Cell>
                    {editingID === tag.id ? (
                      <Input
                        size="sm"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        width="auto"
                      />
                    ) : (
                      tag.title
                    )}
                  </Table.Cell>

                  <Table.Cell textAlign="center">0</Table.Cell>

                  <Table.Cell textAlign="center">
                    {editingID === tag.id ? (
                      <>
                        <Button
                          size="xs"
                          bg="green.600"
                          onClick={() => handleSaveEdit(tag.id)}
                        >
                          Save
                        </Button>

                        <Button
                          size="xs"
                          bg="gray.400"
                          marginLeft="10px"
                          onClick={() => setEditingID(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="xs"
                          bg="gray.400"
                          onClick={() => selectEdit(tag)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="xs"
                          bg="red.600"
                          marginLeft="10px"
                          onClick={() => handleDeleteTags(tag.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              // Empty state
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  No tags found!
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Stack>
    </EditorLayout>
  );
}
