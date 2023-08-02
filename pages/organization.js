import React, { useContext, useEffect, useState } from "react";
import DashNavbar from "@/components/dashNavbar";
import { AiOutlinePlus } from "react-icons/ai";
import MyContext from "@/context/myContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const Organization = () => {
  const router = useRouter();
  const context = useContext(MyContext);
  const [Team, setTeam] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [teamID, setTeamID] = useState("");
  const [teamRename, setTeamRename] = useState("");
  const [teamsData, setTeamsData] = useState([]);
  const [openModal, serOpenModel] = useState(false);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);
  const [success, setSuccess] = useState("");
  const [renameTeam, setRenameTeam] = useState("");
  const [removeTeam, setRemoveTeam] = useState("");
  const [addTeam, setAddTeam] = useState("");
  const toggleAccordion = (accordion) => {
    switch (accordion) {
      case "accordion1":
        setAccordion1(!accordion1);
        break;
      case "accordion2":
        setAccordion2(!accordion2);
        break;
      case "accordion3":
        setAccordion3(!accordion3);
        break;
      default:
        break;
    }
  };

  setTimeout(() => {
    setSuccess(null);
  }, 5000);

  const OpenToggleDropdown = (teamId) => {
    setIsOpen((prevState) => ({
      [teamId]: !prevState[teamId],
    }));
  };
  const handelClick = (team) => {
    setTeam(team);
    router.push({
      pathname: "/teamsetting",
      query: { teamId: team.id },
    });
  };

  // Teams api
  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await context.api.get("/teams", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response) {
          setTeamsData(response.data);
        } else {
          console.log("Error fetching teams");
        }
      } catch (error) {
        console.error("An error occurred during fetchTeamsData:", error);
      }
    };

    fetchTeamsData();
  }, [addTeam, renameTeam, removeTeam]);

  // Add team api
  const addTeamData = async (name) => {
    try {
      const response = await context.api.post(
        "/teams",
        { name },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        setSuccess("Add team successfully");
        setAddTeam(response);
        console.log("Add team");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred during fetchTeamsData:", error);
    }
  };

  const handelClickAdd = (e) => {
    e.preventDefault();
    // setAddTeam('')
    serOpenModel(false);
    addTeamData(addTeam);
  };

  // Remove Team api
  const removeData = async (teamId) => {
    try {
      const response = await context.api.delete(`/teams/${teamId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response) {
        setRemoveTeam(response);
        setSuccess("Remove successfully");
      } else {
        console.log("Failed to remove team");
      }
    } catch (error) {
      console.error("An error occurred during removeData:", error);
    }
  };
  const handleRemoveClick = (team) => {
    const confirmedData = confirm(
      " Are you sure you want to remove this team?"
    );
    if (confirmedData) {
      removeData(team.id);
      alert("team removed successfully!");
    } else {
      alert("team removal canceled.");
    }
  };
  // Rename Api
  const RenameData = async (name) => {
    try {
      const response = await context.api.patch(
        `/teams/${teamID}`,
        {
          name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        setRenameTeam(response);
        setOpenRename(false);
        setSuccess("Rename successfully");
      } else {
        console.log("Failed to Rename team");
      }
    } catch (error) {
      console.error("An error occurred during RenameData:", error);
    }
  };

  const handleRenameClick = () => {
    RenameData(teamRename);
  };
  const handelOpenClick = (team) => {
    setOpenRename(true);
    setTeamID(team.id);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-300 ">
        <DashNavbar />
        <div className="bg-white lg:w-o-width mx-auto rounded-xl mt-28 shadow-md py-10">
          <div className="lg:mx-20 md:mx-5">
            <div className="flex">
              <h1 className="font-bold text-3xl py-4 ">Organization</h1>
              <Link
                href="/dashboard"
                className="text-blue-500 ml-auto py-5 hover:underline"
              >
                Back to Home
              </Link>
            </div>

            <div>
              <div className="bg-slate-200 shadow-md border-b border-slate-400 rounded-md">
                <button
                  type="submit"
                  className="w-full flex justify-between items-center py-2 px-4 text-lg font-semibold text-left cursor-pointer focus:outline-none"
                  onClick={() => toggleAccordion("accordion1")}
                >
                  <span>Member</span>
                  <svg
                    className={`h-4 w-4 transition-transform transform ${
                      accordion1 ? "rotate-45" : "rotate-20"
                    }`}
                  >
                    <AiOutlinePlus />
                  </svg>
                </button>
                {accordion1 && (
                  <div className="py-2 px-4 ">
                    <div className="shadow-md sm:rounded-lg"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-slate-200 shadow-md border-b border-slate-400 rounded-md mt-4">
              <button
                type="submit"
                className="w-full flex justify-between items-center py-2 px-4 text-lg font-semibold text-left cursor-pointer focus:outline-none"
                onClick={() => toggleAccordion("accordion2")}
              >
                <span>Teams</span>
                <svg
                  className={`h-4 w-4 transition-transform transform ${
                    accordion2 ? "rotate-45" : "rotate-100"
                  }`}
                >
                  <AiOutlinePlus />
                </svg>
              </button>
              {accordion2 && (
                <div className=" py-2 px-4 overflow-x-auto">
                  <div className=" shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 bg-slate-500">
                      <thead className="text-xs text-gray-700 bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 border-b">Team Name</th>
                          <th className="px-6 py-4 border-b">Member</th>
                          <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamsData?.map((team) => (
                          <tr key={team.id} className="bg-white  border-b">
                            <td className="px-6 py-4 font-medium text-gray-900   ">
                              {team.name}
                            </td>
                            <td className="relative">
                              {team.users.map((user, index) => (
                                <td
                                  key={user.id}
                                  className={`py-2 relative z-10`}
                                  style={{ right: `${index * 11}px` }} // Example: Adjust the left position
                                >
                                  <p className="rounded-full h-8 w-8 px-2 py-1 bg-slate-400 text-black font-bold">
                                    {user.fname[0].toUpperCase()}
                                    {user.lname[0].toUpperCase()}
                                  </p>
                                </td>
                              ))}
                            </td>

                            <td className="px-4 py-3 " id="dropDwon">
                              <button
                                typeof="submit"
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                                type="button"
                                onClick={() => OpenToggleDropdown(team.id)}
                              >
                                <svg className="w-5 h-5">
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>

                                {IsOpen[team.id] && (
                                  <div className=" absolute  mx-10 mt-10 w-32 bg-white rounded divide-y divide-gray-100 shadow-xl">
                                    <ul className="py-1 text-sm">
                                      <li>
                                        <button
                                          type="submit"
                                          onClick={() => handelClick(team)}
                                          className="block py-2 px-4 hover:bg-gray-100 text-xs"
                                        >
                                          Team setting
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="submit"
                                          className="block py-2 px-4 hover:bg-gray-100 text-xs"
                                          onClick={() => handelOpenClick(team)}
                                        >
                                          Rename Team
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="submit"
                                          className="block py-2 px-4 hover:bg-gray-100 text-xs"
                                          onClick={() =>
                                            handleRemoveClick(team)
                                          }
                                        >
                                          Remove Team
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 h-10 rounded-md px-2 text-white my-2"
                      onClick={() => serOpenModel(true)}
                    >
                      Add team
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-200 shadow-md border-b border-slate-400 rounded-md mt-4 ">
              <button
                type="submit"
                className="w-full flex justify-between items-center py-2 px-4  text-lg font-semibold text-left cursor-pointer focus:outline-none"
                onClick={() => toggleAccordion("accordion3")}
              >
                <span>Billing</span>
                <svg
                  className={`h-4 w-4 transition-transform transform ${
                    accordion3 ? "rotate-45" : "rotate-20"
                  }`}
                >
                  <AiOutlinePlus />
                </svg>
              </button>
              {accordion3 && (
                <div className="bg-gray-100 py-2 px-4 ">
                  <p className="text-gray-600">Billing</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10  ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white text-black p-8 rounded z-20 w-96 ">
              <h1 className="text-xl font-bold mb-4"> Add Team</h1>
              <div>
                <h1>Team Name</h1>
                <input
                  value={addTeam}
                  onChange={(e) => setAddTeam(e.target.value)}
                  type="text"
                  className="w-full  h-10 border border-slate-400 px-2 rounded-md "
                  placeholder="Enter team name"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="h-10 text-white bg-blue-500 hover:bg-blue-600 px-2 my-5 rounded-md"
                  onClick={handelClickAdd}
                >
                  Save
                </button>
                <button
                  type="submit"
                  className="h-10 text-white bg-blue-500 hover:bg-blue-600 px-2 my-5 rounded-md mx-2"
                  onClick={() => serOpenModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {openRename && (
          <div className="fixed inset-0 flex items-center justify-center z-10 ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white text-black p-8 rounded z-20 w-96 ">
              <h1 className="text-xl font-bold mb-4"> Add Team</h1>
              <div>
                <h1>Team Name</h1>
                <input
                  value={teamRename}
                  onChange={(e) => setTeamRename(e.target.value)}
                  type="text"
                  className="w-full placeholder:px-3 h-10 border border-slate-400 rounded-md "
                  placeholder="Enter team name"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="h-10 text-white bg-blue-500 hover:bg-blue-600 px-2 my-5 rounded-md"
                  onClick={handleRenameClick}
                >
                  Save
                </button>
                <button
                  type="submit"
                  className="h-10 text-white bg-blue-500 hover:bg-blue-600 px-2 my-5 rounded-md mx-2"
                  onClick={() => setOpenRename(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
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
    </>
  );
};

export default Organization;
