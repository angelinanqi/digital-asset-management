"use client";

import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import { Heading, Button, Table, Stack, Box } from "@chakra-ui/react";
import { toaster } from "../../../styles/ui/toaster.jsx";
import AddTag from "../../../components/AddTag.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

//TODO: when delete or add tag, reflect that in the ui immediately instead of reload

export default function TagManagement() {
  const BASE_API_URL = "http://127.0.0.1:8000/tags/";
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get(BASE_API_URL);
        setTags(response.data.results); //have to specify want the results array part of response data
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchTags();
  }, []);

  async function handleDeleteTags(tag_id) {
    try {
      await axios.delete(BASE_API_URL + tag_id + "/");
      toaster.create({
        description: "Tag deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error:", error);
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
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Table.Row key={tag.id}>
                  <Table.Cell>{tag.title}</Table.Cell>
                  <Table.Cell textAlign="center">0</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button size="xs" bg="gray.400">
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      bg="red.600"
                      marginLeft={"10px"}
                      onClick={() => handleDeleteTags(tag.id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
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
