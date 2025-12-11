"use client";

import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UploadAssetModal from "./UploadAssetModal";
import BasicFilterComponent from "./filters/BasicFilterComponent";
import TagFilterComponent from "./filters/TagFilterComponent";
import PreviewAssetModal from "./previews/PreviewAssetModal";
import EditAssetModal from "./EditAssetModal";
import useDownloader from "react-use-downloader";
import axios from "axios";

import { useSelector } from "react-redux";

export default function AssetCard() {
  //endpoint
  const BASE_API_URL_ASSETS = "http://127.0.0.1:8000/assets/";
  const BASE_API_URL_TAGS = "http://127.0.0.1:8000/tags/";

  //state var and setter
  const [assets, setAssets] = useState([]); // Stores list of each asset and its details
  const [assetTagMap, setAssetTagMap] = useState({});

  // Stores the filter keyword (e.g. ?ordering=name)
  const [filter, setFilter] = useState("");

  // Stores the tag filter
  const [tagFilter, setTagFilter] = useState("");

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
      // Use URLSearchParams() to build the query after /?
      let params = new URLSearchParams();

      // Filter by name, description, and file_type
      if (keyword) params.append("search", keyword);

      // Filter by A-Z, Z-A, Newest, Oldest
      if (filter) params.append("ordering", filter);

      // Filter by available tags (If available)
      if (tagFilter) params.append("tags", tagFilter);

      // Build the GET backend endpoint to retrieve filtered assets
      const url = BASE_API_URL_ASSETS + "?" + params.toString();

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
  }, [keyword, filter, tagFilter]);

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
      {/* Display filter components and upload button*/}
      <Flex gap="2" justify="space-between">
        {/* Filter based on A-Z, Z-A, newest, and latest */}
        <Box height="10">
          <BasicFilterComponent onChange={(e) => setFilter(e)} />
        </Box>

        {/* Filter based on existing tags */}
        <Box height="10">
          <TagFilterComponent onChange={(e) => setTagFilter(e)} />
        </Box>

        {/* Button: Upload */}
        <Box height="10" width="50" ml="auto">
          {localStorage.getItem("group") !== "Viewer" && <UploadAssetModal />}
        </Box>
      </Flex>

      {/* Used for debugging purposes */}
      {/* <p>{filter}</p> */}

      <br />
      <br />

      {/* Using flex to display asset cards */}
      <Flex gap={31} direction="row" wrap="wrap">
        {/* Loop through the 'assets' array */}
        {assets.map((asset) => {
          return (
            <Card.Root key={asset.id} width="320px" variant="elevated">
              <Card.Body gap="2" colorPalette="gray">
                <Stack>
                  <Box h="140px">
                    {/* Conditional rendering to display previews for png and jpg files*/}
                    {(asset.file_type === "png" ||
                      asset.file_type === "jpg") && (
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

                    {/* Conditional rendering to display previews for mp4 videos */}
                    {asset.file_type === "mp4" && (
                      <video
                        src={asset.url}
                        poster={asset.thumbnail_url}
                        muted
                        controls={false}
                        style={{
                          width: "100%",
                          maxHeight: "140px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    )}


                    {/* Conditional rendering to display previews for glb models */}
                    {asset.file_type === "glb" && (
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
                <Button
                  variant="surface"
                  onClick={() =>
                    download(asset.url, asset.name + "." + asset.file_type)
                  }
                >
                  Download
                </Button>

                {/* Button: Edit (disabled for Viewer) */}
                {localStorage.getItem("group") !== "Viewer" && (
                  <EditAssetModal asset={asset} />
                )}
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Flex>
    </div>
  );
}
