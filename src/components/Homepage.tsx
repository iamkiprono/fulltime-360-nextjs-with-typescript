"use client";

import MyCard from "@/components/MyLibrary/MyCard";
import { Blogs } from "@/types/types";
import React from "react";
import Visit from "./Visit";
import { useState, useEffect } from "react";
import SkeletonLoader from "./Skeleton";

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
          ? [...Array(6)].map((_, i) => {
              return (
                <div key={i} className="w-[350px]  p-2 ">
                  <p className="w-full bg-gray-200 p-2 my-2"></p>
                  <p className="w-full bg-gray-200 p-2 h-40 my-2"></p>

                  <p className="w-full bg-gray-200 p-2 my-2"></p>
                  <p className="w-full bg-gray-200 p-2 my-2"></p>
                  <p className="w-full bg-gray-200 p-2 my-2"></p>
                </div>
              );
            })
          : blogs?.map((blog) => {
              return <MyCard key={blog._id} blogs={blog} />;
            })}
        {/* <Visit /> */}
      </div>
    </div>
  );
};

export default Homepage;
