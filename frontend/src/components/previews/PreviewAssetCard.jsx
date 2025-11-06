import { Button, Card, Stack } from '@chakra-ui/react';
import EditAssetModal from '../EditAssetModal';
import useDownloader from 'react-use-downloader';
import axios from 'axios';

export default function PreviewAssetCard({ asset }) {

    // Handler to download asset files
    const { download } = useDownloader();

    // Function to delete asset files
    const deleteAsset = async (asset_id) => {
        // Axios DELETE method: Delete an asset based on its ID
        await axios.delete('http://127.0.0.1:8000/assets/' + asset_id + '/');
    }

    return (
        <>

            <Card.Root variant='elevated'>
                <Card.Body>

                    <Card.Title>Asset Metadata</Card.Title> <br />
                    <Card.Description>
                        <b>Model Code:</b> {asset.code} <br />
                        <b>Name:</b> {asset.name} <br />
                        <b>Description:</b> {asset.description} <br />
                        <b>Upload Datetime:</b> {asset.upload_datetime} <br />
                        <b>Uploaded By:</b> {asset.uploaded_by} <br />
                        <b>File Type:</b> {asset.file_type} <br />
                        <b>FIle Size:</b> {Number(asset.file_size).toFixed(2)} MB <br />
                    </Card.Description> <br />

                    <Stack>

                        <Button
                            variant='outline'
                            onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}
                        >
                            Download
                        </Button>

                        {/* Button: Edit Asset */}
                        <EditAssetModal asset={asset} />

                        <Button variant='outline'>Update</Button>

                        <Button
                            variant='outline'
                            onClick={() => deleteAsset(asset.id)}
                        >
                            Delete
                        </Button>
                    </Stack>

                </Card.Body>
            </Card.Root>

        </>
    );
}