import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin")

  const isApproved = token && isAdmin

  return isApproved ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;