import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistProfileForm from './components/ArtistProfileForm';
import UserProfilePage from './components/UserProfilePage';
import AddMusicPage from './components/AddMusicPage';
import MusicNFT from './components/MusicNFT';
import Login from './components/login';
import NFTStats from './components/NFTStats'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/edit-profile" element={<ArtistProfileForm />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/add-music" element={<AddMusicPage />} />
        <Route path="/mint-nft" element={<MusicNFT />} />
        <Route path="/NFT-stats" element={<NFTStats />} />
      </Routes>
    </Router>
  );
};

export default App;
