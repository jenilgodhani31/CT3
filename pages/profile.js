import React, { useContext, useEffect, useState } from "react";
import DashNavbar from "@/components/dashNavbar";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import MyContext from "@/context/myContext";
import jwtDecode from "jwt-decode";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { MdModeEditOutline } from "react-icons/md";
import Link from "next/link";
const Profile = () => {
  const router = useRouter();
  const context = useContext(MyContext);
  const [success, setSuccess] = useState("");
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imgProfile, SetImgProfile] = useState(null);

  const userUpdate = async (fname, lname) => {
    try {
      const Response = await context.api.patch(
        `/users/${user}`,
        {
          fname,
          lname,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (Response) {
        setSuccess(" Username updated successfully");
        console.log("update name");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred during updateUser:", error);
    }
  };

  const ProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imgProfile);

      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `/users/${user}/upload-image`,
        formData,
        config
      );

      if (response.status === 200) {
        setSuccess("Change profile successfully");
      } else {
        console.log("Failed to upload profile image");
      }
    } catch (error) {
      console.error("An error occurred during ProfileImage:", error);
    }
  };

  const handleFileChange = (e) => {
    e.target.value;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const base64WithoutPrefix = base64.split(",")[1]; // Extract base64 string without the prefix
      SetImgProfile(base64WithoutPrefix);
    };

    reader.readAsDataURL(file);
  };

  const handelClickUser = () => {
    setFirstName("");
    setLastName("");
    userUpdate(fname, lname);
    setAccordion1(!accordion1);
    ProfileImage(imgProfile);
  };
  useEffect(() => {
    userUpdate();
  }, [fname, lname]);
  //   ChangePassword api
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await context.api.patch(
        `/users/${user}/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        localStorage.setItem("token", `Bearer ${response.data}`);
        setSuccess("Change password successfully");
      } else {
        console.log("Failed to change password");
      }
    } catch (error) {
      console.error("An error occurred during changePassword:", error);
    }
  };

  const handleInputChange = (e) => {
    setOldPassword("");
    setNewPassword("");
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  const handleFormSubmit = () => {
    e.preventDefault();
    changePassword(OldPassword, NewPassword);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const decoded = jwtDecode(storedToken);
    setUser(decoded.sub);
  }, []);

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



  setTimeout(() => {
    setSuccess(null);
  }, 9000);

  return (
    <div className=" min-h-screen bg-slate-300">
      <DashNavbar />
      <div
        className="bg-white lg:w-P-width mx-auto rounded-xl mt-44 shadow-md  "
        id="Input"
      >
        <div className="flex md:mx-12 ">
          <div className="" id="photo">
            <img src="/profile.png" alt="" width={500} height={400} />
          </div>
          <div>
            <div className="flex">
              {" "}
              <h1 className="font-bold text-3xl py-4">Profile</h1>
              <Link href="/dashboard" className="ml-auto text-blue-500 hover:underline py-5">Back to Home</Link>
            </div>

            <div>
              <div className=" bg-slate-200 border-b border-slate-400 shadow-lg rounded-lg">
                <button
                  className="w-full flex justify-between items-center py-2 px-4  rounded  text-lg font-semibold text-left cursor-pointer focus:outline-none"
                  onClick={() => toggleAccordion("accordion1")}
                >
                  <span className="w-w-34r" id="input">
                    Profile
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform transform  ${
                      accordion1 ? "rotate-45" : "rotate-20"
                    }`}
                  >
                    <AiOutlinePlus />
                  </svg>
                </button>
                {accordion1 && (
                  <div className="py-2 px-4">
                    <div className="md:flex">
                      <div class="group relative block overflow-hidden rounded-md transition-all">
                        <div>
                          <img
                            id="img"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src="avtar.jpeg"
                            alt=""
                          />
                          <div class="absolute -bottom-52 group-hover:bottom-1 right-2 left-2 transition-all duration-200 mx-1 ">
                            <button
                              type="submit"
                              onClick={() => setIsOpen(!isOpen)}
                              class="hover:text-primary-600 text-lg transition duration-200 font-medium text-white "
                            >
                              {" "}
                              <MdModeEditOutline />
                            </button>
                          </div>
                        </div>
                      </div>

                      <input
                        id="Fname"
                        type="text"
                        placeholder="First name"
                        value={fname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border border-gray-300 h-10 mx-2 rounded-md px-3 placeholder-px-3"
                      />
                      <input
                        id="Lname"
                        type="text"
                        placeholder="Last name"
                        value={lname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border border-gray-300 h-10 mx-2 rounded-md px-3 placeholder-px-3"
                      />
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-blue-500 px-2 text-white h-10 my-3 w-20 rounded-md mx-12"
                        onClick={handelClickUser}
                      >
                        Save
                      </button>
                      <button
                        onClick={openModal}
                        className="mx-auto text-blue-500"
                      >
                        Change Password
                      </button>
                    </div>
                    {isOpen && (
                      <form>
                        <input type="file" onChange={handleFileChange} />
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className=" bg-slate-200 border-b border-slate-400 shadow-lg rounded-lg mt-4">
              <button
                className="w-full flex justify-between items-center py-2 px-4 text-lg font-semibold text-left cursor-pointer focus:outline-none"
                onClick={() => toggleAccordion("accordion2")}
              >
                <span>Reminders</span>
                <svg
                  className={`h-4 w-4 transition-transform transform ${
                    accordion2 ? "rotate-45" : "rotate-20"
                  }`}
                >
                  <AiOutlinePlus />
                </svg>
              </button>
              {accordion2 && (
                <div className="  py-2 px-4">
                  <div className=" bg-white rounded px-4 py-2">
                    <div>
                      <div className="flex h-10 border-b-2 border-black items-center">
                        <p className="ml-auto mx-2">Device</p>
                        <p>Email</p>
                      </div>
                      <div className="flex h-8 mt-2">
                        <p className="text-sm">
                          Remind me to enter my Commits at.
                        </p>
                        <input type="time" className="md:mx-6" />

                        <input
                          type="checkbox"
                          className="round-full w-4 h-4  ml-auto mx-10"
                        />
                        <input type="checkbox" className="round-full w-4 h-4" />
                      </div>
                      <div className="flex h-8">
                        <p className="text-sm ">Remind me of my Commits at</p>
                        <input type="time" className="md:mx-16" />
                        <input
                          type="checkbox"
                          className="round-full w-4 h-4  ml-auto mx-10"
                        />
                        <input type="checkbox" className="round-full w-4 h-4" />
                      </div>
                      <div className="flex h-8">
                        <p className="text-sm">
                          Remind me of my Commits again at.
                        </p>
                        <input type="time" className="md:mx-6" />
                        <input
                          type="checkbox"
                          className="round-full w-4 h-4  ml-auto mx-10"
                        />
                        <input type="checkbox" className="round-full w-4 h-4" />
                      </div>
                      <p className="py-2 text-xs text-slate-400">
                        Your Reminder settings are different to each team you
                        are a member of.
                      </p>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 px-2 text-white rounded-md shadow-md h-8"
                        onClick={() => setAccordion2(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" bg-slate-200 border-b border-slate-400 shadow-lg rounded-lg mt-4">
              <button
                className="w-full flex justify-between items-center py-2 px-4  text-lg font-semibold text-left cursor-pointer focus:outline-none"
                onClick={() => toggleAccordion("accordion3")}
              >
                <span>Notifications</span>
                <svg
                  className={`h-4 w-4 transition-transform transform ${
                    accordion3 ? "rotate-45 " : "rotate-20"
                  }`}
                >
                  <AiOutlinePlus />
                </svg>
              </button>
              {accordion3 && (
                <div className="bg-gray-200 py-2 px-4 ">
                  <div className="bg-white rounded-md px-2">
                    <div className="flex h-10 border-b-2 border-black items-center">
                      <p className="ml-auto mx-2">Device</p>
                      <p>Email</p>
                    </div>
                    <div className="flex h-8 mt-2">
                      <p className="text-sm">Member entered commitss.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4 ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">Member completed a commit.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">Member completed all commits.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">
                        First member to complete commits.
                      </p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">Team completed 75% commits.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">Team completed all commits.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>
                    <div className="flex h-8">
                      <p className="text-sm">Team daily summary.</p>
                      <input
                        type="checkbox"
                        className="round-full w-4 h-4  ml-auto mx-10"
                      />
                      <input type="checkbox" className="round-full w-4 h-4" />
                    </div>

                    <p className="text-slate-400 text-sm">
                      These settings are unique to each Team you are on.
                    </p>

                    <button
                      className="bg-blue-500 hover:bg-blue-600 px-2 mt-1 text-white rounded-md shadow-lg py-2 mb-2 "
                      onClick={() => setAccordion3(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white text-black p-8 rounded z-20  ">
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="password"
                  placeholder="Old Password"
                  name="oldPassword"
                  value={OldPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={NewPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-500 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
  );
};

export default Profile;
