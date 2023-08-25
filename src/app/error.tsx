"use client"; // Error components must be Client Components

import MyButton from "@/components/MyLibrary/MyButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <h2 className="text-red-500">Error: {error.message}</h2>
      <MyButton
        title="Try again"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      />
    </div>
  );
}
