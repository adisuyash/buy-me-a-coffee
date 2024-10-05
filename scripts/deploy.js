const hre = require("hardhat");

async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.formatEther(balanceBigInt);  // Updated from utils.formatEther
}

async function consoleBalances(addresses) {
    let counter = 0;
    for (const address of addresses) {
        console.log(`Address ${counter} balance:`, await getBalances(address));
        counter++;
    }
}

async function consoleMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const name = memo.name;
        const from = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp}, name ${name}, address ${from}, message ${message}`);
    }
}

async function main() {
    // Get signers
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();

    // Deploy the Coffee contract
    const Coffee = await hre.ethers.getContractFactory("Coffee");
    const coffee = await Coffee.deploy();  // Deploy the contract

    await coffee.waitForDeployment();  // Updated from deployed()
    console.log("Address of contract:", await coffee.getAddress());  // Updated from coffee.address

    // Check balances before buying coffee
    const addresses = [
        owner.address,
        from1.address,
        from2.address,
        from3.address,
    ];
    console.log("Before buying coffee");
    await consoleBalances(addresses);

    // Buy coffee from multiple accounts
    const amount = { value: hre.ethers.parseEther("1") };  // Updated from utils.parseEther
    await coffee.connect(from1).buyCoffee("from1", "Very nice coffee", amount);
    await coffee.connect(from2).buyCoffee("from2", "Very nice course", amount);
    await coffee.connect(from3).buyCoffee("from3", "Very nice information", amount);

    // Check balances after buying coffee
    console.log("After buying coffee");
    await consoleBalances(addresses);

    // Get memos
    const memos = await coffee.getMemos();
    consoleMemos(memos);

    // Return the contract address
    return coffee.getAddress();
}

// Handle errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});