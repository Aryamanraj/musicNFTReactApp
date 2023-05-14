import React, { useState } from 'react';

const ArtistProfileForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [background, setBackground] = useState(null);
  const [about, setAbout] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState('');

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setBackground(file);
  };

  const handleAboutChange = (e) => {
    const text = e.target.value;
    setAbout(text);
  };

  const handleWalletAddressChange = (e) => {
    const address = e.target.value;
    setWalletAddress(address);
  };

  const handleSocialMediaLinksChange = (e) => {
    const links = e.target.value;
    setSocialMediaLinks(links);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send the form data to the backend (Node.js) for processing
    console.log({
      profilePicture,
      background,
      about,
      walletAddress,
      socialMediaLinks,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Profile Picture</label>
        <input type="file" onChange={handleProfilePictureChange} />
      </div>
      <div>
        <label>Background</label>
        <input type="file" onChange={handleBackgroundChange} />
      </div>
      <div>
        <label>About</label>
        <textarea value={about} onChange={handleAboutChange} />
      </div>
      <div>
        <label>Wallet Address</label>
        <input type="text" value={walletAddress} onChange={handleWalletAddressChange} />
      </div>
      <div>
        <label>Social Media Links</label>
        <input type="text" value={socialMediaLinks} onChange={handleSocialMediaLinksChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ArtistProfileForm;
