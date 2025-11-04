"use client";

import { Avatar, Button, Card, Flex, Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState, useEffect } from "react";
import PreviewAssetModal from "./previews/PreviewAssetModal";
import EditAssetModal from "./EditAssetModal";
import useDownloader from "react-use-downloader";
import axios from "axios";

export default function AssetCard() {
  //endpoint
  const BASE_API_URL_TAGS = "http://127.0.0.1:8000/tags/";
  const BASE_API_URL_ASSETS = "http://127.0.0.1:8000/assets/";

  //state var and setter
  const [assets, setAssets] = useState([]); // Stores list of each asset and its details
  const [assetTagMap, setAssetTagMap] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");

  //handlers
  const { download } = useDownloader(); // Handler to download asset files

  //tag methods
  //get the tag using id
  async function fetchAssetTags(tag_id) {
    try {
      const requests = tag_id.map((id) =>
        axios.get(BASE_API_URL_TAGS + id + "/")
      );
      const responses = await Promise.all(requests);
      return responses.map((res) => res.data); // return array of tag objects
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  }

  //useEffect
  useEffect(() => {
    const getAssets = async () => {
      const url = searchKeyword
        ? BASE_API_URL_ASSETS + "?search=" + searchKeyword
        : BASE_API_URL_ASSETS;

      const response = await axios.get(url);

      setAssets(response.data.results);
    };
    // Call this function to retrieve all assets
    getAssets(); //suppress error, should be no problem as can render properly. most likely strict mode ba
  }, [searchKeyword]); // Note: Using [] to only call getAssets() once for each render

  useEffect(() => {
    async function loadAssets() {
      const response = await axios.get(BASE_API_URL_ASSETS);
      const list = response.data.results;
      setAssets(list);

      // one array of promises for each asset
      const tagPromises = list.map(async (asset) => {
        if (asset.tags && asset.tags.length > 0) {
          const tags = await fetchAssetTags(asset.tags); //fetch all the tags for this asset
          return { assetId: asset.id, tags };
        } else {
          return { assetId: asset.id, tags: [] };
        }
      });

      //wait for all the promise(fetch tags) to finish and return it
      const tagResults = await Promise.all(tagPromises);

      //convert array of {assetId, tags} into a map {assetId: tags}
      const tagMap = {};
      tagResults.forEach(({ assetId, tags }) => {
        tagMap[assetId] = tags;
      });

      setAssetTagMap(tagMap);
    }

    loadAssets();
  }, []);

  return (
    <div>
      <br />
      {/* Temporary header for the Digital Assets segment */}
      <h1>Digital Assets</h1>
      <br />

      <Flex flex="1" justify="center">
        <InputGroup endElement={<LuSearch />} width="1/2">
          <Input
            color="black"
            variant="outline"
            borderColor="gray.700/20"
            placeholder="What are you looking for?"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </InputGroup>
      </Flex>

      <br />

      <h1>{searchKeyword}</h1>

      {/* Loop through the 'assets' array based on ID */}
      <Flex gap={31} direction="row" wrap="wrap">
        {assets.map((asset) => {
          return (
            <Card.Root
              key={asset.id}
              width="320px"
              variant="elevated"
              colorPalette="purple"
            >
              <Card.Body gap="2" colorPalette="gray">
                {/* Using Flex to display preview, asset name, and size */}
                <Flex gap="4">
                  {/* Display preview (image) of asset */}
                  <Avatar.Root size="xl" shape="rounded">
                    <Avatar.Image src={asset.url} />
                  </Avatar.Root>

                  {/* Display asset name and size (in MB) */}
                  <Flex direction="column">
                    <Card.Title>{asset.name}</Card.Title>
                    <p>{asset.file_size} MB</p>
                  </Flex>
                </Flex>

                {/* Display asset description */}
                <Card.Description>{asset.description}</Card.Description>

                {/* Display other asset details (uploaded_by and upload_datetime) */}
                <Flex direction="column">
                  <Card.Description>
                    <b>Uploaded By:</b> {asset.uploaded_by}
                  </Card.Description>
                  <Card.Description>
                    <b>Datetime: </b> {asset.upload_datetime}
                  </Card.Description>
                  <Card.Description>
                    <b>Tags: </b>
                    {
                      // get tags for this asset
                      (() => {
                        const tags = assetTagMap[asset.id];
                        return tags && tags.length > 0
                          ? tags.map((tag) => tag.title).join(", ")
                          : "None";
                      })()
                    }
                  </Card.Description>
                </Flex>
              </Card.Body>

              {/* Asset card footer with buttons and its dialogs */}
              <Card.Footer justifyContent="flex-end">
                {/* NOTE: INSERT PREVIEW BUTTON HERE */}
                <PreviewAssetModal asset={asset} />

                {/* Can insert more features here (Button) */}
                <Button
                  variant="outline"
                  onClick={() =>
                    download(asset.url, asset.name + "." + asset.file_type)
                  }
                >
                  Download
                </Button>

                {/* Button: Edit asset (name and description) */}
                <EditAssetModal asset={asset} />
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Flex>
    </div>
  );
}
