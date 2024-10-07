import { useState } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state

  const buyCoffee = async (event) => {
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
      const transaction = await contract.buyCoffee(name, message, amount);
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
    <div className="container mx-auto w-1/2 mt-6.25">
      <form onSubmit={buyCoffee}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
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
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
          disabled={!state.contract || loading} // Disable button if contract is not available or if loading
        >
          {loading ? "Processing..." : "Send Now!"} {/* Change button text based on loading state */}
        </button>
      </form>
    </div>
  );
};

export default Buy;
