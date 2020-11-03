import React from "react";
import Joi from "joi-browser";
import queryString from "query-string";

import Form from "./form";

import { getAllCharities } from "../services/charityService";
import { isCheckoutAvailable } from "../services/checkoutService";

import "./purchaseTicket.css";

class PurchaseTicket extends Form {
  state = {
    loading: true,
    enabled: true,
    nonProfits: [],
    data: { organization: "", member: "", quantity: "" },
    errors: {},
  };

  schema = {
    organization: Joi.string().required(),
    member: Joi.string(),
    quantity: Joi.string().required(),
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    let state = { ...this.state };
    let results = await getAllCharities();
    for (let i = 0; i < results.length; i++) {
      state.nonProfits.push({
        _id: i,
        name: results[i].name,
      });
    }
    state.enabled = await isCheckoutAvailable();
    state.loading = false;

    let query = this.props.location.search;
    let parsed = queryString.parse(query);

    for (let i = 0; i < results.length; i++) {
      if (results[i].name === parsed.organization) {
        state.data.organization = parsed.organization
          ? parsed.organization
          : "";
      }
    }
    state.data.member = parsed.member ? parsed.member : "";

    this.setState(state);
  };

  doSubmit = async () => {
    let state = { ...this.state };
    console.log(JSON.stringify(state, null, 2));
    let { organization, quantity, member } = state.data;
    let url = `/checkout?organization=${organization}&quantity=${quantity}`;
    if (member) {
      url = `${url}&member=${member}`;
    }
    window.location = url;
  };

  render = () => {
    return (
      <div style={{ marginBottom: "40px" }}>
        {this.state.loading ? (
          <h1 style={{ textAlign: "center", margin: "10%" }}>Loading...</h1>
        ) : !this.state.enabled ? (
          <div style={{ textAlign: "center", margin: "10%" }}>
            <h1>Checkout is currently disabled...</h1>
            <p>
              If it's not time for the event, try again later. We might be
              performing maintainence on the site.
            </p>
          </div>
        ) : (
          <form className="transactionInfo" onSubmit={this.handleSubmit}>
            <div className="header">
              <h1>Purchase Tickets</h1>
              <h3 style={{ color: "green" }}>
                80% of proceeds go to the non-profit organization of your
                choice!
              </h3>
              <p>The other 20% is used by the Rotary Club in your community!</p>
              <a href={process.env.PUBLIC_URL + "/rulesAndRegulations.pdf"}>
                Rules and Regulations
              </a>
            </div>
            <div className="form">
              <h4>
                Choose where your money goes
                <span style={{ color: "red" }}> *</span>
              </h4>

              {this.renderSelect(
                "organization",
                "",
                this.state.nonProfits,
                "Select an organization",
                8
              )}

              <h4>Should someone get credit for this sale?</h4>

              {this.renderInput(
                "member",
                "",
                "string",
                "Enter organization member's name",
                8
              )}

              <h4>
                How many tickets do you want?
                <span style={{ color: "red" }}> *</span>
              </h4>
              <h5>1 ticket = $5</h5>
              <h5>5 tickets = $20</h5>
              <h5>30 tickets = $100</h5>

              {this.renderInput(
                "quantity",
                "",
                "number",
                "Enter number of tickets",
                4
              )}
              <p>
                <span style={{ color: "red", textDecoration: "underline" }}>
                  * required
                </span>
              </p>
              {this.renderButton("Head to checkout")}
            </div>
          </form>
        )}
      </div>
    );
  };
}

export default PurchaseTicket;
