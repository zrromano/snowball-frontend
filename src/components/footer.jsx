import React, { Component } from "react";

import { MDBFooter } from "mdbreact";

import { getAllSponsors } from "../services/sponsorService";

const copyrightStyles = {
  color: "#0050a2",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#f7a81b",
};

const logoNav = {
  textAlign: "center",
  backgroundColor: "white",
};

const logoStyle = {
  maxHeight: "150px",
  width: "auto",
  padding: "10px",
};

const specialStyle = {
  maxHeight: "250px",
  width: "auto",
  padding: "10px",
};

class FooterPage extends Component {
  state = {
    loading: true,
    sponsors: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    state.loading = false;
    state.sponsors = await getAllSponsors();
    if (state.sponsors && state.sponsors.length > 0) {
      state.sponsors = state.sponsors.sort((a, b) => {
        if (a.priority === "special") return -1;
        else if (b.priority === "special") return 1;
        else return 0;
      });
    } else {
      state.sponsors = [{ name: "", logo: "", priority: "" }];
    }
    this.setState(state);
  };

  render() {
    return (
      <MDBFooter
        className="page-footer font-small border-top border-dark"
        style={logoNav}
      >
        <h2 style={{ padding: "10px", marginTop: "10px" }}>
          Thank you to all our sponsors!
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "60%",
            margin: "auto",
          }}
        >
          {this.state.loading ? (
            <h1>Loading...</h1>
          ) : (
            this.state.sponsors.map((sponsor) => (
              <img
                alt={`${sponsor.name} logo`}
                key={sponsor.name}
                src={sponsor.logo}
                style={
                  sponsor.priority === "special" ? specialStyle : logoStyle
                }
              />
            ))
          )}
        </div>
        <div
          className="footer-copyright text-center py-3"
          style={copyrightStyles}
        >
          © 2020 Copyright:
          <a href="https://portal.clubrunner.ca/3266">
            {" "}
            Rotary Club of Grand Junction
          </a>
          <br />
          <a href="http://localhost:3000/admin" style={{ fontSize: ".75rem" }}>
            Charity administrator access
          </a>
        </div>
      </MDBFooter>
    );
  }
}

export default FooterPage;
