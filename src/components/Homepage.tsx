import MyCard from "@/components/MyLibrary/MyCard";
import { Blogs } from "@/types/types";
import React from "react";

const getBlogs = async (): Promise<Blogs[]> => {
  const res = await fetch("https://blog-api-kiprono.onrender.com/blogs", {
    next: {
      revalidate: 0, //opt out of caching
      tags: ["blogs"],
    },
  });
  const data = await res.json();
  return data;
};

const Homepage = async () => {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-center  mx-auto">
        {blogs.map((blog) => {
          return <MyCard key={blog._id} blogs={blog} />;
        })}
      </div>
    </div>
  );
};

export default Homepage;
