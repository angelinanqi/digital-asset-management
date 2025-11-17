import { Button, Card, Tabs, DataList, NumberInput, Box, Grid, Flex, Table, Link, Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Sketch from "@uiw/react-color-sketch";
import useDownloader from "react-use-downloader";
import EditAssetModal from "../EditAssetModal";
import UpdateAssetModal from "../UpdateAssetModal";
import axios from "axios";

export default function PreviewAssetCardv2({ asset, exposure, shadowIntensity, shadowSoftness, hsva,
  onExposureChange, onShadowIntensityChange, onShadowSoftnessChange, onHsvaChange
 }) {
  const BASE_API_URL = "http://127.0.0.1:8000/assets/";
  const BASE_API_DELETE = "http://127.0.0.1:8000/delete-asset-by-code/";
  const BASE_FILEVER_URL = "http://127.0.0.1:8000/get-all-file-versions/";

  // Handler to download asset files
  const asset_code = asset.code;
  const { download } = useDownloader();

  const [allFiles, setAllFiles] = useState([]);

  const [disableAlpha, setDisableAlpha] = useState(false);

  // Only enable advanced settings for 3D models
  const is3DModel = asset.file_type === "glb";

  const metadata = [
    { label: "Name", value: asset.name },
    { label: "Code", value: asset.code },
    { label: "Description", value: asset.description },
    { label: "Version", value: asset.version_no },
    { label: "Upload Datetime", value: asset.upload_datetime },
    { label: "Uploaded By", value: asset.uploaded_by },
    { label: "File Type", value: asset.file_type },
  ];

  // Function to delete asset files
  const deleteAsset = async (asset_code) => {
    // Axios DELETE method: Delete an asset based on its ID
    await axios.delete(BASE_API_DELETE + asset_code + "/");
  };

  useEffect(() => {
    const fetchFileVersions = async () => {
      try {
        const res = await axios.get(BASE_FILEVER_URL + asset_code + "/");
        setAllFiles(res.data);
      } catch {
        console.error("Error: ", error);
      }
    };

    fetchFileVersions();
  }, [asset_code]);

  return (
    <>
      <Card.Root>
        <Card.Body height="">
          {/*metadata/advanced settings/version control tab*/}
          <Tabs.Root defaultValue="metadata" variant="outline">
            <Tabs.List>
              <Tabs.Trigger value="metadata">Metadata</Tabs.Trigger>

              {/* Only show Advanced tab if 3D model */}
              {is3DModel && (
                <Tabs.Trigger value="advanced">Advanced Settings</Tabs.Trigger>
              )}

              <Tabs.Trigger value="version">Version Control</Tabs.Trigger>
            </Tabs.List>

            {/*metadata tab*/}
            <Tabs.Content value="metadata">
              <DataList.Root orientation="horizontal">
                {metadata.map((item) => (
                  <DataList.Item key={item.label}>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                  </DataList.Item>
                ))}
                {/*file size requires formatting for decimal point*/}
                <DataList.Item>
                  <DataList.ItemLabel>File Size</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {Number(asset.file_size).toFixed(2)}MB
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>

              <Box marginTop="86px">
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    variant="surface"
                    onClick={() =>
                      download(asset.url, asset.name + "." + asset.file_type)
                    }
                  >
                    Download
                  </Button>

                  <Flex gap="10px">
                    {/* update btn (disabled for Viewer) */}
                    {localStorage.getItem("group") !== "Viewer" && (
                      <EditAssetModal asset={asset} />
                    )}

                    <UpdateAssetModal asset={asset} />

                    <Dialog.Root role="alertdialog" placement='center'>
                      <Dialog.Trigger asChild>
                        <Button variant="surface" colorPalette="red" onClick={() => deleteAsset(asset.code)}>
                          Delete
                        </Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Are you sure?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <p>
                                This action cannot be undone. This will permanently delete your
                                asset and remove it from the system.
                              </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </Dialog.ActionTrigger>
                              <Button variant="surface" colorPalette="red">Delete</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>

                  </Flex>
                </Flex>
              </Box>
            </Tabs.Content>

            {/*advanced settings tab*/}
            {is3DModel && (
              <Tabs.Content value="advanced">
                <Grid templateColumns="1fr 2fr" gap="50px">
                  <>
                    <Grid templateRows="repeat(3,1fr)" gap="10px">
                      <Box>
                        <p>Exposure</p>
                        <NumberInput.Root
                          width="150px"
                          value={exposure}
                          onValueChange={(e) => onExposureChange(e.value)}
                          min="0"
                          max="2"
                          step={0.01}
                          allowMouseWheel
                          marginTop="10px"
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                      </Box>

                      <Box>
                        <p>Shadow Intensity</p>
                        <NumberInput.Root
                          width="150px"
                          value={shadowIntensity}
                          onValueChange={(e) => onShadowIntensityChange(e.value)}
                          min="0"
                          max="2"
                          step={0.01}
                          allowMouseWheel
                          marginTop="10px"
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                      </Box>

                      <Box>
                        <p>Shadow Softness</p>
                        <NumberInput.Root
                          width="150px"
                          value={shadowSoftness}
                          onValueChange={(e) => onShadowSoftnessChange(e.value)}
                          min="0"
                          max="1"
                          step={0.01}
                          allowMouseWheel
                          marginTop="10px"
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                      </Box>
                    </Grid>
                  </>

                  <>
                    <Box>
                      <p>Background Colour</p>
                      <Box marginTop="10px">
                        <Sketch
                          style={{ width: 300 }}
                          color={hsva}
                          disableAlpha={disableAlpha}
                          onChange={(color) => {
                            onHsvaChange(color.hsva);
                          }}
                        />
                      </Box>
                    </Box>
                  </>
                </Grid>
              </Tabs.Content>
            )}

            {/*version control tab*/}
            <Tabs.Content value="version">
              <Box overflowY="auto">
                <Table.Root variant="outline">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Version No.</Table.ColumnHeader>
                      <Table.ColumnHeader>File</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {allFiles.map((a) => (
                      <Table.Row key={a.version_no}>
                        <Table.Cell>{a.version_no}</Table.Cell>
                        <Table.Cell>
                          <Link
                            variant="plain"
                            onClick={() =>
                              download(
                                "http://127.0.0.1:8000" + a.url,
                                a.name + "." + a.file_type
                              )
                            }
                          >
                            {a.name +
                              "(" +
                              a.version_no +
                              ")" +
                              "." +
                              a.file_type}
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Body>
      </Card.Root>
    </>
  );
}
