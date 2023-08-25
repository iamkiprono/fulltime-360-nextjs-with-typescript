import React from "react";

type inputProps = {
  placeholder?: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyInput = ({ placeholder, type, onChange }: inputProps) => {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border bg-transparent dark:text-white my-4 w-full"
      type={type}
    />
  );
};

export default MyInput;
