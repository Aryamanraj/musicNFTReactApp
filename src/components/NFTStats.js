import React, { useEffect, useState } from 'react';
import { getTokenMetadata, totalNFTMinted } from './MusicNFTInteraction';

function NFTStats() {
  const [metadata, setMetadata] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [reportingStatus, setReportingStatus] = useState(false);
  const [creatorRoyalty, setCreatorRoyalty] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
      const localStorage_finalMetadata = JSON.parse(localStorage.getItem("finalMetadata"));
      console.log("hello",localStorage_finalMetadata["isPrivateReporting"])
        // Fetch token metadata
        const metadata = await getTokenMetadata();
        setMetadata(metadata);

        // Fetch total NFTs minted
        const mintedCount = await totalNFTMinted();
        setTotalMinted(mintedCount);

        // Get team name from local storage
        const storedTeamName = localStorage_finalMetadata["teamName"]
        setTeamName(storedTeamName);

        // Get wallet address from local storage
        const storedWalletAddress = localStorage.getItem('Wallet_address');
        setWalletAddress(storedWalletAddress);

        // Get reporting status from local storage
        const storedReportingStatus = localStorage_finalMetadata["isPrivateReporting"]
        setReportingStatus(Boolean(storedReportingStatus));

        // Get creator royalty percentage from local storage
        const storedCreatorRoyalty = localStorage_finalMetadata["creatorRoyalty"]
        setCreatorRoyalty(parseInt(storedCreatorRoyalty));
      } catch (error) {
        console.error('Error fetching NFT stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>NFT Stats</h2>
      <table>
        <tbody>
          <tr>
            <td>Total NFTs Minted:</td>
            <td>{totalMinted}</td>
          </tr>
          <tr>
            <td>Team Name:</td>
            <td>{teamName}</td>
          </tr>
          <tr>
            <td>Wallet Address:</td>
            <td>{walletAddress}</td>
          </tr>
          <tr>
            <td>Reporting Status:</td>
            <td>{reportingStatus ? 'Private' : 'Public'}</td>
          </tr>
          <tr>
            <td>Creator Royalty Percentage:</td>
            <td>{creatorRoyalty}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NFTStats;
