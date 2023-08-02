import DashNavbar from "@/components/dashNavbar";
import MyContext from "@/context/myContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const teamsetting = () => {
  const router = useRouter();
  const context = useContext(MyContext);
  const { teamId } = router.query;
  const [Open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [teamData, setTeamData] = useState("");
  const [select, setSelect] = useState("");
  const [success, setSuccess] = useState("");
  const [AddMember, setAddMember] = useState("");
  const [removeMember, setRemoveMember] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPage] = useState(5);
  const lastItem = page * itemsPage;
  const firstItem = lastItem - itemsPage;

  //   show users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await context.api.get(`teams/${teamId}/members`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setTeamData(response.data);
      } catch (error) {
        console.error("An error occurred during fetchTeamMembersData:", error);
      }
    };

    fetchData();
  }, [teamId, AddMember, removeMember]);
  const openModel = () => {
    setIsOpen(true);
  };

  setTimeout(() => {
    setSuccess(null);
  }, 5000);
  //   add api
  const addMember = async (userids) => {
    try {
      const response = await context.api.post(
        `/teams/${teamId}/add-members`,
        {
          userids,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        setAddMember(response);
        setSuccess("Add member successfully");
        console.log("add member");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred during addMember:", error);
    }
  };

  const OpenToggleDropdown = (userId) => {
    setOpen((prevState) => ({
      [userId]: !prevState[userId],
    }));
  };

  const handelClickAddMember = () => {
    addMember(select);
    setIsOpen(false);
  };

  // Remove Member api
  const RemoveMember = async (userId) => {
    try {
      const Response = await context.api.delete(
        `/teams/${teamId}/members/${userId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (Response) {
        setRemoveMember(Response);
        setSuccess("Remove Member Successfully");
        console.log("Remove Member Successfully");
      } else {
        console.log("fail remove");
      }
    } catch (error) {
      console.error("An error occurred during RemoveMember:", error);
    }
  };

  const handelRemoveClick = (user) => {
    const confirmation = confirm(
      "Are you sure you want to remove this member?"
    );
    if (confirmation) {
      RemoveMember(user.id);
      alert("Member removed successfully!");
    } else {
      alert("Member removal canceled.");
    }
  };

  const handelClick = () => {
    router.push("/organization");
  };

  const findUser = context.userData.filter((user) => {
    return user.fname.includes(search) + user.lname.includes(search);
  });
  const memberData = (search ? findUser : context.userData)?.slice(
    firstItem,
    lastItem
  );
  const totalPage = Math.ceil(
    (search ? findUser : context.userData)?.length / itemsPage
  );

  const teamMember = teamData?.users?.slice(firstItem, lastItem);
  const totalMemberPage = Math.ceil(teamData?.users?.length / itemsPage);
  return (
    <div className="bg-slate-300 min-h-screen">
      <DashNavbar />
      <div className="bg-white lg:w-t-width mx-auto rounded-xl mt-32 shadow-md overflow-x-auto">
        <div className="mx-5">
          <div className="mx-5 flex">
            <h1 className="font-bold flex items-center  lg:text-3xl py-4">
              Team Setting:{teamData.name}
            </h1>
            <button
              onClick={handelClick}
              className="text-blue-400  ml-auto items-center flex hover:underline"
            >
              Back to organization
            </button>
          </div>

          <div>
            <div className="">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Member
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Admin
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamMember?.map((user) => (
                    <tr key={user.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {user.fname} {user.lname}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className=" px-4 py-3 ">
                        <button
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                          onClick={() => OpenToggleDropdown(user.id)}
                        >
                          <svg className="w-5 h-5">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        {Open[user.id] && (
                          <div className="  absolute  md:mx-1 mx-10  w-32 shadow-lg bg-white rounded divide-y divide-gray-100 ">
                            <ul className="py-1 text-sm">
                              <li>
                                <button
                                  type="submit"
                                  className="block py-2 px-4 hover:bg-gray-100 text-xs"
                                  onClick={() => handelRemoveClick(user)}
                                >
                                  Remove Member
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="list-style-none flex justify-end items-center">
                  <li>
                    <button
                      onClick={() => setPage(page - 1)}
                      className={`${
                        page === 1 ? "pointer-events-none" : ""
                      }  relative  rounded-full bg-transparent px-1 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                    >
                      <AiOutlineLeft />
                    </button>
                  </li>
                  {Array.from({ length: totalMemberPage }, (_, i) => i + 1).map(
                    (page) => {
                      return (
                        <li>
                          <button
                            onClick={() => setPage(page)}
                            className={`${
                              page === page
                                ? " bg-transparent  " // Change the background color to gray
                                : " bg-gray-500 hover:bg-neutral-500 "
                            } relative block rounded-full px-3 py-1.5 text-sm transition-all duration-300`}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    }
                  )}
                  <li>
                    <button
                      className={`${
                        page === totalPage ? "pointer-events-none" : ""
                      }relative block rounded-full bg-transparent px-1 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  `}
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPage}
                    >
                      <AiOutlineRight />
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 h-10 rounded-md px-2 text-white my-2"
                  onClick={openModel}
                >
                  Add member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white text-black p-8 rounded z-20 w-2/4 ">
            <h1 className="text-xl font-bold mb-4"> Add members to team</h1>

            <div>
              <h1>Search Member</h1>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 px-2 border border-stone-200 rounded-md w-full bg-slate-200"
                placeholder="Search"
              />
            </div>

            <div className="border border-stone-200 rounded-md mt-5">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    {memberData.length === 0 ? (
                      <div className="h-16"> 
                        <h1 className="text-black text-xl mx-80 items-center py-4">No Members Found</h1>
                      </div>
                    ) : (
                      memberData.map((user) => {
                        return (
                          <tr
                            key={user.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="w-4 p-4">
                              <div className="flex items-center ">
                                <input
                                  value={select}
                                  onClick={() => {
                                    const selectedUserIds = [...select];
                                    const index = selectedUserIds.indexOf(
                                      user.id
                                    );
                                    if (index === -1) {
                                      selectedUserIds.push(user.id);
                                    } else {
                                      selectedUserIds.splice(index, 1);
                                    }
                                    setSelect(selectedUserIds);
                                  }}
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {user.fname} {user.lname}
                              <p className="text-gray-400">{user.email}</p>
                            </th>
                            <td className="px-6 py-4">{user.role}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="list-style-none flex items-center justify-end">
                <li>
                  <button
                    onClick={() => setPage(page - 1)}
                    className={`${
                      page === 1 ? "pointer-events-none" : ""
                    }  relative  rounded-full bg-transparent  py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                  >
                    <AiOutlineLeft />
                  </button>
                </li>
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                  (page) => {
                    return (
                      <li>
                        <button
                          onClick={() => setPage(page)}
                          className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                )}
                <li>
                  <button
                    className={`${
                      page === totalPage ? "pointer-events-none" : ""
                    }relative block rounded-full bg-transparent  py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPage}
                  >
                    <AiOutlineRight />
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handelClickAddMember}
              >
                Save
              </button>
              <button
                className="px-4 py-2 mt-4 ml-2  rounded bg-slate-200 hover:bg-slate-300"
                onClick={() => setIsOpen(false)}
              >
                Close
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
  );
};

export default teamsetting;
