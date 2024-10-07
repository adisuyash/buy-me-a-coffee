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

        // Convert the Proxy object to an array and map through it
        const formattedMemos = fetchedMemos.map((memo) => ({
          name: memo[0],          // Access the name directly from the Proxy object
          message: memo[1],       // Access the message directly
          timestamp: Number(memo[2]), // Access and convert the timestamp
          from: memo[3],          // Access the sender address
        }));

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
    return <p className="text-center" >Loading messages...</p>;
  }

  return (
    <>
      <p className="text-center text-2xl font-medium mt-5">Aditya's Previous Sponsors</p>
      {memos.length === 0 ? (
        <p className="text-center">No messages available.</p>
      ) : (
        memos.map((memo) => {
          return (
            <div className="w-full" key={memo.timestamp}>
              <table className="mb-2.5"              >
                <tbody>
                  <tr>
                    <td
                     className="bg-default-sky-blue border border-white border-collapse p-[7px] w-[100px]"
                    >
                      {memo.name} {/* Display name */}
                    </td>
                    <td
                      className="bg-default-sky-blue border border-white border-collapse p-[7px] w-[800px]"

                    >
                      {new Date(memo.timestamp * 1000).toLocaleString()} {/* Display timestamp */}
                    </td>
                    <td
                     className="bg-default-sky-blue border border-white border-collapse p-[7px] w-[300px]"

                    >
                      {memo.message} {/* Display message */}
                    </td>
                    <td
                      className="bg-default-sky-blue border border-white border-collapse p-[7px] w-[400px]"

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
