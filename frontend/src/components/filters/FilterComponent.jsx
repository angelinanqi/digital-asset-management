'use client';

import { Button, Menu, Portal } from '@chakra-ui/react';
import { HiSortAscending } from 'react-icons/hi';
import { useState } from 'react';

export default function FilterComponent({ onChange }) {
    const [value, setValue] = useState('');

    const items = [
        { label: 'A-Z', filterValue: '?ordering=name' },
        { label: 'Z-A', filterValue: '?ordering=-name' },
        { label: 'Newest', filterValue: '?ordering=-upload_datetime' },
        { label: 'Oldest', filterValue: '?ordering=upload_datetime'}
    ]

    return (
        <>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant='outline' size='sm'>
                    <HiSortAscending/> Sort
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content minW='10rem'>
                        <Menu.RadioItemGroup
                          value={value}
                          onValueChange={(e) => { setValue(e.value); onChange?.(e.value) }}
                        >
                          {items.map((item) => (
                            <Menu.RadioItem key={item.filterValue} value={item.filterValue}>
                                {item.label}
                                <Menu.ItemIndicator/>
                            </Menu.RadioItem>
                          ))}
                        </Menu.RadioItemGroup>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        
        </>

    );
}