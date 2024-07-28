/* eslint-disable react/prop-types */

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
};

export default Home;
