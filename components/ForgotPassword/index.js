import { useContext, useState } from "react";
import MyContext from "@/context/myContext";
import { AiOutlineLeft } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { LiaRegisteredSolid } from "react-icons/lia";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const context = useContext(MyContext);
  const [success, setSuccess] = useState("");
 
  const router = useRouter();
  const forgotData = async (email) => {
    try {
      const response = await context.api.post("/users/forgot-password", {
        email,
      });
      console.log("response", response);
      if (response) {
          
        console.log("Password reset email sent");
      } else {
        console.log("Failed to send password reset email");
      }
    } catch (error) {
      console.error("An error occurred during forgot:", error);
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    forgotData(email);
    setSuccess("Password reset email sent");
    router.push("/forgot");
  };

  return (
    <div className="back bg-[url('/backgroundHome.jpg')] bg-cover min-h-screen bg-center bg-sky-500 flex z-10">
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="for bg-white w-96 absolute mt-60  ml-left-100   shadow-2xl z-20   border border-slate-300"  id="for">
        <Link href="/">
          <div className="flex py-2 ml-2">
            <AiOutlineLeft className="my-1" />{" "}
            <p className="text-slate-500">Cancel</p>
          </div>
        </Link>

        <div className="flex mx-20">
          <h1 className="font-bold text-3xl py-4 flex">
            CommitTo3 <HiDotsVertical className="my-1" />{" "}
          </h1>
          <LiaRegisteredSolid className="my-8" />
        </div>

        <div className="mx-11">
          <form className="mt-2">
            <div className="my-2">
              <p className="text-sm">
                Verification is necessary. Please click the Send button.
              </p>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 focus:border-gray-400 h-11 w-80 rounded-md my-2 px-2"
              />
            </div>
            <button
              type="submit"
              className="h-12 mt-5 mb-10 mx-14 bg-blue-600 px-4 rounded-md text-white"
              onClick={handleSendCode}
            >
              Send Verification Code
            </button>
            <br />
          </form>
        </div>
      </div>
      {success && (
        <div className="absolute bottom-12 left-0 justify-start bg-white h-12 mt-5 mx-5 rounded-md shadow-lg px-6 py-3 text-green-600 transition-transform transform translate-x-12">
          {success}
        </div>
      )}

    </div>
  );
};

export default ForgotPassword;
