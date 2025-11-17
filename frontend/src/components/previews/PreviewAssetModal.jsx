import { Box, Button, CloseButton, Dialog, Grid, Portal, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { hsvaToHex } from "@uiw/color-convert";
import PreviewAssetCardv2 from "./PreviewAssetCardv2";
import PreviewImageAsset from "./PreviewImageAsset";
import PreviewVideoAsset from "./PreviewVideoAsset";

export default function PreviewAssetModal({ asset }) {
  const [exposure, setExposure] = useState(1);
  const [shadowIntensity, setShadowIntensity] = useState(1);
  const [shadowSoftness, setShadowSoftness] = useState(1);
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100, a: 0 });

  return (
    <>
      {/* Button: Preview - > Opens */}
      <Dialog.Root size="cover" placement="center">
        <Dialog.Trigger asChild>
          <Button variant="outline">Preview</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <Flex
                  direction="column"
                  gap="10px"
                  padding="10px"
                  alignItems="flex-start"
                >
                  <Box>
                    <Heading size="2xl" fontWeight="bold" marginTop="20px">
                      {asset.name}
                    </Heading>
                  </Box>

                  <Box>
                    <Grid templateColumns="4fr 3fr" gap="20px">
                      <Box
                        borderWidth="1px"
                        rounded="md"
                        bg={
                          asset.file_type === "png" || asset.file_type === "jpg" || asset.file_type === "mp4"
                            ? "gray.100"
                            : "transparent"
                        }
                      >
                        {/* Display 3D models */}
                        {asset.file_type === "glb" && (
                          <model-viewer
                            alt={asset.name}
                            src={asset.url}
                            shadow-intensity={shadowIntensity}
                            shadow-softness={shadowSoftness}
                            exposure={exposure}
                            camera-controls
                            auto-rotate
                            touch-action="pan-y"
                            environment-image="neutral"
                            style={{
                              width: "700px",
                              height: "600px",
                              borderRadius: "12px",
                              backgroundColor: hsvaToHex(hsva),
                            }}
                          />
                        )}

                        {/* Display png and jpg images */}
                        {(asset.file_type === "png" ||
                          asset.file_type === "jpg") && (
                          <PreviewImageAsset assetURL={asset.url} />
                        )}

                        {/* Display mp4 */}
                        {asset.file_type === "mp4" && (
                          <PreviewVideoAsset assetURL={asset.url} />
                        )}
                      </Box>

                      <Box>

                        <PreviewAssetCardv2
                        asset={asset}
                        exposure={exposure}
                        shadowIntensity={shadowIntensity}
                        shadowSoftness={shadowSoftness}
                        hsva={hsva}

                        onExposureChange={setExposure}
                        onShadowIntensityChange={setShadowIntensity}
                        onShadowSoftnessChange={setShadowSoftness}
                        onHsvaChange={setHsva}
                        />
                      </Box>

                    </Grid>
                  </Box>
                </Flex>

                {/* Refactor this part (New UI) */}
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
