"use client";

import { useAuthContext } from "@/app/Hooks/useAuthContext";
import MyButton from "@/components/MyLibrary/MyButton";
import { useState } from "react";

import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MyInput from "./MyLibrary/MyInput";

const Form = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { state } = useAuthContext();

  const router = useRouter();

  const addBlog = async () => {
    const token  = state?.token;

    const redirectToHome = () => redirect("/");

    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://blog-api-kiprono.onrender.com/create", {
        method: "POST",
        body: JSON.stringify({ blog, title, image }),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      setLoading(false);
      toast.success("Blog added successfully");
      // revalidateTag("blogs");
      // redirectToHome();
      router.push("/");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBlog();
          // console.log({ title, image, blog });
        }}
        className="flex flex-col"
        action=""
      >
        <label className="my-2" htmlFor="">
          Title:
        </label>
        <MyInput onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
        <label className="my-2" htmlFor="">
          Blog details:
        </label>
        <textarea
        placeholder="Blog"
          onChange={(e) => setBlog(e.target.value)}
          className="dark:bg-[#26292b] dark:text-white border rounded p-2 h-[360px]"
          name=""
        ></textarea>
        <label className="my-2" htmlFor="">
          Image Link:
        </label>
        <MyInput onChange={(e) => setImage(e.target.value)} type="text" placeholder="Image Link" />
        <div className="p-4 mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>

        <MyButton loading={loading} disabled={loading} title="Add blog" />
      </form>
    </div>
  );
};

export default Form;
