'use client';

import { Button, Menu, Portal } from '@chakra-ui/react';
import { IoPricetagsSharp } from 'react-icons/io5';
import { useState } from 'react';

export default function FilterComponent({ onChange }) {
    const [value, setValue] = useState('');

    const items = [
        { label: 'None', filterValue: '?ordering=name' },
    ]

    return (
        <>

        <Menu.Root>
            <Menu.Trigger asChild>
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