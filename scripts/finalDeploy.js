const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts with the account:", (await hre.ethers.getSigners())[0].address);

  // Get the contract factory - note the lowercase "coffee" to match the contract name
  const Coffee = await hre.ethers.getContractFactory("Coffee");

  // Deploy the contract
  const coffee = await Coffee.deploy();  // Remove gas settings from deploy call

  // Wait for deployment to complete
  await coffee.waitForDeployment();

  // Get the deployed contract address
  console.log("Contract deployed to:", await coffee.getAddress());
}

// Handle errors in main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during contract deployment:", error);
    process.exit(1);
  });