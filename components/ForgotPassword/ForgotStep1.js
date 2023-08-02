import MyContext from "@/context/myContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { LiaRegisteredSolid } from "react-icons/lia";
import Navbar from "../navbar";
const forgotsetp = () => {
  const router = useRouter();
  const context= useContext(MyContext)
  const [email, setEmail] = useState("");
  const [verificationCode , setVerificationCode] = useState([])
  const [newPassword , setNewPassword]=useState("")
  const [error , setError]= useState("")
  const forgotData = async (email) => {
    try {
      const response = await context.api.post("/users/forgot-password", {
        email,
      }
      );
      console.log("response", response);
      if (response) {
        console.log("email",response)
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
      router.push("/forgot")
  };

  const handelClick=()=>{
    router.push("/forgotpassword")
  }
  const verifyCode = async(email,verificationCode,newPassword)=>{
    try {
      const response = await context.api.put(`/users/create-new-password`,{email,
        verificationCode,newPassword
      });
      console.log("data",response.message)
      if(response){
          
        // router.push("/login")
      }
    } catch (error) {
      setError("An error occurred during verifyCode")
    }
  }

  const handelSendCodeClick=(e)=>{
    e.preventDefault();
    verifyCode(email,parseInt(verificationCode),newPassword);
  }
  return (
    <div className="back bg-[url('/backgroundHome.jpg')] bg-cover min-h-screen  bg-center bg-sky-500 bg-fixed flex">
      <div className="absolute inset-0 bg-white opacity-50"></div>
    <div className="bg-white  shadow-2xl w-f-width  lg:ml-left-100  mt-20 absolute z-20 " id="forgot">
    <div className="flex py-2 ml-2" >
      <div className="flex"><AiOutlineLeft className="my-1"  />  <button onClick={handelClick} className="text-slate-500 flex">  Cancel</button> </div>
      <div className="ml-auto px-2"><Link href="/" className="hover:underline text-blue-600">Back to home</Link> </div>
    </div>
    
    <div className="flex mx-28">
    <h1 className="font-bold text-3xl py-4 flex  ">CommitTo3 <HiDotsVertical className="my-1"/> </h1>
    <LiaRegisteredSolid className="my-8"/>
      </div>  
   
  
      <div className="mx-20">
        <form className="mt-2" onSubmit={handelSendCodeClick}>
          <div className="my-2">
            <p className="text-sm">
              Verification code has been sent to your inbox. please copy it to the input box below.
            </p>
            <input
            id="input1"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-gray-300 h-11 md:w-80 px-3 rounded-md my-2"
              required  
            />
             <input
             id="input2"
             datatype="number"
              placeholder="Code"
              value={verificationCode}
              onChange={(e)=>setVerificationCode(e.target.value)}
              className=" border border-gray-300  h-11 md:w-80 px-3  rounded-md my-2"
            />
            <input
            id="input3"
              type="text"
              placeholder="Enter New password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className=" border border-gray-300  h-11 md:w-80 px-3  rounded-md my-2"
            />
          </div>
          <button
            type="submit"
            className="h-12 mt-5 mb-10 mx-3 md:w-22  bg-blue-600 px-4  rounded-md text-white"
            
          >
            verify code
          </button>
          <button
            type="submit"
            className="h-12 mt-5 mb-10  md:mx-5  bg-blue-600 md:px-4  rounded-md text-white"
            onClick={handleSendCode}
          >
            Send new code
          </button>
          <button
            type="submit"
            className="h-12 mb-10 mx-2 md:w-72   bg-blue-600 md:px-16  rounded-md text-white"
            
          >
            Save Password
          </button>
        </form>
      </div>
      {error && (
        <div className="absolute bottom-12 left-0 justify-start bg-white h-12 mt-5 mx-5 rounded-md shadow-lg px-6 py-3 text-red-600 transition-transform transform translate-x-12">
          {error}
        </div>
      )}
  </div>
    </div>
);
};

export default forgotsetp;
