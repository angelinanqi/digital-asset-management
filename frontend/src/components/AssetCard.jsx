'use client';

import { Avatar, Button, Card, Flex, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import PreviewAssetModal from './previews/PreviewAssetModal';
import EditAssetModal from './EditAssetModal';
import useDownloader from 'react-use-downloader';
import axios from 'axios';

export default function AssetCard() {
    // Stores list of each asset and its details
    const [assets, setAssets] = useState([]);

    // TEST: Stores the search keyword 
    const [searchKeyword, setSearchKeyword] = useState('');

    // Handler to download asset files
    const { download } = useDownloader();

    const deleteAsset = async (asset_id) => {
        // Axios DELETE method: Delete an asset based on its ID
        await axios.delete('http://127.0.0.1:8000/assets/' + asset_id + '/');
    }

    useEffect(() => {
        // Call this function to retrieve all assets
        // Note: Using [] to only call getAssets() once for each render

        const getAssets = async () => {
            const url = searchKeyword 
                ? 'http://127.0.0.1:8000/assets/?search=' + searchKeyword
                : 'http://127.0.0.1:8000/assets/'

            const response = await axios.get(url);

            setAssets(response.data.results);

        }

        getAssets();

    }, [searchKeyword]);

    // JSX and Chakra UI components
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
            
            <br/>

            <h1>{searchKeyword}</h1>


            {/* Loop through the 'assets' array based on ID */}
            <Flex gap={31} direction='row' wrap='wrap'>
                {assets.map((asset) => {
                    return (
                        <Card.Root
                            key={asset.id}
                            width='320px'
                            variant='elevated'
                            colorPalette='purple'
                        >
                            <Card.Body gap='2' colorPalette='gray'>
                                {/* Using Flex to display preview, asset name, and size */}
                                <Flex gap='4'>
                                    {/* Display preview (image) of asset */}
                                    <Avatar.Root size='xl' shape='rounded'>
                                        <Avatar.Image src={asset.url} />
                                    </Avatar.Root>

                                    {/* Display asset name and size (in MB) */}
                                    <Flex direction='column'>
                                        <Card.Title>{asset.name}</Card.Title>
                                        <p>{asset.file_size} MB</p>
                                    </Flex>
                                </Flex>

                                {/* Display asset description */}
                                <Card.Description>{asset.description}</Card.Description>

                                {/* Display other asset details (uploaded_by and upload_datetime) */}
                                <Flex direction='column'>
                                    <Card.Description>
                                        <b>Uploaded By:</b> {asset.uploaded_by}
                                    </Card.Description>
                                    <Card.Description>
                                        <b>Datetime: </b> {asset.upload_datetime}
                                    </Card.Description>
                                </Flex>
                            </Card.Body>

                            {/* Asset card footer with buttons and its dialogs */}
                            <Card.Footer justifyContent='flex-end'>

                                {/* NOTE: INSERT PREVIEW BUTTON HERE */}
                                <PreviewAssetModal asset={asset}/>

                                {/* Can insert more features here (Button) */}
                                <Button
                                    variant='outline'
                                    onClick={() => download(asset.url, asset.name + '.' + asset.file_type)}
                                >
                                    Download
                                </Button>

                                {/* Button: Edit asset (name and description) */}
                                <EditAssetModal asset={asset}/>
                                
                            </Card.Footer>
                        </Card.Root>
                    );
                })}
            </Flex>
        </div>
    );
}
