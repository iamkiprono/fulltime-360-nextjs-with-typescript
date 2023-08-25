"use client";

import MyButton from "@/components/MyLibrary/MyButton";
import MyInput from "@/components/MyLibrary/MyInput";
import bundesliga from "@/teamsData/Bundesliga";
import laLiga from "@/teamsData/LaLiga";
import league1 from "@/teamsData/League1";
import premierLeague from "@/teamsData/PremierLeague";
import serieA from "@/teamsData/SerieA";

import React, { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { toast } from "react-hot-toast";

const AddTeams = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueAway, setSelectedValueAway] = useState("");
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [homeTeamLogo, setHomeTeamLogo] = useState("");
  const [awayTeamLogo, setAwayTeamLogo] = useState("");
  const [matchLink, setMatchLink] = useState("");

  const [loading, setLoading] = useState(false);

  const { state } = useAuthContext();

  const token = state?.token;

  const allTeams = [
    ...laLiga.LaLiga,
    ...premierLeague.PremierLeague,
    ...league1.League1,
    ...bundesliga.Bundesliga,
    ...serieA.SerieA,
  ];

  const addTeam = async () => {
    const newTeam = {
      hometeam: selectedHomeTeam,
      awayteam: selectedAwayTeam,
      homelogo: homeTeamLogo.split(",")[1],
      awaylogo: awayTeamLogo.split(",")[1],
      matchlink: matchLink,
    };

    try {
      setLoading(true);
      const res = await fetch("https://blog-api-kiprono.onrender.com/live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTeam),
      });

      const data = await res.json();

      console.log(data);

      
      setLoading(false);
      if (!res.ok) {
        throw Error(data.error);
      }
      toast.success("Match added");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    // console.log(newTeam);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <p className="font-bold text-lg mb-4 text-center">Add Matches</p>
      <div className="border p-4 shadow my-4">
        <p className="font-bold">League:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          name=""
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          id=""
        >
          <option value="">None</option>
          <option value="Premier League">Premier League</option>
          <option value="Bundesliga">Bundesliga</option>
          <option value="La Liga">La Liga</option>
          <option value="Serie A">Serie A</option>
          <option value="League 1">League 1</option>
        </select>
        <p className="font-bold">HomeTeam:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          onChange={(e) => setSelectedHomeTeam(e.target.value)}
          name=""
          id=""
        >
          {allTeams
            .filter((x) => x.league === selectedValue)
            .map((x, index) => {
              return <option key={index}>{x.name}</option>;
            })}
        </select>
        <p className="font-bold">HomeLogo:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          onChange={(e) => setHomeTeamLogo(e.target.value)}
          name=""
          id=""
        >
          {allTeams
            .filter((x) => x.league === selectedValue)
            .map((x, index) => {
              return (
                <option key={index}>
                  {x.name},{x.logo}
                </option>
              );
            })}
        </select>
        <div>
          <p className="font-bold">Stadium:</p>
          {allTeams
            .filter((x) => x.name === selectedHomeTeam)
            .map((s, index) => (
              <p key={index}>{s.stadium}</p>
            ))}
        </div>
      </div>
      <div className="border p-4 shadow my-4">
      <p className="font-bold">League:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          name=""
          value={selectedValueAway}
          onChange={(e) => setSelectedValueAway(e.target.value)}
          id=""
        >
          <option value="">None</option>
          <option value="Premier League">Premier League</option>
          <option value="Bundesliga">Bundesliga</option>
          <option value="La Liga">La Liga</option>
          <option value="Serie A">Serie A</option>
          <option value="League 1">League 1</option>
        </select>
        <p className="font-bold">AwayTeam:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          onChange={(e) => setSelectedAwayTeam(e.target.value)}
          name=""
          id=""
        >
          {allTeams
            .filter((x) => x.league === selectedValueAway)
            .map((x, index) => {
              return <option key={index}>{x.name}</option>;
            })}
        </select>
        <p className="font-bold">Away Logo:</p>
        <select
          className="dark:bg-[#26292b] dark:text-white border p-2 w-full my-4"
          onChange={(e) => setAwayTeamLogo(e.target.value)}
          name=""
          id=""
        >
          {allTeams
            .filter((x) => x.league === selectedValueAway)
            .map((x, index) => {
              return (
                <option key={index}>
                  {x.name},{x.logo}
                </option>
              );
            })}
        </select>
        <div>
          <p className="font-bold">Stadium:</p>
          {allTeams
            .filter((x) => x.name === selectedAwayTeam)
            .map((s, index) => (
              <p key={index}>{s.stadium}</p>
            ))}
        </div>
      </div>

      <div className="border p-4 shadow my-4 flex items-center">
        <p className="font-bold">Match Link:</p>
        <MyInput
          placeholder="Match Link"
          onChange={(e) => setMatchLink(e.target.value)}
          type="text"
        />
      </div>
      <MyButton loading={loading} onClick={() => addTeam()} title="Add Match" />
    </div>
  );
};

export default AddTeams;
