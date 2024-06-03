import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_view from "./views/Navbar_view";
import api from "./axiosAPI";

export default function Navbar({loading, setLoading, isLoggedIn, setLogIn})  {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/getSession");
        const isAuthenticated = response.data.authenticated;
        setLogIn(isAuthenticated);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete("/api/logout");
      if (response.status === 200) {
        setLogIn(false);
        navigate("/login"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Navbar_view
      loading={loading}
      isLoggedIn={isLoggedIn}
      handleLogout={handleLogout}
      navigate={navigate}
    />
  );
}
