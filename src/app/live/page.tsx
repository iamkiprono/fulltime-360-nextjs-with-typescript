import { liveMatches } from "@/types/types";
import React from "react";
import LiveMatchCard from "./LiveMatchCard";

const getMatches = async (): Promise<liveMatches[]> => {
  const res = await fetch("https://blog-api-kiprono.onrender.com/live", {
    cache: "no-cache",
    next: { tags: ["matches"] },
  });
  const data = await res.json();
  return data;
};

const Live = async () => {
  const liveMatches = await getMatches();
  return (
    <div>
       <p className="font-bold text-lg mb-4 text-center">Live Matches</p>
      {liveMatches.length === 0 ? (
        <div className="flex items-center justify-between shadow-md p-4 my-2">
          <p>No matches today</p>
        </div>
      ) : (
        liveMatches.map((match) => {
          return <LiveMatchCard key={match._id} match={match} />;
        })
      )}
    </div>
  );
};

export default Live;
