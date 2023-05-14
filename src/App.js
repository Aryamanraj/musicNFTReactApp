import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistProfileForm from './components/ArtistProfileForm';
import UserProfilePage from './components/UserProfilePage';
import AddMusicPage from './components/AddMusicPage';
import MusicNFT from './components/MusicNFT';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistProfileForm />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/add-music" element={<AddMusicPage />} />
        <Route path="/mint-nft" element={<MusicNFT />} />
      </Routes>
    </Router>
  );
};

export default App;
