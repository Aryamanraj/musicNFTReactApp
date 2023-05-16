import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../ArtistProfileForm.css'; // Import the CSS file
import { create } from "ipfs-http-client";

const ArtistProfileForm = () => {
  const wallet_addr = localStorage.getItem("Wallet_address");
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [background, setBackground] = useState(null);
  const [about, setAbout] = useState("");
  const [walletAddress, setWalletAddress] = useState(wallet_addr);
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const projectId = "2PkMuAl3iVvNL1t5If6Po8QCO9p";
  const projectSecretKey = "a4ecaf3424ee78174b8bbd8f2dfc8b86";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
  let ipfs;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const ipfsUploadHandler = async (f) => {
    const files = f;
    console.log(f);
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    const file = files[0];
    const result = await ipfs.add(file);
    console.log(result.path);
    console.log(result.cid);
    return result.path;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const _profiles = form[0].files;
    const _background = form[1].files;
    const _about = form[2].value;
    const _walletAddr = form[3].value;
    const _socialMediaLink = form[4].value;
    const cid1 = await ipfsUploadHandler(_profiles);
    const cid2 = await ipfsUploadHandler(_background);

    // saving data on localstorage
    localStorage.setItem("about", _about);
    localStorage.setItem("walletAddress", _walletAddr);
    localStorage.setItem("socialMediaLinks", _socialMediaLink);
    localStorage.setItem("profilePicture", cid1);
    localStorage.setItem("background", cid2);
  
    navigate(
      `/profile`
    );

    console.log(cid1);
    console.log(cid2);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="image-input">
            <label>Profile Picture</label>
            <br></br>
            <input type="file" onChange={handleProfilePictureChange} />
          </div>
          <div className="image-input">
            <label>Background</label>
            <br></br>
            <input
              type="file"
              onChange={handleBackgroundChange}
              className="input-file"
            />
          </div>
          <div>
            <textarea
              value={about}
              placeholder="About"
              onChange={handleAboutChange}
              className="login-input"
            />
          </div>
          <div>
            <label>Wallet Address</label>
            <br></br>
            <input
              type="text"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={handleWalletAddressChange}
              className="login-input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Social Media Links"
              value={socialMediaLinks}
              onChange={handleSocialMediaLinksChange}
              className="login-input"
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ArtistProfileForm;
