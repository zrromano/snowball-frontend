import React, { Component } from "react";

import Slideshow from "./slideshow";
import PrizeSponsors from "./prizeSponsors";

import ContentEditable from "react-contenteditable";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

import { getAllSlideshowImages } from "../services/slideshowService";
import { getAllSponsors } from "../services/sponsorService";
import { getHomePage, updateHomePage } from "../services/editableService";
import { getCurrentUser } from "../services/authService";

import "./home.css";
class Home extends Component {
  state = {
    style: { textAlign: "left", border: "none", padding: "5px" },
    editing: false,
    loading: true,
    text: "",
    slides: [{ image: "", description: "" }],
    sponsors: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    let state = { ...this.state };
    state.loading = false;
    state.text = await getHomePage();
    state.slides = await getAllSlideshowImages();
    state.sponsors = await getAllSponsors();
    state.user = await getCurrentUser();
    if (state.slides.length === 0) {
      state.slides = [{ image: "", description: "" }];
    }
    this.setState(state);
  };

  handleChange = (evt) => {
    let state = { ...this.state };
    state.text = evt.target.value;
    this.setState(state);
  };

  handleFocus = () => {
    let state = { ...this.state };
    state.style = {
      textAlign: "left",
      border: "1px solid red",
      padding: "5px",
    };
    state.editing = true;
    this.setState(state);
  };

  submitChanges = () => {
    updateHomePage(this.state.user, this.state.text);
  };

  getPrizeSponsors = () => {
    return this.state.sponsors.filter(
      (sponsor) => sponsor.priority === "prize"
    );
  };
  render = () => {
    return (
      <MDBContainer className="Home" style={{ paddingTop: "50px" }}>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : (
          <div>
            <div style={{ marginTop: "-10px", marginBottom: "40px" }}>
              <h1>Rotary Snowball Sweepstakes Annual Fundraising Event</h1>
            </div>
            <MDBRow className="slideshow">
              <Slideshow className="slideshow" slides={this.state.slides} />
            </MDBRow>
            <MDBRow className="belowSlideshow">
              <MDBCol md="6">
                {this.state.user &&
                  (this.state.user.authLevel === "admin" ||
                    this.state.user.authLevel === "master") && (
                    <p style={{ color: "red" }}>
                      Hello Admin. Click text below to edit.
                    </p>
                  )}
                <div style={this.state.style}>
                  <ContentEditable
                    html={this.state.text}
                    disabled={
                      !this.state.user || this.state.user.authLevel === "user"
                    }
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    className="ContentEditable"
                    style={{ fontSize: "large" }}
                  />
                  {this.state.editing && (
                    <button
                      onClick={this.submitChanges()}
                      style={{ margin: "5px" }}
                    >
                      Submit changes
                    </button>
                  )}
                </div>
              </MDBCol>
              <MDBCol className="PrizeSponsors">
                <div>
                  <h2>Prize Sponsors</h2>
                </div>
                <PrizeSponsors sponsors={this.getPrizeSponsors()} />
              </MDBCol>
            </MDBRow>
          </div>
        )}
      </MDBContainer>
    );
  };
}

export default Home;
