const { ethers, upgrades } = require("hardhat");
//the address of the deployed proxy
const PROXY = "0x850f209BFcd313ce7CC5bB8835007886ac0981D3";

async function main() {
  const HutangV2 = await ethers.getContractFactory("HutangV2");
  console.log("Upgrading Hutang...");
  await upgrades.upgradeProxy(PROXY, HutangV2);
  const currentImplAddress = await upgrades.erc1967.getImplementationAddress(
    PROXY
  );
  console.log("Hutang upgraded to: " + currentImplAddress);
  // const CalculatorV2 = await ethers.getContractFactory("CalculatorV2");
  // console.log("Upgrading Calculator...");
  // await upgrades.upgradeProxy(PROXY, CalculatorV2);
  // const currentImplAddress = await upgrades.erc1967.getImplementationAddress(
  //   PROXY
  // );
  // console.log("Calculator upgraded to: " + currentImplAddress);
}

main();
