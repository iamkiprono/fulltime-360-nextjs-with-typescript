"use client";

import { liveMatches } from "@/types/types";
import { toast } from "react-hot-toast";
import { FaLink, FaTrash } from "react-icons/fa";
import { useAuthContext } from "../Hooks/useAuthContext";

const LiveMatchCard = ({ match }: { match: liveMatches }) => {
  const { state } = useAuthContext();

  const token = state?.token;

  const deleteMatch = async (id: string) => {
    try {
      const res = await fetch(
        `https://blog-api-kiprono.onrender.com/live/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw Error(data.error);
      }
      toast.success("Match deleted");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // send click to visits database
  const sendClicks = async (
    hometeam: string,
    awayteam: string,
    link: string
  ) => {
    const res = await fetch("https://blog-api-kiprono.onrender.com/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hometeam, awayteam }),
    });

    const data = await res.json();
    console.log(data);

    window.open(link, "_blank");
  };

  return (
    <div
      className="flex items-center justify-between shadow-md p-4 my-2"
      key={match._id}
    >
      <div>
        <div>
          <p>{match.awayteam}</p>
          vs
          <p>{match.hometeam}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* <Link target="_blank" href={match.matchlink}>
          Watch
        </Link> */}

        <FaLink
          onClick={() =>
            sendClicks(match.hometeam, match.awayteam, match.matchlink)
          }
        />

        {state && (
          <FaTrash
            className="cursor-pointer"
            onClick={() => deleteMatch(match._id)}
          />
        )}
      </div>
    </div>
  );
};

export default LiveMatchCard;
