import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import MyContext from "@/context/myContext";

const DashNavbar = (props) => {
  const router = useRouter();
  const context = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  // const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decoded = jwtDecode(storedToken);
    viewUserData(decoded.sub);
    console.log("jwt", decoded);
  }, []);

  useEffect(() => {
    viewUserData();
  }, [props.lname, props.fname]);

  useEffect(() => {
    const handleClickOutside = () => {
     
        setIsOpen(false);
      
    };
    // document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const viewUserData = async (userId) => {
    try {
      const response = await context.api.get(`/users/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Response", response.data.id);
      if (response.data) {
        setUser(response.data);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred during viewUserData:", error);
    }
  };

  return (
    <div>
      <nav className="flex h-14 bg-white">
        <Link href="/dashboard" className="py-2 mx-5">
          <img src="/logo.PNG" alt="" width={130} />{" "}
        </Link>
        <div className="ml-auto">
          <button onClick={toggleDropdown} >
            <img
              className="w-10 h-10 rounded-full mx-10 mt-2"
              src="/avtar.jpeg"
              alt=""
            />
          </button>
          {isOpen && (
            <div
              
              className="absolute right-0 mt-1 mr-5 bg-white  py-2 rounded-lg w-40"
            >
              {user && (
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded-full mx-2 my-3"
                    src="/avtar.jpeg"
                    alt=""
                  />
                  <p className="my-5">
                    {user.fname.charAt(0).toUpperCase() +
                      user.fname.slice(1)}{" "}
                    {user.lname.charAt(0).toUpperCase() + user.lname.slice(1)}
                  </p>
                </div>
              )}

              <div className="border bg-slate-300"></div>
              <div>
                <Link href="/profile">
                  <p className="block px-4 py-2">Profile</p>
                </Link>
                <Link href="/organization">
                  <p className="block px-4 py-2">Organization</p>
                </Link>
                <button type="submit" onClick={handelLogout}>
                  <p className="block px-4 py-2">Sign out</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default DashNavbar;
