"use client";

import { useLogin } from "@/app/Hooks/useLogin";
import React, { useState } from "react";
import MyButton from "./MyLibrary/MyButton";
import MyInput from "./MyLibrary/MyInput";
import { useAuthContext } from "@/app/Hooks/useAuthContext";
import { redirect } from 'next/navigation';

const LoginForm = () => {
  const { logIn, error, isLoading } = useLogin();

  const { state } = useAuthContext();

  if (state) {
    redirect("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logIn(email, password);
        }}
        className="flex flex-col"
        action=""
      >
        <label htmlFor="">Email</label>
        <MyInput
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <label htmlFor="">Password</label>
        <MyInput
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {error && <p className="text-red-600">{error}</p>}
        <MyButton loading={isLoading} title="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
