import React, { Component } from "react";

import ContentEditable from "react-contenteditable";
import { MDBCol, MDBContainer } from "mdbreact";

import { getContact, updateContact } from "../services/editableService";
import { getCurrentUser } from "../services/authService";

class About extends Component {
  state = {
    style: { textAlign: "left", border: "none", padding: "5px" },
    loading: true,
    editing: false,
    text: "",
    user: null,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    state.text = await getContact();
    state.user = await getCurrentUser();
    state.loading = false;
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
    updateContact(this.state.user, this.state.text);
  };

  render() {
    return (
      <MDBContainer className="Home" style={{ paddingTop: "50px" }}>
        <h1>Contact Information</h1>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : (
          <MDBCol>
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
                style={{ border: "none", marginTop: "15px", fontSize: "large" }}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                className="ContentEditable"
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
        )}{" "}
      </MDBContainer>
    );
  }
}

export default About;
