import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllCharities } from "../services/charityService";

class CharityList extends Component {
  state = {
    loading: true,
    charities: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    state.charities = await getAllCharities();
    state.loading = false;
    this.setState(state);
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : (
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "20px",
              }}
            >
              Participating Organizations
            </h1>
            <ul className="list" style={{width: "75%", margin: "auto"}}>
              {this.state.charities.map((charity) => (
                <li
                  className="list-item"
                  style={{
                    listStyleType: "none",
                    borderBottom: "solid 3px white",
                    width: "97%",
                    alignContent: "center",
                  }}
                >
                  <Link to={`/charities/${charity._id}`}>
                    <h2
                      key={charity._id}
                      style={{
                        display: "inline-block",
                        padding: "40px 50px 50px 20px",
                      }}
                    >
                      {" "}
                      {charity.name}{" "}
                    </h2>
                    <img
                      src={charity.banner}
                      alt={charity.name}
                      key={charity.name}
                      style={{ height: "100px" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CharityList;
