import Dashnavbar from "@/components/dashNavbar/index";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { useContext, useState } from "react";
import MyContext from "@/context/myContext";
const register = () => {
  const context = useContext(MyContext);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(true);
  const handelClickOpen = (e) => {
    e.preventDefault();

    TeamData(name);
    // setIsOpen(true);
    // setOpen(false);
  };
  const TeamData = async (name) => {
    try {
      const response = await context.api.post("/teams", { name });
      if (response) {
        console.log("Team created");
      } else {
        console.log("Team was not Created");
      }
    } catch (error) {
      console.error("An error occurred during team:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <Dashnavbar />
      {Open && (
        <div className="min-h-screen ">
          <div className="bg-white w-3/6 mx-auto mt-56 rounded-xl shadow-md">
            <div className=" mx-20">
              <h1 className="font-bold text-3xl py-4  text-blue-700">
                Step 1:
              </h1>
              <h1 className="font-bold text-6xl">
                how Will you use commitTo3?
              </h1>
            </div>

            <div className="mx-20 mt-10">
              <form className="mt-2">
                <div className="my-2">
                  <p className="text-lg ">
                    In an Organization, with one or more teams
                  </p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Organization name('XYZ Company')"
                    className="border-2 border-black h-11 w-3/5 rounded-md mt-5"
                  />
                </div>
                <p className="text-lg ">
                  As an Individual, to use without a Team
                </p>
                <button
                  type="submit"
                  className="h-10 mt-5 mb-10 mx-10- bg-blue-600 px-4 rounded-md text-white"
                  onClick={handelClickOpen}
                >
                  NEXT
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="bg-white w-custom-width mx-auto mt-32  rounded-xl shadow-md">
          <div className=" mx-20">
            <h1 className="font-bold text-3xl py-4  text-blue-700">Step 2:</h1>
            <p className="text-4xl font-bold ">Invite Members</p>
          </div>

          <div className="mx-20 mt-2">
            <form className="mt-2">
              <div className="my-2">
                <h1 className="text-xl">Name</h1>
                <input
                  type="text"
                  placeholder="name@compny.com"
                  className="border border-slate-400 h-11 w-56 rounded-md mt-5"
                />
                <br />
                <button
                  type="submit"
                  className="h-10 mt-5 mb-10 mx-10- bg-blue-600 px-4 rounded-md text-white"
                >
                  Add more
                </button>
              </div>

              <div className="flex">
                <div>
                  <h1 className="text-2xl font-bold">Select Team</h1>
                  <input
                    type="text"
                    className="h-10 border-slate-400 border rounded-md mt-3 w-96"
                    placeholder="Enter The team Name"
                  />
                  <p>
                    Enter the name of the Team that you would like to assign
                    these members to. Don't worry, you can always re-assign them
                    to another team later.
                  </p>
                  <button
                    type="submit"
                    className="h-10 mt-3 mb-10  bg-blue-600 px-4 rounded-md text-white"
                  >
                    Next
                  </button>
                </div>
                <div className="mx-5">
                  <h1 className="text-2xl font-bold">Members Pricing </h1>
                  <p className="text-red-600 text-sm font-bold">
                    Free during beta
                  </p>
                  <div className="border-2 flex border-yellow-500 bg-yellow-100 w-36  rounded-lg text-lg mt-2">
                    <div className=" mt-8 ">
                      <HiOutlineUser className="text-yellow-500 mx-3" />
                    </div>
                    <div className="mt-3">
                      <h1 className="font-bold">Member</h1>
                      <p className=" text-yellow-500 ">
                        5<span className="text-sm">/member</span>
                      </p>
                    </div>
                    <div className="border-2 flex border-emerald-500 bg-emerald-100 rounded-lg text-lg mx-10 ">
                      <div className=" mt-8 ">
                        <AiOutlineEye className="text-yellow-500 mx-3" />
                      </div>
                      <div className="mt-3 mb-2 mr-5 ">
                        <h1 className="font-bold">Observer</h1>
                        <button className="bg-red-700 text-white rounded-lg px-2 text-lg">
                          Free
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="border-2 border-blue-500 rounded-lg  mt-7 mx-40 w-36 text-blue-500 h-10">
                    i'll Add this Later
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default register;
