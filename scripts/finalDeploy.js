const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts with the account:", (await hre.ethers.getSigners())[0].address);

  // Get the contract factory - note the lowercase "chai" to match the contract name
  const Chai = await hre.ethers.getContractFactory("chai");

  // Deploy the contract
  const chai = await Chai.deploy();  // Remove gas settings from deploy call

  // Wait for deployment to complete
  await chai.waitForDeployment();

  // Get the deployed contract address
  console.log("Contract deployed to:", await chai.getAddress());
}

// Handle errors in main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during contract deployment:", error);
    process.exit(1);
  });