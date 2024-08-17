/* eslint-disable react/prop-types */

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
// import { useState, useEffect } from "react";
// import HomeNav from "../components/home-nav";
// import Search from "../components/search";

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { currentUser, userData } = useAuth();
  console.log("home is about to start running");
  console.log(userData);
  // useEffect(() => {
  //   const unsubscribe = () => {
  //     if (userData) {
  //       setIsLoading(false);
  //     }
  //   };
  //   return unsubscribe;
  // }, [userData]);

  return currentUser ? (
    <>
      <Header />

      {/* <Search /> */}
      <Outlet />
    </>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
};

// const Review = () => {
//   return <div></div>;
// };

export default Home;
