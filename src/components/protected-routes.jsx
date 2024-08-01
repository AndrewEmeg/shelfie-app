import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/signIn" />;
}

export default ProtectedRoutes;
