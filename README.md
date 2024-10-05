# Coffee Buying DApp

🍵 A dApp for purchasing Coffee using crypto while including a personalized message. ☕️

## Getting Started

To get this DApp running, follow the steps below:

### Clone the Repository

```
git clone https://github.com/adisuyash/buy-me-a-coffee.git
```

### Contract Compilation and Deployment

1. Install dependencies:

   ```
   npm install
   ```

2. Compile the contracts:

   ```
   npx hardhat compile
   ```

3. Create a `.env` file and copy the contents from the `.env.example` file into it.

   - The RPC URL of **NeoX Testnet T4** is `https://neoxt4seed1.ngd.network/` and your private key in the `.env` file.

4. Deploy the smart contract:
   ```
   npx hardhat run scripts/finalDeploy.js --network <network-name>
   ```
   Replace `<network-name>` with the desired network. Here we are using **neoxt4**.

### Frontend Setup

1. Ensure you have MetaMask installed in your browser.

2. Navigate to the `client` directory:

   ```
   cd client
   ```

3. Install frontend dependencies:

   ```
   npm install
   ```

4. Start the frontend server:
   ```
   npm start
   ```

## Usage

Once the **Buy Me a Coffee** dApp is set up:

1. Connect your MetaMask wallet to the DApp.
2. Send cryptocurrency to purchase Coffee.
3. Write a sweet message to accompany your purchase.
4. Enjoy your Coffee!

