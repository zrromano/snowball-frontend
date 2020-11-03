import React, { Component } from "react";
import { toast } from "react-toastify";
import { Title } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Input from "../../components/input";

import {
  toggleCheckout,
  isCheckoutAvailable,
} from "../../services/checkoutService";
import {
  assignCombinations,
  getWinningTicket,
  clearTickets,
} from "../../services/ticketService";
import { getCurrentUser } from "../../services/authService";

import "./dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      checkout: false,
      confirm: false,
      firstNumber: "",
      secondNumber: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount() {
    isCheckoutAvailable().then((checkout) => {
      this.setState({ checkout });
    });
  }

  handleChange(e) {
    e.preventDefault();

    if (!this.state.count) {
      toggleCheckout(getCurrentUser()).then(() => {
        isCheckoutAvailable().then((checkout) => {
          this.setState({ checkout });
        });
      });
    } else {
      toast.error(
        "If more tickets are purchased, you'll need to re-assign winning combinations.",
        { autoClose: 10000 }
      );
      setTimeout(() => {
        toast.error(
          "If you're sure you want to turn checkout back on, please reload the page first.",
          { autoClose: 10000 }
        );
      }, 1500);
    }
  }

  handleType(e) {
    let state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleAlgorithm = () => {
    if (!this.state.checkout) {
      assignCombinations().then((response) => {
        let state = { ...this.state };
        state.count = response.data.count;
        state.unused = response.data.unused;
        state.maxnum = response.data.maxnum;
        this.setState(state);
      });
    }
  };

  handleConfirm() {
    let state = { ...this.state };
    state.confirm = !state.confirm;
    this.setState(state);
  }

  handleClear = () => {
    if (this.state.confirm) {
      clearTickets();
    } else {
      toast.error(
        "Please confirm that you want to delete all tickets by clicking the slider below."
      );
    }
  };

  findWinningTicket = () => {
    let { firstNumber, secondNumber } = this.state;
    getWinningTicket([firstNumber, secondNumber]).then((response) => {
      let state = { ...this.state };
      if (response.data[0]) {
        let winner = response.data[0];
        state.winnerName = winner.holderName;
        state.winnerNumber = winner.holderNumber;
        state.winnerEmail = winner.holderEmail;
        state.winnerCharity = winner.charity;
        state.winnerSeller = winner.seller;
        this.setState(state);
      } else {
        toast.error("Couldn't find a ticket with that combination.");
      }
    });
  };

  render() {
    return (
      <Card>
        <Title title="Welcome to the Administration Dashboard" />
        <CardContent>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={this.state.checkout}
                onChange={this.handleChange}
              />
              <span className="slider round" />
            </label>{" "}
            <span>
              <b>Toggle Checkout Availability</b>
            </span>
          </div>
          <div>
            {this.state.checkout && (
              <p style={{ color: "red" }}>
                You must turn off checkout before assigning winning
                combinations.
              </p>
            )}
            <button
              className="button"
              disabled={this.state.checkout || this.state.count}
              onClick={() => {
                this.handleAlgorithm();
              }}
            >
              Assign winning combinations
            </button>
            {this.state.count && (
              <div>
                <p style={{ color: "red" }}>
                  This information will be lost if you leave this tab, record it
                  or open a second tab. The winning combinations have been
                  assigned and are viewable in the tickets tab.
                </p>

                <p>Total tickets: {this.state.count}</p>
                <p>Max number needed: {this.state.maxnum}</p>
                <p>
                  Unused combinations:{" "}
                  {this.state.unused &&
                    this.state.unused.map((array) => (
                      <span key={array}>
                        [{array[0]} , {array[1]}]&nbsp;
                      </span>
                    ))}
                </p>
              </div>
            )}
            {this.state.count && (
              <div style={{ width: "50%" }}>
                <p>Look up winning combination:</p>
                <Input
                  name={"firstNumber"}
                  label={"First Number"}
                  value={this.state.firstNumber}
                  onChange={this.handleType}
                  type={"text"}
                  colSize={4}
                  error={null}
                  smalltext={null}
                />
                <Input
                  name={"secondNumber"}
                  label={"Second Number"}
                  value={this.state.secondNumber}
                  onChange={this.handleType}
                  type={"text"}
                  colSize={4}
                  error={null}
                  smalltext={null}
                />
                <button
                  className="button"
                  onClick={() => {
                    this.findWinningTicket();
                  }}
                >
                  Find Ticket
                </button>
              </div>
            )}
            {this.state.winnerName && (
              <div>
                <p>Winner's Name: {this.state.winnerName}</p>
                <p>Winner's Phone Number: {this.state.winnerNumber}</p>
                <p>Winnder's Email Address: {this.state.winnerEmail}</p>
                <p>Winning Ticket Bought For: {this.state.winnerCharity}</p>
                <p>Winning Ticket Sold by: {this.state.winnerSeller}</p>
                <p>
                  <b>
                    If the sweepstakes has been completed, please delete all
                    tickets to prepare the database for next year.
                  </b>
                </p>
                <button
                  className="button"
                  onClick={() => {
                    this.handleClear();
                  }}
                >
                  Delete all tickets
                </button>
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={this.state.confirm}
                      onChange={(e) => this.handleConfirm()}
                    />
                    <span className="slider round" />
                  </label>{" "}
                  <span>
                    <b>
                      I understand that clicking the button above will delete
                      ALL tickets in the database.
                    </b>
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Dashboard;
