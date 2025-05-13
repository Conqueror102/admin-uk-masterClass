// components/AdminPrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 


const AdminPrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/admin-login" />;

  try {
    const decoded = jwtDecode(token);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/admin-login" />;
    }

    // Optional: check if it's actually an admin token
    if (decoded.role !== "admin") {
      return <Navigate to="/unauthorized" />;
    }

    return <Outlet />; // Proceed to admin dashboard or protected component

  } catch (err) {
     console.error("Token error:", err)
    localStorage.removeItem("token");
    return <Navigate to="/admin-login" />;
  }
};

export default AdminPrivateRoute;
