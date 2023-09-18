"use client";

import MyButton from "@/components/MyLibrary/MyButton";
import React, { use, useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

const AccountComponent = () => {
  const { state } = useAuthContext();

  const [logins, setLogins] = useState([]);

  const token = state?.token;

  const logOutFromAllDevices = async () => {
    const logOut = await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await logOut.json();
    console.log(data);
  };

  const getAllLogins = async () => {
    const logins = await fetch("http://localhost:5000/user/alldevices", {
      cache: "no-cache",
    });
    const data = await logins.json();
    setLogins(data);
    console.log({ logins: data });
  };
  useEffect(() => {
    if (state?.token) {
      getAllLogins();
    }
  }, [state?.token]);

  return (
    <div>
      {logins.length}
      <MyButton
        onClick={() => logOutFromAllDevices()}
        title="Log out from all devices"
      />
    </div>
  );
};

export default AccountComponent;
