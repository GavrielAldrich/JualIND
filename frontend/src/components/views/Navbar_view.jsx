import React from "react";

export default function Navbar_view({
  loading,
  isLoggedIn,
  handleLogout,
  navigate,
}) {
  return (
    <div className="header container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex text-decoration-none">
            <h3 className="logo jual montserrat" style={{ margin: "0px" }}>
              JUAL<span>iND</span>
            </h3>
          </a>
        </div>

        <nav className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <button
            onClick={() => navigate("/")}
            className="nav-link px-2 link-light btn btn-link"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/new-games")}
            className="nav-link px-2 link-light btn btn-link"
          >
            New Games
          </button>
          <button
            onClick={() => navigate("/about-us")}
            className="nav-link px-2 link-light btn btn-link"
          >
            About Us
          </button>
        </nav>

        {loading ? (
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
            <button onClick={() => navigate("/login")} className="btn btn-outline-danger me-2">Login</button>

            <button onClick={() => navigate("/register")} className="btn btn-danger">Register</button>
          </div>
        )}
      </header>
    </div>
  );
}
