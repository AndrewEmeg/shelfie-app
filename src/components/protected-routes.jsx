/* eslint-disable react/prop-types */
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signIn" />;
  }

  return children;
}

export default ProtectedRoutes;
