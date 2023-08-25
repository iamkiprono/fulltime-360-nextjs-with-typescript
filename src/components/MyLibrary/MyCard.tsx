"use client";

import React, { useState } from "react";
import MyButton from "./MyButton";
import { Blogs } from "@/types/types";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/app/Hooks/useAuthContext";


const MyCard = ({ blogs }: { blogs: Blogs }) => {
  const [readMore, setReadMore] = useState<boolean>(false);

  const { state } = useAuthContext();

  const token = state?.token;

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(
        `https://blog-api-kiprono.onrender.com/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const deletedPost = await res.json();
      console.log(deletedPost);

      if (!res.ok) {
        throw Error(deletedPost.error);
      }

      toast.success(`${deletedPost.result.title} deleted`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="w-[350px] border p-2 ">
        <img
          className="object-cover aspect-video"
          src={blogs.image}
          // width={500}
          // height={500}
          alt="Project Image"
        />
        <p className="font-bold text-xl my-4">{blogs.title}</p>

        <p className="">
          {!readMore ? `${blogs.blog.slice(0, 210)}...` : blogs.blog}
        </p>
        <p
          className="font-bold mt-4 text-blue-300 cursor-pointer"
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Read Less" : "Read More"}
        </p>
        {state && (
          <MyButton onClick={() => deletePost(blogs._id)} title="Delete" />
        )}
      </div>
    </>
  );
};

export default MyCard;
