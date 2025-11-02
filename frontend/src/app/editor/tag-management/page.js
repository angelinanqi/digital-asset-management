"use client";

import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import { Heading, Button, Table, Stack, Box } from "@chakra-ui/react";
import AddTag from "../../../components/AddTag.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TagManagement() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/tags/");
        setTags(response.data.results); //have to specify want the results array part of response data
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchTags();
  }, []);

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
                    <Button size="xs" bg="red.600" marginLeft={"10px"}>
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
