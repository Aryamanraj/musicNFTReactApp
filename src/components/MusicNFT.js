import React, { useState, Component } from 'react';
import { mintMusicNFT, getTokenMetadata } from './MusicNFTInteraction';
//import { tester } from './MusicNFTInteraction';
function MusicNFTInteraction() {
  const [metadata, setMetadata] = useState({
    cover: '',
    title: '',
    genre: '',
    tags: '',
    spotifyLink: '',
    soundcloudLink: '',
    youtubeLink: '',
    tiktokLink: '',
    artistName: '',
    songTitle: '',
    releaseDate: '',
    recordLabel: '',
    distributor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [name]: value,
    }));
  };

  const handleMintNFT = async (e) => {
    e.preventDefault();
    try {
      await mintMusicNFT(metadata);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  const handleGetTokenMetadata = async (e) => {
    e.preventDefault();
    try {
      // Assuming you want to retrieve token metadata for token ID 1
      await getTokenMetadata(4);
    } catch (error) {
      console.error('Error retrieving token metadata:', error);
    }
  };

  return (
    <div>
      <h2>Mint a Music NFT</h2>
      <form onSubmit={handleMintNFT}>
        <label htmlFor="cover">Cover:</label>
        <input type="text" id="cover" name="cover" value={metadata.cover} onChange={handleInputChange} required />

        {/* Add additional input fields for other metadata properties */}

        <button type="submit">Mint NFT</button>
      </form>

      <h2>Get Token Metadata</h2>
      <button onClick={handleGetTokenMetadata}>Get Token Metadata for Token ID 1</button>
    </div>
  );
}

export default MusicNFTInteraction;
