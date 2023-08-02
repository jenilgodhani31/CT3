import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineLeft } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { LiaRegisteredSolid } from "react-icons/lia";
import MyContext from "@/context/myContext";
import Link from "next/link";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
const Signup = () => {
  const context = useContext(MyContext);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success , setSuccess]=useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validation = () => {
    if (!fname.trim()) {
      setError("First  name is required.");
      return;
    }
    if (!lname.trim()) {
      setError("Last name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email address.");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)){
      setError("Password requirements: Uppercase, lowercase, number, special character.")
     return;
    }

    if(!password !== confirmPassword){
      setError("Passwords do not match.")
      return;
    }
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  const registerData = async (
    fname,
    lname,
    email,
    password,
    confirmPassword
  ) => {
  validation();


    try {
      const register = await context.api.post("/users/signup", {
        fname,
        lname,
        email,  
        password,
        confirmPassword,
      });
      if ( register) {
        setSuccess("Register Successfully")
        router.push("/");
      } else {
        console.log("fail register");
      }
    } catch (error) {
      console.error("An error occurred during Signup:", error);
     
    }
  };
  const router = useRouter();
  const handelSubmit = (e) => {
    e.preventDefault();
    registerData(fname, lname, email, password, confirmPassword);
  };
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="back bg-[url('/backgroundHome.jpg')]  min-h-screen bg-cover bg-sky-500 flex">
      <div className="absolute inset-0  bg-white opacity-30"></div>
      <div
        className=" w-96 absolute mt-60  ml-left-100  z-20 shadow-xl rounded bg-white border border-slate-300 "
        id="reg"
      >
        <Link href="/">
          <div className="flex py-2 ml-2 cursor-pointer" onClick={handleClick}>
            <AiOutlineLeft className="my-1" />{" "}
            <p className="text-slate-500 "> Cancel</p>
          </div>
        </Link>
        <div className="flex mx-20">
          <h1 className="font-bold text-3xl py-4 flex  ">
            CommitTo3 <HiDotsVertical className="my-1" />{" "}
          </h1>
          <LiaRegisteredSolid className="my-8" />
        </div>

        <div className="mx-8">
          <form className="mt-2" onSubmit={handelSubmit}>
            <div className="my-2">
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-400 h-11 w-80  rounded-md px-2 my-2 "
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-400 h-11 w-80  rounded-md px-2 my-2 "
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="border border-gray-400 h-11 w-80  rounded-md px-2 my-2 "
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 h-11 w-80  rounded-md px-2 my-2 "
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-400 h-11 w-80  rounded-md px-2 my-2 "
              />
            </div>
            <button
              type="submit"
              className="h-10 mt-5 mb-10 mx-14  bg-blue-600 px-10  rounded-md text-white"
              
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      {error && (
        <div className="absolute bottom-12  flex left-0 justify-start bg-white h-12 mt-5 mx-5 rounded-md shadow-lg px-6 py-3 text-red-600 transition-transform transform translate-x-12">
         <p className="py-1 mx-2"><BiErrorCircle/></p> {error}
        </div>
      )}
            {success && (
              <div className="absolute bottom-12 flex left-0 justify-start bg-white h-12 mt-5 mx-5 rounded-md shadow-lg px-6 py-3 text-green-600 transition-transform transform translate-x-12">
                <p className="py-1 mx-2 ">
                  <IoIosCheckmarkCircleOutline />
                </p>
                {success}
              </div>
            )}
    </div>
  );
};

export default Signup;
