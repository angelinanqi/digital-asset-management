import { Flex, Spinner, Tag } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

export default function AssetTag({ tags, loading, error, selectedTags, onSelectTag }) {
  //tags: full list of tags in dtbs to render all tag selections
  //selectedTags: list of tags already assigned to the asset to render ui indicating is selected
  //onSelectTag: list of tags, which includes new changes as to which tag is selected
  return (
    <Flex gap="2" wrap="wrap">
      {loading ? (
        <Spinner size="lg" color="purple.500" />
      ) : error ? (
        <p>{error}</p>
      ) : tags.length > 0 ? (
        tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <Tag.Root
              key={tag.id}
              size="lg"
              bg={isSelected ? "purple.500" : "gray.100"}
              color={isSelected ? "white" : "black"}
              _hover={{ cursor: "pointer", opacity: 0.8 }}
              onClick={() => onSelectTag(tag.id)}
            >
              {!isSelected && <HiPlus style={{ marginRight: 4 }} />}
              <Tag.Label>{tag.title}</Tag.Label>
            </Tag.Root>
          );
        })
      ) : (
        <p>No tags found!</p>
      )}
    </Flex>
  );
}
