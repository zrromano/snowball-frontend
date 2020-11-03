import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { checkout } from "../services/checkoutService";
import { createTicket } from "../services/ticketService";
import { getCurrentUser } from "../services/authService";
import "./checkoutForm.css";

const queryString = require("query-string");
class Checkout extends Form {
  state = {
    quantity: 0,
    price: 0.0,
    organization: "",
    member: "",
    data: {
      cardNumber: "",
      expirationDate: "",
      cardCode: "",
    },
    errors: {},
  };

  schema = {
    cardNumber: Joi.string().min(13).max(16).required(),
    expirationDate: Joi.string().min(4).max(4).required(),
    cardCode: Joi.string().min(3).max(4).required(),
  };

  componentDidMount() {
    let state = { ...this.state };
    let query = this.props.location.search;
    if (!query) {
      toast.error("Invalid URL, no checkout information");
      return;
    }
    let parsed = queryString.parse(query);
    state.quantity = parsed.quantity ? parsed.quantity : 0;
    state.organization = parsed.organization
      ? parsed.organization
      : "Not Specified";
    state.member = parsed.member ? parsed.member : "Not Specified";

    let quantity = state.quantity;
    while (quantity > 0) {
      if (quantity >= 30) {
        state.price += 100;
        quantity -= 30;
      } else if (quantity >= 5) {
        state.price += 20;
        quantity -= 5;
      } else {
        state.price += 5;
        quantity -= 1;
      }
    }
    this.setState(state);
  }

  doSubmit = async () => {
    let state = { ...this.state };
    let { quantity, price, organization, member, data } = state;
    let { cardNumber, expirationDate, cardCode } = data;
    let user = await getCurrentUser();

    console.log(quantity);

    try {
      await checkout(
        quantity,
        price,
        organization,
        member,
        user,
        cardNumber,
        expirationDate,
        cardCode
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(
          `Transaction Failed: 
            ${ex.response.data.transactionResponse.errors.error[0].errorText}`,
          { autoClose: 15000 }
        );
      }
      return;
    }
    try {
      await createTicket(user, organization, member, quantity);
    } catch (ex) {
      toast.error(
        `! DO NOT CLOSE THESE MESSAGES
          Your transaction was processed, but there was an error creating your ticket(s). Please take a screenshot of these messages and send us an e-mail at rotarysnowball@gmail.com!`,
        { autoClose: false }
      );
      toast.error(`INFORMATION:`, { autoClose: false });
      toast.error(`Name: ${user.name}`, { autoClose: false });
      toast.error(`Phone: ${user.phone}`, { autoClose: false });
      toast.error(`Quantity: ${quantity}`, { autoClose: false });
      toast.error(`Organization: ${organization}`, { autoClose: false });
      toast.error(`Seller: ${member}`, { autoClose: false });
      return;
    }
    toast.success(
      "Your purchase was successful! If you'd like to view your tickets, click your name in the upper right corner of the page to go to account settings.",
      { autoClose: 15000 }
    );
    this.props.history.push("/");
  };

  render() {
    return (
      <MDBContainer className="container">
        <h1>Checkout</h1>
        <div className="body">
          <MDBRow>
            <MDBCol md="6">
              <form className="customerInfo" onSubmit={this.handleSubmit}>
                <p className="formTitle">
                  Please enter your payment information:
                </p>
                <p className="disclaimer">
                  We don't save ANY of your payment information.
                </p>
                {this.renderInput(
                  "cardNumber",
                  "Card Number",
                  null,
                  "The 13 to 16 digit number on your credit/debit. Please do not add spaces or other characters.",
                  8
                )}
                {this.renderInput(
                  "expirationDate",
                  "Expiration Date",
                  "text",
                  "MMYY",
                  8
                )}
                {this.renderInput(
                  "cardCode",
                  "Security Code",
                  "text",
                  "3-4 digit number, usually on the back of the card",
                  8
                )}
                <button
                  disabled={this.validate()}
                  className="checkout"
                  type="submit"
                >
                  Checkout
                </button>
              </form>
            </MDBCol>
            <MDBCol md="6" className="transactionInfo">
              <p className="quantity">Quantity: {this.state.quantity}</p>
              <p className="price">Price: ${this.state.price.toFixed(2)}</p>
              <p>Organization: {this.state.organization}</p>
              <p>Seller: {this.state.member}</p>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    );
  }
}

export default Checkout;
