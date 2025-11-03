import { Container, Flex, Box } from "@chakra-ui/react";
import NavBar from "../NavBar.jsx";

export default function EditorLayout({ children }) {
  const editor_items = [
    { title: "Assets", page: "/editor/home" },
    { title: "Tag Management", page: "/editor/tag-management" },
  ];

  return (
    <>
      <Container>
        <Flex direction="column" gapY="30px">
          <Box>
            <NavBar items={editor_items} />
          </Box>
          <Box>{children}</Box>
        </Flex>
      </Container>
      <Box h="30px" marginTop={"50px"} />
    </>
  );
}
