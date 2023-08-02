import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import axios from "axios";
const MyState = (props) => {

  const [userData, setUserData] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  //   user api
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("response", response);
        if (response) {
          setUserData(response.data); // Replace setUserData(response) with setUserData(response.data)
        } else {
          console.log("Error fetching users");
        }
      } catch (error) {
        console.error("An error occurred during fetchUsersData:", error);
      }
    };

    fetchUsersData();
  }, []);

  //   teams api

  return (
    <MyContext.Provider value={{ api, userData}}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
