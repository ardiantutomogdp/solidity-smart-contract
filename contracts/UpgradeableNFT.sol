pragma solidity 0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

struct Loan {
    address owner;
    address from;
    address to;
    uint256 attachmentId;
    string status;
}

contract UpgradeableNFT is ERC721URIStorageUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    string public baseURI;
    Loan[] LoanDatas;
    uint256 totalLoans;

    event BaseURIUpdated(string indexed oldValue, string indexed newValue);

    function initialize(string memory baseUri) public initializer {
        __ERC721_init("Loan", "HTG");
        __Ownable_init();
        totalLoans = 0;
        baseURI = baseUri;
    }

    function createLoan(address issuer, address to) public {
        uint256 attachmentId = _createLoanAttachment(issuer, "");
        Loan memory loan = Loan(issuer, issuer, to, attachmentId, "active");
        LoanDatas[totalLoans] = loan;
        totalLoans++;
    }

    function _createLoanAttachment(address issuer, string memory tokenUri)
        internal
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(issuer, id);
        _setTokenURI(id, tokenUri);

        return id;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        emit BaseURIUpdated(baseURI, _newBaseURI);
        baseURI = _newBaseURI;
    }
}
