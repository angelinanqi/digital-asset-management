import { Container, Flex, Box } from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";
import NavBar from "../NavBar.jsx";
import { useEffect, useState } from "react";

export default function EditorLayout({ children }) {
  const [group, setGroup] = useState("");

  useEffect(() => {
    // Read group from localStorage on client side
    const storedGroup = localStorage.getItem("group") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGroup(storedGroup);
  }, []);

  // Base editor items
  const editor_items = [
    { title: "Assets", page: "/editor/home", icon: <FaFolderOpen /> },
    {
      title: "Tag Management",
      page: "/editor/tag-management",
      icon: <IoPricetagsSharp />,
    },
  ];

  // dont show Tag Management if user is a Viewer
  const filtered_items =
    group === "Viewer"
      ? editor_items.filter((item) => item.title !== "Tag Management")
      : editor_items;

  return (
    <>
      <Container>
        <Flex direction="column" gapY="30px">
          <Box>
            <NavBar items={filtered_items} />
          </Box>
          <Box>{children}</Box>
        </Flex>
      </Container>
      <Box h="30px" marginTop={"50px"} />
    </>
  );
}
