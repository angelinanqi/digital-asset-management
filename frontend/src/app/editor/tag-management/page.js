import EditorLayout from "../../../components/layouts/EditorLayout.jsx";
import { Heading, Button, Table, Stack, Box } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default function TagManagement() {
  return (
    <EditorLayout>
      <Heading>Tag Management</Heading>

      <Stack>
        {/*new tag btn*/}
        <Box display="flex" justifyContent="flex-end">
          <Button size="xs" background="purple.500" color="white">
            <LuPlus />
            New Tag
          </Button>
        </Box>

        {/*tag table*/}
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Tag Name</Table.ColumnHeader>
              <Table.ColumnHeader>Usage Count</Table.ColumnHeader>
              <Table.ColumnHeader  textAlign="center">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="center">{item.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </EditorLayout>
  );
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
