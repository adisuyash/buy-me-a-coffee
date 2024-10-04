require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const NEO_X_URL = process.env.NEO_X_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    neoxt4: {
      url: NEO_X_URL,
      accounts: [PRIVATE_KEY],
      gas: 3000000, // Gas limit
      gasPrice: 40000000000, // Increased to 40 gwei from 20 gwei
      // Adding EIP-1559 specific settings
      maxFeePerGas: 40000000000, // 40 gwei
      maxPriorityFeePerGas: 40000000000, // 40 gwei
    },
  },
};