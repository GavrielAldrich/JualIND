import React, { useState, useEffect } from "react";
import api from "../axiosAPI";

export default function Header_view() {
  const [isLoggedIn, setLogIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/getSession");
        const isAuthenticated = response.data.authenticated;
        setLogIn(isAuthenticated);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
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
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="header container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex text-decoration-none">
            <h3 className="logo jual montserrat" style={{ margin: "0px" }}>
              JUAL<span>iND</span>
            </h3>
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-2 link-light">
              Home
            </a>
          </li>
          <li>
            <a href="" className="nav-link px-2 link-light">
              New Games
            </a>
          </li>
          <li>
            <a href="" className="nav-link px-2 link-light">
              About Us
            </a>
          </li>
        </ul>

        {loading ? ( // Show loading indicator while checking login status
          <div className="col-md-3 text-end">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : isLoggedIn ? (
          <div className="col-md-3 text-end">
            <form onSubmit={handleLogout}>
              <button type="submit" className="btn btn-danger me-2">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="col-md-3 text-end">
            <a href="http://localhost:3000/login">
              <button type="button" className="btn btn-outline-danger me-2">
                Login
              </button>
            </a>
            <a href="http://localhost:3000/register">
              <button type="button" className="btn btn-danger">
                Register
              </button>
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
