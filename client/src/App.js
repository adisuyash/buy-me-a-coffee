import abi from "./contract/Coffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import Coffee from "./Coffee.png";
// import "./App.css";


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
    <div className="bg-blue-300" style={{ background: "#efefef", height: "100%", margin: "0" }}>
      <div className="bg-default-lemon-yellow" style={{   display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "25px", paddingTop: "25px" }}>
        <div style={{ width: "200px", marginRight: "40px" }}>
          <img src={Coffee} className="img-fluid" alt="Coffee" width="150px" style={{ borderRadius: "100%", marginLeft: "5px" }} />
        </div>
        <div>
          <h2 className="display-2 text-center">Buy Adi a Coffee!</h2>
          <p className="text-center" style={{fontSize: "1.3em"}}>Treat Aditya to a coffee using crypto on the NeoX Chain!</p>
        </div>
        <div style={{ width: "200px" }}></div>
      </div>
      <p className="text-muted lead" style={{ marginTop: "10px", marginLeft: "5px", textAlign: "center" }}>
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
      <div style={{ marginTop: "25px",marginBottom: "20px", textAlign: "center" }}>Built with ❤️ by <a href="https://github.com/AdiSuyash" target="_blank" rel="noopener noreferrer">AdiSuyash</a> </div>
    </div>
  );
}

export default App;