"use client";
import { useAuthContext } from "@/app/Hooks/useAuthContext";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export const navLinks = [
  {
    id: "",
    title: "Blogs",
  },
  {
    id: "live",
    title: "Live Matches",
  },
  {
    id: "addblog",
    title: "Add Blogs",
  },
  {
    id: "addmatches",
    title: "Add Matches",
  },

  {
    id: "login",
    title: "Log In",
  },

  {
    id: "dashboard",
    title: "Dashboard",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const { state, updateUser } = useAuthContext();

  return (
    <div className="bg-black text-white">
      <nav className="max-w-7xl m-auto flex p-6 justify-between items-center navbar ">
        {/* Logo */}
        <Link className="text-xl text-white" href={"/"}>
          FullTime 360
        </Link>

        {/* Desktop Navigation */}
        <div className="list-none sm:flex hidden justify-end items-center flex-1">
          {(state
            ? navLinks.filter((x) => x.id !== "login")
            : !state
            ? navLinks.filter(
                (x) =>
                  x.id !== "addblog" &&
                  x.id !== "addmatches" &&
                  x.id !== "dashboard"
              )
            : navLinks
          ).map((nav, index) => (
            <div
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white " : "text-gray-100"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => {
                setActive(nav.title);
                setToggle(!toggle);
              }}
            >
              <Link href={`/${nav.id}`}>{nav.title}</Link>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <FaBars
            color={"white"}
            // src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <div className="list-none flex justify-end items-start flex-1 flex-col">
              {(state
                ? navLinks.filter((x) => x.id !== "login")
                : !state
                ? navLinks.filter(
                    (x) =>
                      x.id !== "addblog" &&
                      x.id !== "addmatches" &&
                      x.id !== "dashboard"
                  )
                : navLinks
              ).map((nav, index) => (
                <div
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white " : "text-gray-100"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(!toggle);
                  }}
                >
                  <Link href={`/${nav.id}`}>{nav.title}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {state && (
          <>
            <p className="border p-1 ml-2">
              {state?.email.slice(0, 1).toUpperCase()}
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                updateUser(null);
              }}
              className="ml-2"
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
