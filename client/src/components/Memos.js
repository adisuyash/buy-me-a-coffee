import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      try {
        const fetchedMemos = await contract.getMemos();
        console.log("Fetched Memos:", fetchedMemos); // Log the fetched memos to inspect the structure

        // Convert the Proxy object to an array, map through it, and reverse the order
        const formattedMemos = fetchedMemos
          .map((memo) => ({
            name: memo[0],          // Access the name directly from the Proxy object
            message: memo[1],       // Access the message directly
            timestamp: Number(memo[2]), // Access and convert the timestamp
            from: memo[3],          // Access the sender address
          }))
          .reverse(); // Reverse the order of memos so the latest appears first

        setMemos(formattedMemos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract) {
      memosMessage();
    }
  }, [contract]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading messages...</p>;
  }

  return (
    <>
      <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "500", marginTop: "20px" }}>Aditya's Previous Sponsors</p>
      {memos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No messages available.</p>
      ) : (
        memos.map((memo) => {
          return (
            <div className="container-fluid" style={{ width: "100%" }} key={memo.timestamp}>
              <table style={{ marginBottom: "10px", width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        padding: "10px 15px",  // Add consistent padding
                        textAlign: "center",   // Align content to center
                        width: "20%",          // Define fixed width for name
                      }}
                    >
                      {memo.name} {/* Display name */}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        padding: "10px 15px",  // Add consistent padding
                        textAlign: "center",   // Align content to center
                        width: "30%",          // Define fixed width for timestamp
                      }}
                    >
                      {new Date(memo.timestamp * 1000).toLocaleString()} {/* Display timestamp */}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        padding: "10px 15px",  // Add consistent padding
                        textAlign: "center",   // Align content to center
                        width: "30%",          // Define fixed width for message
                      }}
                    >
                      {memo.message} {/* Display message */}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        padding: "10px 15px",  // Add consistent padding
                        textAlign: "center",   // Align content to center
                        width: "20%",          // Define fixed width for sender address
                      }}
                    >
                      {memo.from} {/* Display sender address */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </>
  );
};

export default Memos;
