'use client';

import { Button, Menu, Portal } from '@chakra-ui/react';
import { IoPricetagsSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FilterComponent({ onChange }) {

    // Set the constant url to GET tags (asc order)
    const BASE_API_URL_TAGS_ASC = 'http://127.0.0.1:8000/tags/?ordering=title';

    // Will pass the value of this state variable back to AssetCard
    const [value, setValue] = useState('');

    // Store fetched asset tags into 'tags' array
    const [tags, setTags] = useState([]);

    const items = [
        { label: 'None', filterValue: '?ordering=name' },
    ]

    useEffect(() => {
        // Function to fetch available tags from endpoint
        const getTags = async () => {

            // Use try-catch block to handle possible errors
            try {
                const response = await axios.get(BASE_API_URL_TAGS_ASC);

                // Store the tags in 'tags' array
                setTags(response.data.results);
                
                // Used for debugging purposes
                console.log('tags', response.data.results);

            } catch (error) {
                console.error('Error fetching tags: ', error);
            }
        }

        // Call the function to fetch tags
        getTags();

    }, [])

    return (
        <>

            <Menu.Root>
                <Menu.Trigger asChild>

                    {/* Button: Tags - Dropdown to filter by tags */}
                    <Button variant='outline' size='sm'>
                        <IoPricetagsSharp /> Tags
                    </Button>

                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content minW='10rem'>
                            <Menu.RadioItemGroup
                                value={value}
                                onValueChange={(e) => { setValue(e.value); onChange?.(e.value) }}
                            >

                                {/* Loop through the 'tags' array to display available tags */}
                                {tags.map((tag) => (
                                    <Menu.RadioItem key={tag.id} value={tag.id}>
                                        {tag.title}
                                        <Menu.ItemIndicator />
                                    </Menu.RadioItem>
                                ))}

                            </Menu.RadioItemGroup>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

            {/* Used for debugging purposes */}
            {/* <p> Returned value: {value}</p> */}

        </>
    );
}