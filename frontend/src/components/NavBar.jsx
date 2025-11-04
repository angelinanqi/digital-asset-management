import { Image, Flex, Button, InputGroup, Input, Box } from "@chakra-ui/react";
import Logo from "../assets/Logo.png";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

function NavItem({ label, href }) {
  return (
    <Link href={href} passHref>
      <Box
        as="span"
        cursor="pointer"
        px="15px"
        py="10px"
        bg="white"
        color="black"
        borderBottomWidth="1px"
        borderBottomColor="gray.500/50"
        _hover={{
          borderBottomWidth: "2px",
          borderBottomColor: "purple.400",
        }}
      >
        {label}
      </Box>
    </Link>
  );
}

export default function NavBar({ items = [] }) {
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
        <Image src={Logo.src ?? Logo} alt="logo" h="40px" w="auto" />

        {/*center - search bar*/}
        {/* NOTE: BRYAN EDIT HERE */}

        <Flex flex="1" justify="center">
          <InputGroup endElement={<LuSearch />} width="1/2">
            <Input
              color="black"
              variant="outline"
              borderColor="gray.700/20"
              placeholder="What are you looking for?"
            />
          </InputGroup>
        </Flex>

        {/*right side - log in btn*/}
        <Button size="sm" bg="purple.600" color="white">
          Log In
        </Button>
      </Flex>

      <Flex align="center" bg="white">
        {items.map((item) => (
          <NavItem key={item.title} label={item.title} href={item.page} />
        ))}
      </Flex>
    </>
  );
}
