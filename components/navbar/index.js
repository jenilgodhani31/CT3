import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <nav className="flex  h-14 bg-white">
      <div className="h-2 mx-2 py-2 cursor-pointer">
        <Link href="/">
          <img src="/logo.PNG" alt="" width={130} />
        </Link>
      </div>

      <div className="flex ml-auto mx-4 ">
      <div className=" hover:bg-slate-200  ">
          <button
            id="btn"
            type="submit"
            className="flex mx-2 text-slate-500 font-bold py-4  px-2 rounded"
          >
            PRODUCT
          </button>
        </div>

        <div className=" hover:bg-slate-200 ">
          {" "}
          <button
            id="btn"
            type="submit"
            className="flex mx-2 text-slate-500 font-bold py-4 px-2 rounded"
          >
            PRICING
          </button>
        </div>

        <div className=" hover:bg-slate-200 ">
          <button
            id="btn"
            type="submit"
            className="flex  text-slate-500 font-bold py-4  px-4 rounded"
            onClick={handleClick}
          >
            LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
