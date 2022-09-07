// const { ethers, upgrades } = require("hardhat");

import { ethers, upgrades } from "hardhat";

async function main() {
  // const baseTokenURI = "https://google.com";

  const HutangV1 = await ethers.getContractFactory("HutangV1");
  console.log("Deploying HutangV1...");
  const hutangV1 = await upgrades.deployProxy(HutangV1);
  await hutangV1.deployed();
  console.log("Proxy address:", hutangV1.address);
  const currentImplAddress = await upgrades.erc1967.getImplementationAddress(
    hutangV1.address
  );
  console.log("Implementation address: " + currentImplAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
