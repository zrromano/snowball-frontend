import React, { Component } from "react";

import ContentEditable from "react-contenteditable";
import { MDBCol, MDBContainer } from "mdbreact";

import { getCurrentUser } from "../services/authService";
import { getFAQs, updateFAQs } from "../services/editableService";

class FAQ extends Component {
  state = {
    style: {
      textAlign: "left",
      border: "none",
      padding: "5px",
      margin: "auto",
    },
    loading: true,
    editing: false,
    FAQs: [],
    user: null,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    state.FAQs = await getFAQs();
    state.user = await getCurrentUser();
    state.loading = false;
    if (
      state.FAQs.length < 1 &&
      state.user &&
      state.user.authLevel !== "user"
    ) {
      state.editing = true;
    }
    this.setState(state);
  };

  handleChange = (evt) => {
    let { id } = evt.currentTarget;
    // If target is not a question, it must be an answer.
    let question = id.startsWith("question");
    let index = question ? id.substr(8) : id.substr(6);

    let state = { ...this.state };
    if (question) {
      state.FAQs[index].question = evt.target.value;
    } else {
      state.FAQs[index].answer = evt.target.value;
    }
    this.setState(state);
  };

  addFAQ = () => {
    let state = { ...this.state };
    state.FAQs.push({ question: "question", answer: "answer" });
    this.setState(state);
  };

  removeFAQ = (index) => {
    let state = { ...this.state };
    state.FAQs.splice(index, 1);
    this.setState(state);
  };

  handleFocus = () => {
    let state = { ...this.state };
    state.style = {
      textAlign: "left",
      border: "1px solid red",
      padding: "5px",
      margin: "auto",
    };
    state.editing = true;
    this.setState(state);
  };

  submitChanges = () => {
    updateFAQs(this.state.user, this.state.FAQs);
  };
  render() {
    return (
      <MDBContainer className="Home" style={{ paddingTop: "50px" }}>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : (
          <MDBCol>
            <h1 style={{ marginBottom: "30px" }}>Frequently Asked Questions</h1>
            {this.state.user &&
              (this.state.user.authLevel === "admin" ||
                this.state.user.authLevel === "master") && (
                <p style={{ color: "red" }}>
                  Hello Admin. Click text below to edit.
                </p>
              )}
            <MDBCol md="6" style={this.state.style}>
              {this.state.FAQs.map((FAQ, index) => (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "15px",
                    //backgroundColor: "#d9e4ee",#f7a81b
                    border: "solid 3px #0050a2",
                  }}
                  key={index}
                >
                  <ContentEditable
                    id={`question${index}`}
                    html={FAQ.question}
                    disabled={
                      !this.state.user || this.state.user.authLevel === "user"
                    }
                    style={{ fontWeight: "bold", fontSize: "1.75rem" }}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    className="ContentEditable"
                  />
                  <ContentEditable
                    id={`answer${index}`}
                    html={FAQ.answer}
                    disabled={
                      !this.state.user || this.state.user.authLevel === "user"
                    }
                    style={{ fontSize: "1.2rem" }}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    className="ContentEditable"
                  />
                  {this.state.editing && (
                    <button onClick={() => this.removeFAQ(index)}>
                      Delete
                    </button>
                  )}
                </div>
              ))}
              {this.state.editing && (
                <div>
                  <button onClick={this.addFAQ}>Add question</button>
                  <button
                    onClick={this.submitChanges}
                    style={{ margin: "5px" }}
                  >
                    Submit Changes
                  </button>
                </div>
              )}
            </MDBCol>
          </MDBCol>
        )}{" "}
      </MDBContainer>
    );
  }
}

export default FAQ;
