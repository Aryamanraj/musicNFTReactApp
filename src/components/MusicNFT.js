import React, { useState, useEffect } from "react";
import { mintMusicNFT, getTokenMetadata } from "./MusicNFTInteraction";
import { useNavigate } from "react-router-dom";

import Toggle from "react-toggle";
import "react-toggle/style.css";

function MusicNFTInteraction() {
  const metadataLocal = JSON.parse(localStorage.getItem("metadataLocal"));
  const [metadata, setMetadata] = useState({
    cover: metadataLocal["coverMetadata"],
    title: metadataLocal["title"],
    genre: metadataLocal["genre"],
    tags: metadataLocal["tags"],
    spotifyLink: metadataLocal["spotifyLink"],
    soundcloudLink: metadataLocal["soundcloudLink"],
    youtubeLink: metadataLocal["youtubeLink"],
    tiktokLink: metadataLocal["tiktokLink"],
    artistName: metadataLocal["artistName"],
    songTitle: metadataLocal["songTitle"],
    releaseDate: metadataLocal["releaseDate"],
    recordLabel: metadataLocal["recordLabel"],
    distributor: metadataLocal["distributor"],
    creatorRoyalty: 10, // Default royalty percentage (can be adjusted)
    teamName: "",
    wallet: localStorage.getItem("Wallet_address"),
    isPrivateReporting: false, // Default value for reporting (can be adjusted)
  });

  useEffect(() => {
    // Load royalty percentage from local storage on component mount
    const storedRoyalty = localStorage.getItem("royaltyPercentage");
    if (storedRoyalty) {
      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        creatorRoyalty: parseInt(storedRoyalty),
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleMintNFT = async (e) => {
    e.preventDefault();
    try {
       var _metadata = JSON.stringify(metadata);
      localStorage.setItem("finalMetadata", _metadata);
      const _metadataLocal = Object.values(metadataLocal);
      console.log(_metadataLocal);
      const response = await mintMusicNFT(_metadataLocal);
      alert(response); // Display an alert for successful minting
      console.log(response); // Log the response to the console for debugging purposes
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT: " + error); // Display an alert for the error
    }
  };
  

  const handleNFTStats = async(e) =>{
    e.preventDefault();
    navigate('/NFT-stats')
  }

  const handleRoyaltySliderChange = (e) => {
    const royaltyPercentage = parseInt(e.target.value);
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      creatorRoyalty: royaltyPercentage,
    }));
    localStorage.setItem("royaltyPercentage", royaltyPercentage);
  };

  const handleReportingToggle = () => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      isPrivateReporting: !prevMetadata.isPrivateReporting,
    }));
  };


  return (
    <div>
      <h2>Mint a Music NFT</h2>
      <table>
        <tbody>
          <tr>
            <td>Cover:</td>
            <td>{metadata.cover}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>{metadata.title}</td>
          </tr>
          <tr>
            <td>Genre:</td>
            <td>{metadata.genre}</td>
          </tr>
          <tr>
            <td>Tags:</td>
            <td>{metadata.tags}</td>
          </tr>
          <tr>
            <td>Spotify Link:</td>
            <td>{metadata.spotifyLink}</td>
          </tr>
          <tr>
            <td>SoundCloud Link:</td>
            <td>{metadata.soundcloudLink}</td>
          </tr>
          <tr>
            <td>YouTube Link:</td>
            <td>{metadata.youtubeLink}</td>
          </tr>
          <tr>
            <td>TikTok Link:</td>
            <td>{metadata.tiktokLink}</td>
          </tr>
          <tr>
            <td>Artist Name:</td>
            <td>{metadata.artistName}</td>
          </tr>
          <tr>
            <td>Song Title:</td>
            <td>{metadata.songTitle}</td>
          </tr>
          <tr>
            <td>Release Date:</td>
            <td>{metadata.releaseDate}</td>
          </tr>
          <tr>
            <td>Record Label:</td>
            <td>{metadata.recordLabel}</td>
          </tr>
          <tr>
            <td>Distributor:</td>
            <td>{metadata.distributor}</td>
          </tr>
          <tr>
            <td>Creator Royalty Percentage:</td>
            <td>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={metadata.creatorRoyalty}
                name="creatorRoyalty"
                onChange={handleRoyaltySliderChange}
              />
              {metadata.creatorRoyalty}%
            </td>
          </tr>
          <tr>
            <td>Team Name:</td>
            <td>
              <input
                type="text"
                name="teamName"
                value={metadata.teamName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Wallet:</td>
            <td>
              <input
                type="text"
                name="wallet"
                value={localStorage.getItem("Wallet_address")}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Reporting:</td>
            <td>
              <label>
                <Toggle
                  name="isPrivateReporting"
                  checked={metadata.isPrivateReporting}
                  onChange={handleReportingToggle}
                />
                Private Reporting
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleMintNFT}>Mint NFT</button>
      <br></br>
      <button onClick={handleNFTStats}>See NFT Stats</button>
    </div>
  );
}

export default MusicNFTInteraction;
