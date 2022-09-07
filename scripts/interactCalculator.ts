import { ethers } from "ethers";
import { getEnv } from "../hardhat.config";

const contract = require("../artifacts/contracts/CalculatorV2.sol/CalculatorV2.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  "maticmum",
  getEnv("PROVIDER_API_KEY")
);

// Signer
const signer = new ethers.Wallet(getEnv("PRIVATE_KEY"), alchemyProvider);

// Contract
const Contract = new ethers.Contract(
  "0xD03Fd45a8292c7C5AE9bAF2AdAB84D45786a16e8",
  contract.abi,
  signer
);

async function main() {
  const val = await Contract.getVal();
  console.log("val: " + val);
  const add = await Contract.add(1, 2);
  console.log("Add: " + add);
  //v2
  const multiply = await Contract.multiply(1, 2);
  console.log("multiply: " + multiply);
}
main();
