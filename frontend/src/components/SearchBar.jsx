import { Flex, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";

import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '@/app/searchSlice';

export default function SearchBar() {
    const dispatch = useDispatch();
    const keyword = useSelector((state) => state.search.keyword);

    return (
        <Flex flex="1" justify="center">
            <InputGroup endElement={<LuSearch />} width="1/2">
                <Input
                    color="black"
                    variant="outline"
                    borderColor="gray.700/20"
                    placeholder="Search for assets"
                    value={keyword}
                    onChange={(e) => dispatch(setKeyword(e.target.value))}
                />
            </InputGroup>
        </Flex>
    );
}
