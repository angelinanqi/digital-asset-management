import { Container, Flex, Box } from "@chakra-ui/react";
import NavBar from "../NavBar.jsx";

export default function EditorLayout({ children }) {
  return (
    <>
      <Container>
        <Flex direction="column" gapY="30px">
          <Box>
            <NavBar />
          </Box>
          <Box>{children}</Box>
        </Flex>
      </Container>
      <Box h="30px" marginTop={"50px"} />
    </>
  );
}
