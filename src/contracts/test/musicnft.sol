// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MusicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;

    struct MusicMetadata {
        string cover;
        string title;
        string genre;
        string tags;
        string spotifyLink;
        string soundcloudLink;
        string youtubeLink;
        string tiktokLink;
        string artistName;
        string songTitle;
        string releaseDate;
        string recordLabel;
        string distributor;
    }

    mapping(uint256 => MusicMetadata) private _tokenMetadata;

    constructor() ERC721("MusicNFT", "MUSIC") {}

    function mintMusicNFT(address to, MusicMetadata memory metadata)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenId.toString());

        _tokenMetadata[tokenId] = metadata;

        return tokenId;
    }

    function getTokenMetadata(uint256 tokenId)
        public
        view
        returns (MusicMetadata memory)
    {
        return _tokenMetadata[tokenId];
    }
}
