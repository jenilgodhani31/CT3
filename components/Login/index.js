import MyContext from "@/context/myContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Navbar from "../navbar";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
const Login = () => {
  const context = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const loginData = async (email, password) => {
    try {
      setLoading(true);
      const loginResponse = await context.api.post("/users/signin", {
        email,
        password,
      });
      if (loginResponse) {
        router.push("/dashboard");
        localStorage.setItem("token", `Bearer ${loginResponse.data}`);
        setSuccess("Login successfully")
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("Please enter valid username and password");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await loginData(email, password);
  };

  const handelOpenFor = () => {
    router.push("/forgotpassword");
  };
  return (
    <div className="back bg-[url('/backgroundHome.jpg')] bg-cover min-h-screen bg-center bg-scroll inset-0  z-10   flex  ">
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className=" z-20 ">
        <div className="w-screen">
          {" "}
          <Navbar />
        </div>

        <div className="box bg-white  mx-auto w-96 mt-64 h-96 shadow-2xl text-black  rounded  border border-slate-300  ">
          <h1 className="font-bold  flex mx-24 text-3xl py-5 text-center">
            CommitTo3
            <HiDotsVertical className="my-1" />
          </h1>
          <div className="mx-8">
            {error && <p>{error}</p>}
            <p>Sign In with your Email</p>
            <form className="mt-2" onSubmit={handleClick}>
              <div className="my-2">
                <input
                  type="email"
                  placeholder="Username"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 h-11 w-80 rounded-md  focus:border-blue-500 px-2"
                />
              </div>

              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 h-11 w-80 rounded-md  px-2"
              />

              <p
                className="underline text-blue-600 mt-1 cursor-pointer"
                onClick={handelOpenFor}
              >
                Forgot Your Password?
              </p>
              {loading && <span className="loader"></span>}
              <button
                type="submit"
                className="h-10 mt-5 bg-blue-600 px-10 w-40 rounded-md text-white"
              >
                Sign in
              </button>
              <p className="mt-1">
                Don't have an account?
                <Link href="/signup">
                  <span className="underline text-blue-600 cursor-pointer ml-1">
                    Sign up now
                  </span>
                </Link>
              </p>
            </form>
          </div>
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

export default Login;
