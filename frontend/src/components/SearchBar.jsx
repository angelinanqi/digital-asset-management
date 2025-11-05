import { Flex, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export default function SearchBar() {
    return (
        <>
            {/*center - search bar*/}
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
        </>
    );
}