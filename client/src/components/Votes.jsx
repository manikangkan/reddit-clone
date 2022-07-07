import axios from "axios";
import { useEffect, useState } from "react";

import { ArrowUp } from "../icons/ArrowUp";

const Votes = ({ author, first }) => {
  const [totalVotes, setTotalVotes] = useState([]);

  const handleVote = async ({ direction }) => {
    await axios.post(`http://localhost:4000/vote`, {
      author,
      commentId: first._id,
      direction,
    });
  };

  useEffect(() => {
    const getTotalVotes = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/vote/${first._id}`
      );
      setTotalVotes(data);
    };
    getTotalVotes();
  }, [first._id]);
  
  return (
    <div className="flex items-center space-x-2 dark:text-gray-400 text-xs">
      <div onClick={() => handleVote({ direction: "up" })}>
        <ArrowUp />
      </div>
      <p>{totalVotes.sum}</p>
      <div
        className="rotate-180"
        onClick={() => handleVote({ direction: "down" })}>
        <ArrowUp />
      </div>
    </div>
  );
};

export default Votes;
