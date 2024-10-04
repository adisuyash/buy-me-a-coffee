import { useState } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;

    // Check if the contract is available
    if (!contract) {
      alert("Contract not available. Please connect your wallet.");
      return;
    }

    setLoading(true); // Set loading to true while processing

    try {
      console.log("Sending transaction with:", { name, message });
      const amount = { value: ethers.parseEther("0.001") };

      // Send the transaction
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      
      console.log("Transaction is done");

      // Clear the form
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed! Please check console for details.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
      <form onSubmit={buyChai}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!state.contract || loading} // Disable button if contract is not available or if loading
        >
          {loading ? "Processing..." : "Pay"} {/* Change button text based on loading state */}
        </button>
      </form>
    </div>
  );
};

export default Buy;
