import React, { Component } from "react";
import { getAllTickets } from "../services/ticketService";
import { getCurrentUser } from "../services/authService";

class UserTickets extends Component {
  state = {
    loading: true,
    tickets: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    let user = getCurrentUser();
    state.tickets = await getAllTickets(user);
    state.loading = false;
    this.setState(state);
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : this.state.tickets.length > 0 ? (
          <div>
            <div
              style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "20px",
              }}
            >
              <h1>Owned Tickets</h1>
              <p>Winning numbers will be assigned on the day of the event.</p>
            </div>
            <ul
              className="list"
              style={{
                width: "50%",
                margin: "auto",
                border: "1px solid black",
                background: "white",
              }}
            >
              {this.state.tickets.map((ticket) => (
                <li
                  style={{
                    width: "100%",
                    margin: "50px auto",
                    listStyleType: "none",
                  }}
                >
                  <p>
                    <b>Ticket ID:</b> {ticket._id}
                  </p>
                  <p>
                    <b>Charity:</b> {ticket.charity} <b>| Seller:</b>{" "}
                    {ticket.seller}
                  </p>
                  <p>
                    <b>Winning Numbers:</b>{" "}
                    {ticket.pair.firstNumber > 0
                      ? `${ticket.pair.firstNumber} ${ticket.pair.secondNumber}`
                      : "Not yet assigned."}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1> You haven't purchased any tickets.</h1>
        )}
        )
      </div>
    );
  }
}

export default UserTickets;
