"use client";

import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import { Heading, Button, Table, Stack, Box, Input, Spinner } from "@chakra-ui/react";
import { toaster } from "../../../styles/ui/toaster.jsx";
import AddTag from "../../../components/AddTag.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import useTags from "../../../hooks/useTags.js";

//TODO: when add tag, reflect that in the ui immediately instead of reload
//TODO: when input value in edit tag mode is not changed/same, disable save
//TODO: when delete show confirmatory dialog
//TODO: delete all tags

export default function TagManagement() {
  // endpoint
  const BASE_API_URL = "http://127.0.0.1:8000/tags/";
  const TAG_USAGE_URL = "http://127.0.0.1:8000/tag-usage/";

  // tag and tag usage count states
  // Pull tags data and loading states from custom hook
  const { tags: initialTags, loading, error } = useTags();
  // Local state copies (allows live editing without refetch)
  const [tags, setTags] = useState([]);
  const [count, setCount] = useState([]);

  // editing existing record states
  const [editingID, setEditingID] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  async function handleDeleteTags(tag_id) {
    try {
      await axios.delete(BASE_API_URL + tag_id + "/");

      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tag_id));

      toaster.create({
        description: "Tag deleted successfully!",
        duration: 3000,
        type: 'success'
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // tag row for editing (enable input mode)
  function selectEdit(tag) {
    setEditingID(tag.id);
    setEditingTitle(tag.title);
  }

  // find usage_count for each tag (comes from /tag-usage endpoint)
  function getUsageCount(tag_id) {
    const entry = count.find((c) => c.id === tag_id); // SELECT usage_count FROM tags WHERE id = tag_id
    return entry ? entry.usage_count : 0;
  }

  // save edited tag title to backend
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
        type: 'success'
      });

      setEditingID(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error", error);

      toaster.create({
        description: "Error updating tag!",
        duration: 3000,
        type: 'error'
      });
    }
  }

  useEffect(() => {
    async function fetchUsageCount() {
      try {
        const response = await axios.get(TAG_USAGE_URL);
        setCount(response.data);
      } catch {
        console.error("Error", error);
      }
    }

    setTags(initialTags);
    fetchUsageCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTags]);

  return (
    <EditorLayout>
      <Heading>Tag Management</Heading>

      <Stack>
        {/* new tag btn */}
        <Box display="flex" justifyContent="flex-end">
          <AddTag />
        </Box>

        {/* tag table */}
        <Table.Root variant="line">
          {/* table hdr */}
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

          {/* table body with conditional rendering */}
          <Table.Body>
            {/* CASE 1: loading state - show spinner */}
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  <Spinner size="lg" color="purple.500" />
                </Table.Cell>
              </Table.Row>
            ) : /* CASE 2: error state - show error message */ error ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center" color="red.500">
                  {error}
                </Table.Cell>
              </Table.Row>
            ) : /* CASE 3: tags exist - render tag rows */ tags.length > 0 ? (
              tags.map((tag) => (
                <Table.Row key={tag.id}>
                  {/* tag name column - editable input or display text */}
                  <Table.Cell>
                    {editingID === tag.id ? (
                      // Edit mode: show input field
                      <Input
                        size="sm"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        width="auto"
                      />
                    ) : (
                      // view only mode: show tag title
                      tag.title
                    )}
                  </Table.Cell>

                  {/* usage count column */}
                  <Table.Cell textAlign="center">
                    {getUsageCount(tag.id)}
                  </Table.Cell>

                  {/* actions column - Save/Cancel or Edit/Delete buttons */}
                  <Table.Cell textAlign="center">
                    {editingID === tag.id ? (
                      // edit mode: show Save and Cancel buttons
                      <>
                        <Button
                          size="xs"
                          variant='surface'
                          colorPalette='green'
                          onClick={() => handleSaveEdit(tag.id)}
                        >
                          Save
                        </Button>

                        <Button
                          size="xs"
                          variant='surface'
                          colorPalette='gray'
                          marginLeft="10px"
                          onClick={() => setEditingID(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      // view mode: show Edit and Delete buttons
                      <>
                        <Button
                          size="xs"
                          variant='surface'
                          colorPalette='gray'
                          onClick={() => selectEdit(tag)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="xs"
                          variant='surface'
                          colorPalette='red'
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
              /* CASE 4: no tags exist - show empty state message */
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
