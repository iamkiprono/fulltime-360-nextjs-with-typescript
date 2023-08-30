"use client";
import { useEffect } from "react";

const Visit = () => {
  useEffect(() => {
    console.log("Visited");
  }, []);
  return <div>Visit</div>;
};

export default Visit;
