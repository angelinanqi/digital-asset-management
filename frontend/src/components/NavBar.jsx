'use client';

import { Button, Flex, Image, Tabs } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Logo from '../assets/Logo.png';
import SearchBar from './SearchBar';
import Link from 'next/link';

export default function NavBar({ items = [] }) {

    // usePathname returns the current route
    const pathName = usePathname(); 

    // Map the path name to the tab value
    const currentPathName = items.find(item => item.page === pathName)?.title;

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
                <SearchBar />

                {/*right side - log in btn*/}
                <Button size="sm" bg="purple.600" color="white">
                    Log In
                </Button>
            </Flex>

            {/* Display routes (e.g. Assets, Tag Management) */}
            <Tabs.Root value={currentPathName} lazyMount unmountOnExit variant='line' colorPalette='purple'>

                    <Tabs.List>

                        {/* Loop through the 'editor_items' array from EditorLayout.jsx */}
                        {items.map((item) => (
                            <Tabs.Trigger key={item.title} value={item.title} asChild>

                                {/* Display routing icon and name */}
                                <Link href={item.page}>
                                    {item.icon}{item.title}
                                </Link>

                            </Tabs.Trigger>
                        ))}

                        {/* Remove the tab style but leave the horizontal lines */}
                        <Tabs.Indicator unstyled/>
                    </Tabs.List>
            </Tabs.Root>
        </>
    );
}