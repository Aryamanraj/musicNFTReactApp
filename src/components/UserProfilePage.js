import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import './UserProfilePage.css'; // Import the CSS file

const UserProfilePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const about = queryParams.get('about');
  const walletAddress = queryParams.get('walletAddress');
  const socialMediaLinks = queryParams.get('socialMediaLinks');
  const profilePicture = queryParams.get('profilePicture');
  const background = queryParams.get('background');
  const sectionStyle = {
    background: `url(https://ipfs.io/ipfs/${background}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  };
  const sectionStyle1 = {
      "width": "150px",
      "height": "150px",
      "object-fit": "cover",
      "border-radius": "50%"
    }
    const navigate = useNavigate();

    const handleAddMusic = () => {
      navigate(`/add-music?walletAddress=${walletAddress}`);}
  
  


  return (
    <div className='pager'>
      
      <h1 className="dashboard-title">User Profile</h1>
      <div className='login-page'>
      <div style={sectionStyle}>
          <div className="dashboard-about">
            <h2>About</h2>
            <p>{about}</p>
          </div>
          <div className="dashboard-wallet">
            <h2>Wallet Address</h2>
            <p>{walletAddress}</p>
          </div>
          <div className="dashboard-links">
            <h2>Social Media Links</h2>
            <p>{socialMediaLinks}</p>
          </div>
          <div>
            <img
              className="profile-picture"
              style={sectionStyle1}
              src={"https://ipfs.io/ipfs/" + profilePicture}
              alt="Profile Picture"
            />
          </div>
        </div>
        </div>
        <button onClick={handleAddMusic}>Add Music</button>
      </div>
  );
};

export default UserProfilePage;
