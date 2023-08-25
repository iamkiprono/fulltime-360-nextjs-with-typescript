"use client";

import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Hooks/useAuthContext";
import addToServer from "./action";
import { useMutation } from "@tanstack/react-query";

const ServerForm = () => {
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [errorState, setErrorState] = useState("");

  const { state } = useAuthContext();
  const token = state?.token;

  const addToDb = async () => {
    const res = await fetch("https://blog-api-kiprono.onrender.com/create", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blog, title, image }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw Error(data.error);
    }
    console.log(data);
    return data;
  };

  const { data, error, isError, isLoading, mutate } = useMutation(addToDb, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (error instanceof Error) {
    setErrorState(error.message);
  }

  const formStatus = useFormStatus();

  const clientAction = async (data: FormData) => {
    const result = await addToServer(data, token);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("added sucessfully");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
        // addToDb(blog)
      }}
      // action={clientAction}
    >
      <label htmlFor="">Title</label>
      <input
        className="border p-4 rounded"
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Blog</label>
      <input
        className="border p-4 rounded"
        type="text"
        name="blog"
        onChange={(e) => setBlog(e.target.value)}
      />
      <label htmlFor="">image Link</label>
      <input
        className="border p-4 rounded"
        type="text"
        name="link"
        onChange={(e) => setImage(e.target.value)}
      />
      {errorState}
      <button className="p-4 rounded bg-slate-600 text-white">
        {isLoading ? "Adding" : "Add"}
      </button>
    </form>
  );
};

export default ServerForm;
