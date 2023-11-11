"use client"


import MyCard from "@/components/MyLibrary/MyCard";
import { Blogs } from "@/types/types";
import React from "react";
import Visit from "./Visit";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [blogs, setBlogs] = useState<Blogs[] | null>(null);

  const getBlogs = async () => {
    const res = await fetch("https://blog-api-kiprono.onrender.com/blogs", {
      next: {
        revalidate: 0, //opt out of caching
        tags: ["blogs"],
      },
    });
    const data = await res.json();

    setBlogs(data);
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-center  mx-auto">
        {!blogs
          ? "Loading..."
          : blogs?.map((blog) => {
              return <MyCard key={blog._id} blogs={blog} />;
            })}
        <Visit />
      </div>
    </div>
  );
};

export default Homepage;
