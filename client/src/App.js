import abi from "./contract/Coffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import Coffee from "./Coffee.png";
// import "./styles/App.css";


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x592C7BEE8B59c0bbE6E431e35b47469CD56de421";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // Reload the page when the chain or account changes
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          // Updated ethers v6 syntax
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(accounts[0]); // Update to set the first account
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      } finally {
        setLoading(false); // Set loading to false after trying to connect
      }
    };
    connectWallet();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while connecting to wallet
  }

  return (
    <div className="bg-some-white h-full">
      <div className="bg-default-lemon-yellow flex items-center  justify-center">
        <div className="m-10" >
          <img src={Coffee} className="img-fluid rounded-full ml-4 w-[150px]" alt="Coffee"   />
        </div>
        <div>
          <h2 className="text-5xl text-center">Buy Adi a Coffee!</h2>
          <p className="text-center .text-1-3em" >Treat Aditya to a coffee using crypto on the NeoX Chain!</p>
        </div>
        <div className="w-[200px]"></div>
      </div>
      <p className=" text-center text-gray-500 text-lg mt-2.5 ml-1.25">
        <small>Connected Account - {account}</small>
      </p>
      <div className="container"> 
        <Buy state={state} />
        <Memos state={state} />
      </div>
      <div className="mt-6.25 mb-5 text-center"
      >Built with ❤️ by <a href="https://github.com/AdiSuyash" target="_blank" rel="noopener noreferrer">AdiSuyash</a> </div>
    </div>
  );
}

export default App;