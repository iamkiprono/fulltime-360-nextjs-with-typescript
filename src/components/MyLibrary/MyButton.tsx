"use client";
import React from "react";

interface ButtonProps {
  title: string;
  variant?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const MyButton = ({
  title,
  variant,
  onClick,
  loading,
  disabled,
}: ButtonProps) => {
  const bg = variant;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center border my-4 mr-4 px-4 py-2 rounded ${
        loading ? "w-28 pointer-events-none" : "w-fit"
      } ${
        disabled && "pointer-events-none"
      }  cursor-pointer hover:bg-white hover:text-black bg-${bg}-600 `}
    >
      {loading ? <img src="/spinner.svg" /> : title}
    </button>
  );
};

export default MyButton;
