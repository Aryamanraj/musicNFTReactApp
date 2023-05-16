import React, { useState } from "react";
import { mintMusicNFT, getTokenMetadata } from "./MusicNFTInteraction";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
//import '../AddMusicPage.css';

const SongUploader = () => {
  const [metadata, setMetadata] = useState({
    coverMetadata: "",
    title: "",
    genre: "",
    tags: "",
    spotifyLink: "",
    soundcloudLink: "",
    youtubeLink: "",
    tiktokLink: "",
    artistName: "",
    releaseDate: "",
    recordLabel: "",
    distributor: "",
    songTitle: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      const fileMetadata = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        coverMetadata: JSON.stringify(fileMetadata),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(metadata);
    const _metadata = JSON.stringify(metadata)
    localStorage.setItem("metadataLocal", _metadata);
    console.log(JSON.parse(localStorage.getItem("metadataLocal")));
  };
  const navigate = useNavigate();
  const handleCreateNFT = async (e) => {
    e.preventDefault();
    try {
      const metadataTuple = Object.values(metadata);
      console.log(metadataTuple);
      localStorage.setItem("matadataTuple", metadataTuple);
      //await mintMusicNFT(metadataTuple);
      navigate('/mint-nft');
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const handleGetTokenMetadata = async (e) => {
    e.preventDefault();
    try {
      // Assuming you want to retrieve token metadata for the last token ID
      await getTokenMetadata(5);
    } catch (error) {
      console.error("Error retrieving token metadata:", error);
    }
  };

  return (
    <div>
      <form
        id="songUploaderForm"
        className="form-container"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="cover">Cover Image or Video:</label>
          <input
            type="file"
            id="cover"
            name="cover"
            onChange={handleFileChange}
            accept="image/*, video/*"
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={metadata.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={metadata.genre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Additional Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={metadata.tags}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="spotifyLink">Spotify Link:</label>
          <input
            type="text"
            id="spotifyLink"
            name="spotifyLink"
            value={metadata.spotifyLink}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="soundcloudLink">SoundCloud Link:</label>
          <input
            type="text"
            id="soundcloudLink"
            name="soundcloudLink"
            value={metadata.soundcloudLink}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="youtubeLink">YouTube Link:</label>
          <input
            type="text"
            id="youtubeLink"
            name="youtubeLink"
            value={metadata.youtubeLink}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="tiktokLink">TikTok Link:</label>
          <input
            type="text"
            id="tiktokLink"
            name="tiktokLink"
            value={metadata.tiktokLink}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="artistName">Artist Name:</label>
          <input
            type="text"
            id="artistName"
            name="artistName"
            value={metadata.artistName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="text"
            id="releaseDate"
            name="releaseDate"
            value={metadata.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="songTitle">Song Title:</label>
          <input
            type="text"
            id="songTitle"
            name="songTitle"
            value={metadata.songTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="recordLabel">Record Label:</label>
          <input
            type="text"
            id="recordLabel"
            name="recordLabel"
            value={metadata.recordLabel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="distributor">Distributor:</label>
          <input
            type="text"
            id="distributor"
            name="distributor"
            value={metadata.distributor}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Value</button>
      </form>

      <div>
        <h2>Create a Music NFT and choose Royalties</h2>
        <form onSubmit={handleCreateNFT}>
          <button type="submit">Create NFT & Handle Royalties</button>
        </form>
      </div>
    </div>
  );
};
export default SongUploader;
