import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";

require("dotenv").config();

export const getEnv = (key: string) => {
  const data = process.env[key];
  if (data === undefined) {
    throw new Error("Env must be set!");
  }
  return data;
};

const config: HardhatUserConfig = {
  solidity: "0.8.16",
  networks: {
    maticmum: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${getEnv(
        "PROVIDER_API_KEY"
      )}`,
      accounts: [getEnv("PRIVATE_KEY")],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${getEnv("PROVIDER_API_KEY")}`,
      accounts: [getEnv("PRIVATE_KEY")],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: getEnv("ETHERSCAN_API_KEY"),
      ropsten: getEnv("ETHERSCAN_API_KEY"),
      rinkeby: getEnv("ETHERSCAN_API_KEY"),
      goerli: getEnv("ETHERSCAN_API_KEY"),
      kovan: getEnv("ETHERSCAN_API_KEY"),
      polygon: getEnv("ETHERSCAN_API_KEY"),
      polygonMumbai: getEnv("ETHERSCAN_API_KEY"),
    },
  },
};

export default config;
