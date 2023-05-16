import { ethers } from "ethers";

import MusicNFT from './MusicNFT.json'
 // Replace with the path to your contract's JSON file

const contractAddress = '0x6e5d7a8A408e067285b6Ce1EaFD40Afc7d04274f' //'0x3063ae1ae950032e6a2F40EcaAE2846a2e35B89F'; // Replace with your deployed contract address
// /////////////////////
const contractAddress_Mumbai = "0x475c6b5f3F557C7d17F5F6D672C8bF0784BBd9cF"


async function mintMusicNFT(metadata) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    //const balance = await provider.getBalance(accounts[0]);

    const signer = await provider.getSigner();

    const musicNFTContract = new ethers.Contract(contractAddress_Mumbai, MusicNFT.abi, signer);
    const transaction = await musicNFTContract.mintMusicNFT(signer.getAddress(), metadata);
    await transaction.wait();
    //console.log(balance);
    console.log('NFT minted successfully!');
    return "NFT minted Successfully!"
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

function extractNumberFromBigNumber(bigNumber) {
  if (bigNumber._isBigNumber && bigNumber._hex) {
    const hexString = bigNumber._hex;
    const numberString = hexString.replace(/^0x/, '');
    const decimalNumber = parseInt(numberString, 16);
    return decimalNumber;
  }

  return null;
}


async function getTokenMetadata() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    //const balance = await provider.getBalance(accounts[0]);

    const signer = await provider.getSigner();
    const musicNFTContract = new ethers.Contract(contractAddress_Mumbai, MusicNFT.abi, signer);
    const _tokenId = await musicNFTContract._tokenIds();
    console.log(_tokenId)
    const tokenId = await extractNumberFromBigNumber(_tokenId)
    const metadata = await musicNFTContract.getTokenMetadata(tokenId);
    console.log('Token Metadata:', metadata);
  } catch (error) {
    console.error('Error retrieving token metadata:', error);
  }
}

async function totalNFTMinted() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    const musicNFTContract = new ethers.Contract(contractAddress_Mumbai, MusicNFT.abi, signer);
    const _tokenId = await musicNFTContract._tokenIds();
    console.log(_tokenId)
    const tokenId = await extractNumberFromBigNumber(_tokenId)
    return tokenId;
  } catch (error) {
    console.error('Error retrieving token metadata:', error);
  }
}

//export { tester }
export { mintMusicNFT, getTokenMetadata, totalNFTMinted };