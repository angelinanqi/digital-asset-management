"use client";

import { useState, useEffect } from "react";
import { Button, Flex, Image, Tabs } from "@chakra-ui/react";
import { LuUserRound } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../assets/ManticAI_Logo.png";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function NavBar({ items = [] }) {
  // usePathname returns the current route
  const pathName = usePathname();

  // allow routing to another local page
  const router = useRouter();

  // store login info (client-side only)
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // read from localStorage only on client
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");

    setAccessToken(token);
    setUsername(name || "");
  }, []);

  // Map the path name to the tab value
  const currentPathName = items.find((item) => item.page === pathName)?.title;

  // button to be conditionally rendered
  let button;

  const handleHomeClick = () => {
    router.push("/editor/home");
  };

  const handleProfileClick = () => {
    // redirect to user profile
    router.push("/user-profile");
  };

  // check if the access token exists
  if (!accessToken) {
    button = (
      <Button size="sm" bg="blue.700" color="white">
        Log In
      </Button>
    );
  } else {
    button = (
      <Button
        size="sm"
        bg="blue.700"
        color="white"
        onClick={handleProfileClick}
      >
        <LuUserRound />
        {username}
      </Button>
    );
  }

  return (
    <>
      {/*Upper NavBar - logo, search bar, login btn*/}
      <Flex
        py="20px"
        spaceX="20px"
        align="center"
        justify="space-between"
        bg="white"
      >
        {/*left side - logo*/}
        <Image
          src={Logo.src ?? Logo}
          alt="logo"
          h="40px"
          w="auto"
          onClick={handleHomeClick}
          style={{ cursor: "pointer" }}
        />

        {/*center - search bar*/}
        <SearchBar />

        {/*right side - log in btn*/}
        {button}
      </Flex>

      {/* Display routes (e.g. Assets, Tag Management) */}
      <Tabs.Root
        value={currentPathName}
        lazyMount
        unmountOnExit
        variant="line"
        colorPalette="blue"
      >
        <Tabs.List>
          {/* Loop through the 'editor_items' array from EditorLayout.jsx */}
          {items.map((item) => (
            <Tabs.Trigger key={item.title} value={item.title} asChild>
              {/* Display routing icon and name */}
              <Link href={item.page}>
                {item.icon}
                {item.title}
              </Link>
            </Tabs.Trigger>
          ))}

          {/* Remove the tab style but leave the horizontal lines */}
          <Tabs.Indicator unstyled />
        </Tabs.List>
      </Tabs.Root>
    </>
  );
}
