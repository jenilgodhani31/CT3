import React from 'react'
import { AiOutlineLeft } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { LiaRegisteredSolid } from "react-icons/lia";
const forgotsept = () => {
  return (
    <div className="bg-slate-300 w-1/4 mx-auto mt-56 ">
    <div className="flex py-2 ml-2">
    <AiOutlineLeft className="my-1"  /> <p className="text-slate-500">  Cancel</p> 
 
    </div>
    
    <div className="flex mx-28">
    <h1 className="font-bold text-3xl py-4 flex  ">CommitTo3 <HiDotsVertical className="my-1"/> </h1>
    <LiaRegisteredSolid className="my-8"/>
      </div>  
   
  
      <div className="mx-20">
        <form className="mt-2">
          <div className="my-2">
            <p className="text-sm">
             E-mail address verified. you can now continue 
            </p>
            <input
              type="text"
              placeholder="
                  Email address"
              className="border-2 border-black h-11 w-80   rounded-md my-2"
            />
            
          </div>
          <button
            type="submit"
            className="h-12 mt-5 mb-10  mx-16  bg-blue-600 px-10  rounded-md text-white"
          >
            Change E-mail
          </button>
          <button
            type="submit"
            className="h-12 mb-10 mt-5 mx-16   bg-blue-600 px-16  rounded-md text-white"
          >
            Continue
          </button>
        </form>
      </div>
  </div>
  )
}

export default forgotsept
