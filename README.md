# Buy Adi a Coffee - DApp

An application for purchasing Coffee using crypto while including a personalized message ☕️


Deployment Link: https://buyadiacoffee.vercel.app

Contract Address (Deployed on NeoX T4 Testnet): [0x546494491acF698C610513d231e0cB35c1fC59b9](https://xt4scan.ngd.network/address/0x546494491acF698C610513d231e0cB35c1fC59b9)

![image](https://github.com/user-attachments/assets/878ae2cf-a288-4e7f-a84d-543f52193f42)


# Getting Started

To get this **Buy Adi a Coffee - DApp** running, follow the steps below:

### Clone the Repository
   ```bash
   git clone https://github.com/adisuyash/buy-me-a-coffee.git
   ```

### Contract Compilation & Deployment

1. Install dependencies:
   ```
   npm install
   ```

2. Compile the contracts:
   ```
   npx hardhat compile
   ```

3. Create a `.env` file similar to:

   ```
   NEO_X_URL=https://neoxt4seed1.ngd.network/
   PRIVATE_KEY=
   ```

4. Deploy the smart contract:
   ```
   npx hardhat run scripts/finalDeploy.js --network neoxt4
   ```

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

Once the **Buy Adi a Coffee** dApp is set up:

1. Connect your MetaMask wallet to the DApp.
2. Send cryptocurrency to purchase Coffee.
3. Write a sweet message to accompany your purchase.
4. Enjoy your Coffee!
