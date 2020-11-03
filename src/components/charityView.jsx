import React, { Component } from "react";
import { getCharity } from "../services/charityService";

import "./charityView.css"

class CharityView extends Component {
  state = {
    loading: true,
    charity: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let state = { ...this.state };
    state.charity = await getCharity(this.props.match.params.id);
    state.loading = false;
    this.setState(state);
  };

  render() {
    let { charity } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <h1 style={{ margin: "10%" }}>loading...</h1>
        ) : (
          <div className="charity">
            <h1 className="name">{charity.name}</h1>
            <img className="banner" alt={`${charity.name} banner`} src={charity.banner} />
            <a className="website" href={charity.website}>Organization Website</a>
            <p className="description">Description</p>
            <p className="body">{charity.body}</p>
            <a className="checkout" href={charity.checkout}>Buy a ticket to support this organization</a>

          </div>
        )}
      </div>
    );
  }
}

export default CharityView;
