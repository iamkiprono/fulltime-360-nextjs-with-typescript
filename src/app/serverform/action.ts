"use server";

import { revalidateTag } from "next/cache";

import { redirect } from "next/navigation";

const addToServer = async (data: FormData, token: string | undefined) => {
  const title = data.get("title");
  const blog = data.get("blog");
  const image = data.get("link");

  //  const result = await sendToDb(title as string, blog as string, image as string);
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
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return {
        error: error.message,
      };
    }
  }

  revalidateTag("blogs");
  redirect("/");
};
export default addToServer;
