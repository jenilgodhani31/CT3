import Dashnavbar from "@/components/dashNavbar";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsFillChatLeftFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { AiFillHeart } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import MyContext from "@/context/myContext";
import Calendar from "react-calendar";
import dynamic from "next/dynamic";
import "react-circular-progressbar/dist/styles.css";
import {
  AiFillCloseCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const dashboard = () => {
  const context = useContext(MyContext);
  const [completedCommitIds, setCompletedCommitIds] = useState([]);
  const [user, setUser] = useState([]);
  const [userID, setUserId] = useState(null);
  const [value, setValue] = useState(new Date());
  const [celOpen, setCelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [commitOne, setCommitOne] = useState("");
  const [commitTwo, setCommitTwo] = useState("");
  const [commitThree, setCommitThree] = useState("");
  const [teamsData, setTeamsData] = useState([]);
  const [commit, setCommit] = useState([]);
  const [like, setLike] = useState([]);
  const [success, setSuccess] = useState("");
  const [teamName, setTeamName] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [commitReplyIndex, setCommitReplyIndex] = useState(-1);
  const [comment, setComment] = useState("");
  const [commentIndex, setCommentIndex] = useState(-1);
  const [commitCount, setCommitCount] = useState("");
  const [completedCount, setCompletedCount] = useState("");
  const [defaultTeamIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [storeComment, setStoreComment] = useState([]);
  const [commitID, setCommitID] = useState(null);
  const [commitReply, setCommitReplay] = useState("");
  const [showReply, setShowReply] = useState([]);
  const [commenTLike, setCommentLike] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-animated-element");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        // Check if the element is partially or fully in the viewport
        if (elementTop < window.innerHeight && elementBottom >= 0) {
          element.classList.add("animate");
        } else {
          element.classList.remove("animate");
        }
      });
    };
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decoded = jwtDecode(storedToken);
    viewUserData(decoded.sub);
  }, []);
  useEffect(
    (teamId) => {
      fetchCommitData();
      fetchCount(teamId);
      fetchCompletedCount(teamId);
      commentLike();
    },
    [teamId, like, commenTLike]
  );

  const viewUserData = async (userId) => {
    try {
      const response = await context.api.get(`/users/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.data) {
        setUser(response.data);
        setUserId(response.data.id);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred during viewUserData:", error);
    }
  };

  // Fetch team data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await context.api.get("/teams", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setTeamsData(response.data);
      if (response.data.length > 0) {
        const defaultTeamId = response.data[defaultTeamIndex].id;
        setTeamId(defaultTeamId);
        setTeamName(
          response.data[defaultTeamIndex].name.charAt(0).toUpperCase() +
            response.data[defaultTeamIndex].name.slice(1)
        );
      }
    } catch (error) {
      console.error("An error occurred during fetchCommitData:", error);
      setCommit([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  // Fetch commit data for a selected team
  const fetchCommitData = async () => {
    try {
      setLoading(true);
      const response = await context.api.get(`/team/${teamId}/commits`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          date: value,
        },
      });
      if (response) {
        setCommit(response.data);
      } else {
        console.log("Failed to fetch commit data");
      }
    } catch (error) {
      console.error("An error occurred during fetchCommitData:", error);
      setCommit([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  };

  // Handle team selection from dropdown
  const handelClick = (team) => {
    setTeamId(team.id);
    setTeamName(team.name.charAt(0).toUpperCase() + team.name.slice(1));
    setIsOpen(false);
    setCommitOne("");
    setCommitTwo("");
    setCommitThree("");
  };

  // Add a commit
  const addCommit = async (commit) => {
    try {
      const response = await context.api.post(
        `/team/${teamId}/commits`,
        { commit, date: value },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response) {
      }
    } catch (error) {
      console.error("An error occurred during addCommit:", error);
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setValue(date);
  };

  setTimeout(() => {
    setSuccess(null);
  }, 9000);

  // Form submission
  const handleFormSubmit = async () => {
    try {
      await addCommit(commitOne);
      await addCommit(commitTwo);
      await addCommit(commitThree);

      if (addCommit) {
        fetchCommitData();
        addMessage("Commit created successfully");
        setSuccess("Commit created successfully");
        // Call fetchCount() after successfully adding the commits
      }
      if (addCommit === "") {
        fetchCount(0);
      } else fetchCount();
    } catch (error) {
      console.error("An error occurred during handleFormSubmit:", error);
    }
  };

  // Update commit
  const updateData = async (commitId, updatedTaskName) => {
    try {
      const response = await context.api.patch(
        `team/${teamId}/commits/${commitId}`,
        { taskname: updatedTaskName },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        fetchCommitData();
      }
    } catch (error) {
      console.error("An error occurred during updateData:", error);
    }
  };

  // Handle update commit
  const handleUpdateCommit = async (commitId, updatedTaskName) => {
    try {
      await updateData(commitId, updatedTaskName);
      setUpdateIndex(-1);
      addMessage("Commit updated successfully");
      setSuccess("Commit updated successfully");
    } catch (error) {
      console.error("An error occurred during handleUpdateCommit:", error);
    }
  };

  // Delete commit
  const deleteData = async (commitId) => {
    try {
      const response = await context.api.delete(
        `team/${teamId}/commits/${commitId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response) {
      } else {
        console.log("Not deleted");
      }
    } catch (error) {
      console.error("An error occurred during deleteData:", error);
    }
  };

  const handelClickDelete = (commits) => {
    const ConfirmDelete = confirm("Are you sure want to remove this commit?");
    if (ConfirmDelete) {
      deleteData(commits.id);
      addMessage("Commit deleted successfully");
      setSuccess("Commit deleted successfully");
    }
  };

  // Like commit
  const likeData = async (commitId) => {
    try {
      const response = await context.api.patch(
        `team/${teamId}/commits/${commitId}/LikeCommit/${commitId}`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response) {
        setLike(response);
        addMessage("Commit liked ");
        setSuccess("Commit liked");
      }
    } catch (error) {
      console.error("An error occurred during likeData:", error);
    }
  };

  // updateStatus
  const UpdateStats = async (commitId) => {
    try {
      const response = await context.api.post(
        `team/${teamId}/completedStatus/${commitId}`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        addMessage("Completed Commit successfully");
        setSuccess("Completed Commit successfully");
        fetchCompletedCount();
      }
    } catch (error) {
      console.error("An error occurred during UpdateStats:", error);
    }
  };

  const handelSubmit = async (commits) => {
    await UpdateStats(commits.id);
    setCompletedCommitIds((prevIds) => [...prevIds, commits.id]);
  };

  const handelClickLike = (commit) => {
    likeData(commit.id);
  };

  const isCommitComplete =
    commitOne !== "" && commitTwo !== "" && commitThree !== "" && value !== "";

  // create a comment
  const createComment = async (commitId) => {
    try {
      const response = await context.api.post(
        `team/${teamId}/commits/${commitId}/comments`,
        { comment },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        setCommitID(response.data.id);
        const newComment = response.data;
        setStoreComment((prevComments) => ({
          ...prevComments,
          [commitId]: [...(prevComments[commitId] || []), newComment],
        }));
        addMessage("Comment Added!");
        setSuccess("Comment Added!");
      }
    } catch (error) {
      console.error("An error occurred during UpdateStats:", error);
    }
  };
  const handelOpenComment = (index) => {
    if (commentIndex === index) {
      setCommentIndex(-1); // Close the comment box if already open
    } else {
      setCommentIndex(index); // Open the comment box for the clicked commit
    }
  };

  const handelAddComment = (commits) => {
    createComment(commits.id);
    setCommentIndex(-1);
  };

  //  count commit fo to day
  const fetchCount = async () => {
    try {
      const response = await context.api.post(
        `team/${teamId}/commits/countCommits`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      let count = parseInt(response.data);
      if (isNaN(count)) {
        count = 0; // Set commit count to 0 if count is NaN
      }
      setCommitCount(count);
    } catch (error) {
      console.error("An error occurred during fetchCount:", error);
    }
  };

  // count completed commit
  const fetchCompletedCount = async () => {
    try {
      const response = await context.api.post(
        `team/${teamId}/commits/countCompletedCommits`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      let count = parseInt(response.data);
      if (isNaN(count)) {
        count = 0;
      }
      setCompletedCount(count);
    } catch (error) {
      console.error("An error occurred during fetchCompletedCount:", error);
    }
  };

  const handelClose = () => {
    setCommentIndex(-1);
  };

  // comment Rpy
  const commentRpy = async (commitId, comment) => {
    try {
      const response = await context.api.post(
        `/team/${teamId}/user/${userID}/commits/${commitId}/comments/${commitID}/commentreply`,
        { comment },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        const data = response.data;
        setShowReply((pervCommitRpy) => ({
          ...pervCommitRpy,
          [commitID]: [...(pervCommitRpy[commitID] || []), data],
        }));
        addMessage("create comment Reply");
        setSuccess("create comment Reply");
      }
    } catch (error) {
      console.error("An error occurred during commentRpy:", error);
    }
  };

  const handelOpenCommentReply = (index) => {
    if (commentIndex === index) {
      setCommitReplyIndex(-1); // Close the comment box if already open
    } else {
      setCommitReplyIndex(index); // Open the comment box for the clicked commit
    }
  };
  const handelCrp = (e) => {
    e.preventDefault();
    setCommitReplyIndex(-1);
  };

  const handelCommentSubmit = (comment) => {
    commentRpy(comment.id, commitReply);
    setCommitReplyIndex(-1);
  };

  // comment like
  const commentLike = async (commitId) => {
    try {
      const response = await context.api.patch(
        `/team/${teamId}/commits/${commitId}/LikeComment/${commitID}`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response);
      {
        addMessage("Comment Liked");
        setSuccess("Comment Liked");
        setCommentLike(response.data);
      }
    } catch (error) {
      console.error("An error occurred during commentLike:", error);
    }
  };

  //  commentLike
  const handelClickCommentLike = (commits) => {
    commentLike(commits.id);
  };

  const addMessage = (msg) => {
    setMessage([...message, msg]);
  };

  const time = new Date();
  const Time = `${time.getHours()}:${time.getMinutes()}`;

  const series = [completedCount, commitCount];
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
          },
        },
      },
    },
    labels: ["Completed Commit", "Today Commit"],
  };
  return (
    <div className="bg-gray-200 ">
      <Dashnavbar />
      <div>
        {loading ? (
          <div>
            <svg
              aria-hidden="true"
              className="w-16 h-14 mt-5  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="md:flex">
            <div className="md:mx-10 mt-10">
              <div className="flex">
                <h1 className="font-bold text-4xl">{teamName}</h1>
                <div className="flex">
                  <button
                    className="mt-5 ml-3"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <AiOutlineDown />
                  </button>
                  {isOpen && (
                    <div className="bg-white absolute shadow-md rounded-lg ml-10 ">
                      {teamsData.map((team) => (
                        <div className="hover:bg-slate-200">
                          {" "}
                          <button
                            className=" my-2 flex px-5  "
                            type="submit"
                            key={team.id}
                            onClick={() => handelClick(team)}
                          >
                            {team.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg mt-3  ">
                <div className="flex">
                  <h1 className="flex items-center text-2xl font-bold mx-3 mt-2 mb-5">
                    Commits
                  </h1>
                </div>
                <div className="border bg-slate-400"></div>

                <div className="flex mt-3 md:ml-6">
                  {user && (
                    <div>
                      <img
                        className="w-16 h-16 rounded-full relative ring-slate-300  ml-9 ring-4 p-1 md:ml-12 mt-10"
                        src="avtar.jpeg"
                        alt=""
                      />

                      <p className="text-center mt-2 text-sm ml-16 ">
                        {user.fname} {user.lname}
                      </p>
                    </div>
                  )}
                  {commit.length === 0 ? (
                    <div className="ml-5 mb-5 mr-5 ">
                      <div className="flex mt-2 ml-10">
                        <h1 className="bg-blue-200 text-blue-600 rounded-full text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                          1
                        </h1>
                        <input
                          id="inputCommit"
                          type="text"
                          value={commitOne}
                          onChange={(e) => setCommitOne(e.target.value)}
                          placeholder="Commit #"
                          className="bg-slate-200 rounded-lg mx-2 h-10 px-2  w-InputWidth"
                        />
                      </div>
                      <div className="flex mt-2 ml-10">
                        <h1 className="bg-blue-200 text-blue-600 rounded-full text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                          2
                        </h1>
                        <input
                          id="inputCommit"
                          type="text"
                          value={commitTwo}
                          onChange={(e) => setCommitTwo(e.target.value)}
                          placeholder="Commit #"
                          className="bg-slate-200 rounded-lg mx-2 h-10  w-InputWidth px-2"
                        />
                      </div>
                      <div className="flex mt-2 ml-10">
                        <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                          3
                        </h1>
                        <input
                          id="inputCommit"
                          type="text"
                          value={commitThree}
                          onChange={(e) => setCommitThree(e.target.value)}
                          placeholder="Commit #"
                          className="bg-slate-200 rounded-lg mx-2 h-10 px-2 w-InputWidth"
                        />
                      </div>
                      <div className="border bg-slate-400 mt-3"></div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-500 h-10 text-white my-3 rounded-lg px-2 hover:bg-blue-600 disabled:bg-blue-300"
                          onClick={handleFormSubmit}
                          disabled={!isCommitComplete}
                        >
                          SAVE COMMITS
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-2">
                      {commit.map((commits, index) => {
                        return (
                          <div className="mx-5 mb-5" key={index}>
                            <div className="flex">
                              {completedCommitIds.includes(commits.id) && (
                                <span className="text-blue-500 text-3xl ml-5 my-2">
                                  <BsCheckCircleFill />
                                </span>
                              )}
                              {!completedCommitIds.includes(commits.id) && (
                                <>
                                  <h1 className="group  relative ">
                                    <button
                                      onClick={() => handelSubmit(commits)}
                                      className="bg-blue-200 ml-5   text-blue-600 rounded-full text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-2 px-2"
                                    >
                                      {index + 1}
                                    </button>
                                    <span
                                      className="group-hover:opacity-100 transition-opacity w-24 bg-gray-500 px-1 py-1 ml-6 text-xs text-gray-100 rounded-md absolute
                                      -translate-x-1/2 translate-y-full opacity-0 m-4 "
                                    >
                                      mark Complete
                                    </span>
                                  </h1>
                                </>
                              )}

                              {updateIndex === index ? (
                                <form
                                  onSubmit={(e) => {
                                    setCommit("");
                                    e.preventDefault();
                                    handleUpdateCommit(
                                      commits.id,
                                      commits.taskname
                                    );
                                  }}
                                >
                                  {" "}
                                  <input
                                    type="text"
                                    value={commits.taskname}
                                    className="update bg-slate-200 rounded-lg mx-2 px-2  lg:w-w-e xl:w-width h-10  border-none"
                                    onChange={(e) => {
                                      const updatedCommit = [...commit];
                                      updatedCommit[index].taskname =
                                        e.target.value;
                                      setCommit(updatedCommit);
                                    }}
                                  />
                                </form>
                              ) : (
                                <>
                                  <p className="rounded-lg mx-2 xl:w-width md:w-md-width lg:w-m-width  h-10 py-3">
                                    {commits.taskname}
                                  </p>
                                </>
                              )}
                              {
                                <>
                                  {
                                    <>
                                      <button
                                        className="opacity-0 hover:opacity-100 hover:text-stone-400"
                                        onClick={() => setUpdateIndex(index)}
                                      >
                                        <FaPencil />
                                      </button>
                                      <button
                                        className="opacity-0 hover:opacity-100 hover:text-red-700"
                                        onClick={() =>
                                          handelClickDelete(commits)
                                        }
                                      >
                                        <MdDelete />
                                      </button>
                                    </>
                                  }
                                </>
                              }
                              <button
                                className="text-blue-200 hover:text-blue-700 mx-1 mt-2"
                                onClick={() => handelOpenComment(index)}
                              >
                                <BsFillChatLeftFill />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-700 mx-1 text-lg mt-1"
                                onClick={() => handelClickLike(commits)}
                              >
                                <AiFillHeart />
                              </button>
                              <p className="mt-3">({commits.likes})</p>
                            </div>
                            {commentIndex === index && (
                              <>
                                <div className="flex">
                                  <form
                                    className="flex lg:ml-10"
                                    onSubmit={(e) => {
                                      setComment("");
                                      e.preventDefault();
                                      handelAddComment(commits);
                                    }}
                                  >
                                    <img
                                      className="w-12  h-12 rounded-full p-1"
                                      src="avtar.jpeg"
                                      alt=""
                                    />
                                    <input
                                      type="text"
                                      value={comment}
                                      placeholder="#Comment"
                                      className="update bg-slate-200 rounded-lg md:w-md-w-inputWidth mx-2 px-2 my-1   w-inputWidth lg:w-w-m h-10 xl:w-inputWidth  "
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                  </form>

                                  <button onClick={handelClose}>
                                    <AiFillCloseCircle />
                                  </button>
                                </div>
                              </>
                            )}

                            {storeComment[commits.id]?.map((comment, Index) => (
                              <>
                                {" "}
                                <div
                                  className="flex-wrap flex w-c-width md:ml-5 ld:mx-10"
                                  key={Index}
                                >
                                  <div className="items-center flex">
                                    <img
                                      className="w-8 h-8 rounded-full mt-2"
                                      src="/avtar.jpeg"
                                      alt=""
                                    />
                                    <h1 className="mx-2 bg-slate-200  mt-1 w-d-width md:w-md-width lg:w-w-w-width xl:w-inputWidth h-10 py-2 rounded-md px-2">
                                      {comment.comment}
                                    </h1>
                                  </div>
                                  <div className="flex ml-auto">
                                    <button
                                      className="text-blue-200 hover:text-blue-700 mx-1"
                                      onClick={() =>
                                        handelOpenCommentReply(index)
                                      }
                                    >
                                      <BsFillChatLeftFill />
                                    </button>
                                    <button
                                      className="text-red-200 hover:text-red-700 mx-1"
                                      onClick={() =>
                                        handelClickCommentLike(commits)
                                      }
                                    >
                                      <AiFillHeart />
                                    </button>
                                    <p className="mt-2">({comment.likes})</p>
                                  </div>
                                  <div className="flex-wrap flex ml-5">
                                    {commitReplyIndex === Index && (
                                      <>
                                        <form
                                          className="flex"
                                          onSubmit={(e) => {
                                            setCommitReplay("");
                                            e.preventDefault();
                                            handelCommentSubmit(commits);
                                          }}
                                        >
                                          <img
                                            className="w-8 h-8 rounded-full mt-2"
                                            src="/avtar.jpeg"
                                            alt=""
                                          />
                                          <input
                                            placeholder=" #commitReply"
                                            value={commitReply}
                                            onChange={(e) =>
                                              setCommitReplay(e.target.value)
                                            }
                                            type="text"
                                            className="bg-slate-200 rounded-lg ml-2 mt-1 md:w-md-r-width w-width px-2 lg:w-w-m xl:w-inputWidth h-10 "
                                          />
                                        </form>
                                        <button
                                          onClick={handelCrp}
                                          className="mx-1 "
                                        >
                                          <AiFillCloseCircle />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="lg:ml-20 md:ml-10">
                                  {showReply[comment.id]?.map(
                                    (comment, index) => {
                                      return (
                                        <div
                                          className="flex  items-center"
                                          key={index}
                                        >
                                          <img
                                            className="w-8 h-8 rounded-full mt-2"
                                            src="/avtar.jpeg"
                                            alt=""
                                          />
                                          <h1 className="mx-2 bg-slate-200  mt-1 w-InputWidth md:w-md-R-width xl:w-inputWidth lg:w-w-w-width h-10 py-2 rounded-md px-2">
                                            {comment.comment}
                                          </h1>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="border bg-slate-400"></div>
                <div className="flex mt-3">
                  <div>
                    <img
                      className="w-16 h-16 rounded-full relative ring-slate-300 ring-4 p-1 ml-10 md:ml-20 mt-10"
                      src="avtar.jpeg"
                      alt=""
                    />
                    <p className="text-center mt-2 text-sm ml-12 ">marks low</p>
                  </div>

                  <div className=" mb-5 ml-5  ">
                    <div className="flex ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        1
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        2
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        3
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border bg-slate-400"></div>
                <div className="flex mt-3">
                  <div>
                    <img
                      id="img"
                      className="w-16 h-16 rounded-full relative ring-slate-300 ring-4 p-1  md:ml-20 mt-10"
                      src="avtar.jpeg"
                      alt=""
                    />
                    <p className="text-center mt-2 text-sm  ml-12">Jems bond</p>
                  </div>

                  <div className=" mb-5 ml-5  ">
                    <div className="flex ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        1
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        2
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        3
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border bg-slate-400"></div>

                <div
                  className="scroll-animated-element flex mt-3"
                  data-te-animation-start="onScroll"
                >
                  <div>
                    <img
                      id="img"
                      className="w-16 h-16 rounded-full relative ring-slate-300 ring-4 p-1 ml:10  md:ml-16 mt-10"
                      src="avtar.jpeg"
                      alt=""
                    />
                    <p className="text-center mt-2 text-sm ml-10 ">
                      lumons Doe
                    </p>
                  </div>

                  <div className=" mb-5 ml-5  ">
                    <div className="flex ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        1
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        2
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        3
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border bg-slate-400"></div>
                <div
                  className="scroll-animated-element flex mt-3"
                  data-te-animation-start="onScroll"
                >
                  <div>
                    <img
                      id="img"
                      className="w-16 h-16 rounded-full relative ring-slate-300 ring-4 p-1 ml:10  md:ml-16 mt-10"
                      src="avtar.jpeg"
                      alt=""
                    />
                    <p className="text-center mt-2 text-sm ml-10 ">
                      lumons Doe
                    </p>
                  </div>

                  <div className=" mb-5 ml-5  ">
                    <div className="flex ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        1
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        2
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        3
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border bg-slate-400"></div>
                <div
                  className="scroll-animated-element flex mt-3"
                  data-te-animation-start="onScroll"
                >
                  <div>
                    <img
                      id="img"
                      className="w-16 h-16 rounded-full relative ring-slate-300 ring-4 p-1 ml:10 md:ml-16 mt-10"
                      src="avtar.jpeg"
                      alt=""
                    />
                    <p className="text-center mt-2 text-sm ml-10 ">
                      {" "}
                      jumons foe
                    </p>
                  </div>

                  <div className=" mb-5 ml-5  ">
                    <div className="flex ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        1
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        2
                      </h1>
                    </div>
                    <div className="flex mt-2 ">
                      <h1 className="bg-blue-200 text-blue-600 rounded-full  text-lg border-2 border-dotted border-blue-500 h-8 w-8 my-1 px-2">
                        3
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                id="cel"
                className="bg-white shadow-lg mt-24 h-12  rounded-md w-progress flex   cursor-pointer py-1 px-2 "
                onClick={() => setCelOpen(!celOpen)}
              >
                <div
                  className="flex justify-center  items-center py-2 bg-slate-200 rounded-md w-56"
                  id="Cel"
                >
                  <p className="text-blue-500 px-5">
                    <AiOutlineLeft />
                  </p>

                  <p>Today</p>
                  <p className="text-blue-500 px-5">
                    {" "}
                    <AiOutlineRight />
                  </p>
                </div>

                <div className=" ml-auto ">
                  <img src="/cal.PNG" alt="" height={10} />
                </div>
              </div>
              {celOpen && (
                <div className="   rounded-md">
                  <Calendar onChange={handleDateChange} value={value} />
                </div>
              )}
              <div
                className="bg-white shadow-md rounded-lg inline-block w-progress mt-5 "
                id="status"
              >
                <div className="h-14">
                  <h1 className="text-xl font-bold py-4 mx-2">Status</h1>
                </div>

                <div className="border bg-black"></div>

                <div className="mx-auto mb-5   ">
                  <div>
                    <ApexCharts
                      options={options}
                      series={series}
                      type="radialBar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white shadow-md rounded-lg inline-block w-progress mt-5  h-72  scroll-container "
                id="Activity"
              >
                <div className="h-14">
                  <h1 className="text-xl font-bold py-4 mx-2">Activity</h1>
                </div>

                <div className="border bg-black"></div>
                <div className=" ">
                  {message.length === 0 ? (
                    <p className="ml-20 hover:text-blue-500 cursor-pointer ">No Activity </p>
                  ) : (
                    message.map((msg, index) => {
                      return (
                        user && (
                          <div
                            className=" flex my-2 mx-2 relative border-b h-16 "
                            key={index}
                          >
                            <img
                              className="w-12  h-12 rounded-full p-1"
                              src="avtar.jpeg"
                              alt=""
                            />

                            <p className="text-center mt-1  ml-2 text-blue-500 font-bold text-sm ">
                              {user.fname.charAt(0).toUpperCase() +
                                user.fname.slice(1)}{" "}
                              {user.lname}
                            </p>
                            <p className=" mt-5 text-sm absolute ml-14 ">
                              {message[index]}
                            </p>

                            <div className=" ml-auto">
                              <p className="text-sm text-slate-500 mr-2 ">
                                {Time}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })
                  )}
                </div>

                <div className="h-52"></div>
              </div>
            </div>

            {success && (
              <div className="absolute bottom-12 flex left-0 justify-start bg-white h-12 mt-5 mx-5 rounded-md shadow-lg px-6 py-3 text-green-600 transition-transform transform translate-x-12">
                <p className="py-1 mx-2 ">
                  <IoIosCheckmarkCircleOutline />
                </p>
                {success}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default dashboard;
