import React from "react";
import { NavLink } from "react-router-dom";

const styles = {
  color: "#0050a2",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
};

const toggleButton = process.env.PUBLIC_URL + "/images/toggleButton.png";

const NavBar = ({ links, user }) => {
  return (
    <nav className="navbar navbar-fixed-top navbar-expand-sm bg-white border-bottom border-dark">
      <NavLink to="/" className="navbar-brand" style={{ border: "none" }}>
        <img
          src={process.env.PUBLIC_URL + "/images/snowballLogo.png"}
          alt="sweepstakesLogo"
          style={{ height: "70px", width: "70px" }}
        />
      </NavLink>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          class="navbar-toggler-icon"
          style={{
            backgroundImage: "url(" + toggleButton + ")",
            width: "50px",
            height: "80px",
          }}
        ></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <div className="navbar-nav mr-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              className="nav-item nav-link"
              to={link.path}
              style={styles}
            >
              {link.name}
            </NavLink>
          ))}
          {user && (user.authLevel === "admin" || user.authLevel === "master") && (
            <NavLink className="nav-item nav-link" to="/admin" style={styles}>
              Admin
            </NavLink>
          )}
        </div>
        <div className="nav navbar-nav ml-auto w-100 justify-content-end">
          {!user && (
            <NavLink className="nav-item nav-link" to="/login" style={styles}>
              Login
            </NavLink>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                className="nav-item nav-link"
                to="/settings"
                style={styles}
              >
                {user.name}
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/logout"
                style={styles}
              >
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
