pragma solidity 0.8.16;

import "hardhat/console.sol";

struct Loan {
    address owner;
    address creditor; //terpinjam
    address debtor; // peminjam
    string attachmentURI;
    string status;
}

contract HutangV2 {
    Loan[] loanDatas;
    uint256 public totalLoans;
    error CanceledLoan(uint256 id);

    modifier onlyDebtor(uint256 index) {
        require(msg.sender == loanDatas[index].debtor);
        _;
    }

    modifier onlyCreditor(uint256 index) {
        require(msg.sender == loanDatas[index].creditor);
        _;
    }

    modifier onlyCreditorOrDebtor(uint256 index) {
        require(
            msg.sender == loanDatas[index].creditor ||
                msg.sender == loanDatas[index].debtor
        );
        _;
    }

    function compareStrings(string memory a, string memory b)
        private
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function createLoan(address _debtor) public returns (Loan memory) {
        Loan memory loan = Loan(msg.sender, msg.sender, _debtor, "", "active");
        loanDatas.push(loan);
        totalLoans++;
        return loan;
    }

    function approveLoan(uint256 index) public onlyDebtor(index) {
        Loan storage loan = loanDatas[index];
        loan.status = "approved";
        loanDatas[index] = loan;
    }

    function updateAttachmentURI(uint256 index, string memory uri)
        public
        onlyDebtor(index)
    {
        Loan storage loan = loanDatas[index];
        if (compareStrings(loanDatas[index].status, "canceled")) {
            revert CanceledLoan(index);
        }
        loan.attachmentURI = uri;
        loanDatas[index] = loan;
    }

    function finalizeLoan(uint256 index) public onlyCreditor(index) {
        Loan storage loan = loanDatas[index];
        loan.status = "finalized";
        loan.owner = loan.debtor;
        loanDatas[index] = loan;
    }

    function cancelLoan(uint256 index) public onlyCreditor(index) {
        Loan storage loan = loanDatas[index];
        loan.status = "canceled";
        loanDatas[index] = loan;
    }

    function getLoan(uint256 index)
        public
        view
        onlyCreditorOrDebtor(index)
        returns (Loan memory)
    {
        return loanDatas[index];
    }
}
