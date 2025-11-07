"use client";

import { Box, Button, Card, Center, Flex, Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FilterComponent from "./filters/FilterComponent";
import TagFilterComponent from './filters/TagFilterComponent';
import PreviewAssetModal from "./previews/PreviewAssetModal";
import EditAssetModal from "./EditAssetModal";
import useDownloader from "react-use-downloader";
import axios from "axios";

import { useSelector } from 'react-redux';

export default function AssetCard() {
  //endpoint
  const BASE_API_URL_TAGS = "http://127.0.0.1:8000/tags/";
  const BASE_API_URL_ASSETS = "http://127.0.0.1:8000/assets/";

  //state var and setter
  const [assets, setAssets] = useState([]); // Stores list of each asset and its details
  const [assetTagMap, setAssetTagMap] = useState({});

  // Stores the filter keyword (e.g. ?ordering=name)
  const [filter, setFilter] = useState('');

  // Get the keyword from searchbar
  const keyword = useSelector((state) => state.search.keyword);

  // Handler to download asset files
  const { download } = useDownloader();

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

  // bryan useEffect()
  useEffect(() => {

    /*
    GET (retrieve) assets from backend endpoint
    Note: GET endpoint changes based on filter options
    */

    const getAssets = async () => {

      // Use ternary condition to set GET endpoint 
      const url = keyword
        ? BASE_API_URL_ASSETS + "?search=" + keyword // Updated based on searchbar
        : BASE_API_URL_ASSETS + filter; // Updated based on chosen filter options

      // Store the GET responses (results) under 'assets' array
      const response = await axios.get(url);

      setAssets(response.data.results);
    };

    /*
    Call this function to retrieve all assets
    suppress error, should be no problem as can render properly. most likely strict mode ba
    */
    getAssets();

    /*
    Using [] to only call getAssets() once for each render
    Note: Must include keyword and filter since changes are dependent for rerender
    */
  }, [keyword, filter]);

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
      <h1>Digital Assets</h1>
      <br />

      {/* Display filter components */}
      <Stack direction='row'>

        {/* Filter based on A-Z, Z-A, newest, and latest */}
        <FilterComponent onChange={(e) => setFilter(e)} />

        {/* Filter based on existing tags */}
        <TagFilterComponent />

      </Stack>

      {/* Used for debugging purposes */}
      <p>{filter}</p>

      <br /><br />

      {/* Using flex to display asset cards */}
      <Flex gap={31} direction="row" wrap="wrap">

        {/* Loop through the 'assets' array */}
        {assets.map((asset) => {

          return (
            <Card.Root key={asset.id} width="320px" variant="elevated">
              <Card.Body gap="2" colorPalette="gray">

                <Stack>
                  <Box h='140px'>

                    {/* Conditional rendering to display previews for png and jpg files*/}
                    {(asset.file_type === 'png' || asset.file_type === 'jpg') && (
                      <Center>
                        <Image
                          alt={asset.name}
                          src={asset.url}
                          w="full"
                          maxH="140px"
                          borderRadius="10px"
                        />
                      </Center>
                    )}

                    {/* Add later: Conditional rendering to display previews for mp4 videos */}

                    {/* Conditional rendering to display previews for glb models */}
                    {asset.file_type === 'glb' && (
                      <model-viewer
                        alt={asset.name}
                        src={asset.url}
                        shadow-intensity="1"
                        touch-action="pan-y"
                        camera-controls
                      />
                    )}

                  </Box>

                  {/* Display asset details (name, file size, description) */}
                  <Box>
                    <Card.Title>{asset.name}</Card.Title>
                    <p>{Number(asset.file_size).toFixed(2)} MB</p>
                    <Card.Description>{asset.description}</Card.Description>
                  </Box>

                </Stack>

                {/* Display asset details (uploaded by, datetime, tags) */}
                <Flex direction="column">

                  <Card.Description>
                    <b>Uploaded By:</b> {asset.uploaded_by}
                  </Card.Description>

                  <Card.Description>
                    <b>Datetime:</b> {asset.upload_datetime}
                  </Card.Description>

                  {/* IMPORTANT: Display tags */}
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

              {/* Footer displays feature buttons */}
              <Card.Footer justifyContent="flex-end">

                {/* Button: Preview */}
                <PreviewAssetModal asset={asset} />

                {/* Button: Download */}
                <Button variant="outline" onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}>
                  Download
                </Button>

                {/* Button: Edit */}
                <EditAssetModal asset={asset} />
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Flex>
    </div>
  );
}