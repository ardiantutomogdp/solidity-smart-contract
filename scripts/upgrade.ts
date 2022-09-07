const { ethers, upgrades } = require("hardhat");
//the address of the deployed proxy
const PROXY = "0xD03Fd45a8292c7C5AE9bAF2AdAB84D45786a16e8";

async function main() {
  const CalculatorV2 = await ethers.getContractFactory("CalculatorV2");
  console.log("Upgrading Calculator...");
  await upgrades.upgradeProxy(PROXY, CalculatorV2);
  const currentImplAddress = await upgrades.erc1967.getImplementationAddress(
    PROXY
  );
  console.log("Calculator upgraded to: " + currentImplAddress);
}

main();
