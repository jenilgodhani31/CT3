import React, { useState } from "react";
import Navbar from "../navbar";
import { useRouter } from "next/router";

const home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/signup");
  };

  return (
    <>
      <div className=" ">
        <div className="h-screen">
          {" "}
          <Navbar />
          <div className="head bg-[url('/backgroundHome.jpg')] h-h bg-center bg-sky-500 flex">
            <div></div>
            <div className="mt-72 ml-72 z-20" id="size">
              <p className="text-6xl " id="text">
                Daily Focus, <br />
                Accountability, <br /> and Success
              </p>
              <div className="mt-5">
                <p className="text-2xl flex " id="Text">
                  {" "}
                  <img src="/tick.png" alt="" width={30} />
                  <span className="ml-2"> Create a team</span>
                </p>
                <div className="flex h-8 mt-3">
                  <img src="/tick.png" alt="" width={30} />{" "}
                  <p className="text-2xl  ml-2" id="Text">
                    Commit to 3 important task each day
                  </p>
                </div>

                <p className=" text-2xl flex mt-3" id="Text">
                  
                  <img src="/tick.png" alt="" width={30} />
                  <span className="ml-2">track your team's</span>
                  success
                </p>
              </div>
              <div className="ml-3">
                <button
                  type="submit"
                  className="bg-blue-600 rounded-md h-10 px-5  text-white mt-5"
                  onClick={handleClick}
                >
                  GET STARTED
                </button>
                {/* <p className="text-base mt-1">Free during beta</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
