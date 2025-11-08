import { Container, Flex, Box } from "@chakra-ui/react";
import { FaFolderOpen } from 'react-icons/fa6';
import { IoPricetagsSharp } from 'react-icons/io5';
import NavBar from "../NavBar.jsx";

export default function EditorLayout({ children }) {
  const editor_items = [
    { title: "Assets", page: "/editor/home", icon: <FaFolderOpen/> },
    { title: "Tag Management", page: "/editor/tag-management",  icon: <IoPricetagsSharp/> },
  ];

  return (
    <>
      <Container>
        <Flex direction="column" gapY="30px">
          <Box>
            <NavBar items={editor_items}/>
          </Box>
          <Box>{children}</Box>
        </Flex>
      </Container>
      <Box h="30px" marginTop={"50px"} />
    </>
  );
}
