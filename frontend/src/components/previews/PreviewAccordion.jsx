import { Accordion, Span } from '@chakra-ui/react';


export default function PreviewAccordion({ asset }) {
    return (
        <>

            <Accordion.Root collapsible>
                <Accordion.Item value='advanced'>
                    <Accordion.ItemTrigger>
                        <Span flex='1'>Advanced Options</Span>
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <p>{asset.name}</p>
                            <p>Item 2</p>
                            <p>Item 3</p>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
            
        </>
    );
}