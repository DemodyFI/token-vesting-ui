import React, { Component } from "react";

import { getDmodCrowdsale, getAggregatorV3 } from "../contracts";

import Network from "../network";
import Header from "./Header";
import { Table } from "react-bootstrap";

import Spinner from "./Spinner";
import Footer from "./Footer";
import "../stylesheets/Buy.css";

export default class InvestorsVesting extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log(props);

    this.updateVestingAddress = this.updateVestingAddress.bind(this);
    this.goToVesting = this.goToVesting.bind(this);
  }

  async componentDidMount() {}

  async updateVestingAddress(e) {
    const inputValue = e.target.value;
    console.log(
      "%cMyProject%cline:28%cinputValue",
      "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
      "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
      "color:#fff;background:rgb(254, 67, 101);padding:3px;border-radius:2px",
      inputValue
    );

    this.setState({
      vestingContractAddress: inputValue,
    });
  }

  async goToVesting() {
    this.props.history.push(
      `/investors/${this.state.vestingContractAddress}/0xD1D807FAAfb3DcAAb5380E01e9A2cbafcf7B6f7F`
    );
  }

  render() {
    return (
      <div className="BuyComponent">
        {this.state.loading ? <Spinner /> : null}

        <Header
          address={"0xD1D807FAAfb3DcAAb5380E01e9A2cbafcf7B6f7F"}
          token={"0xD1D807FAAfb3DcAAb5380E01e9A2cbafcf7B6f7F"}
          tokenName={"Demodyfi Token"}
          contractName={"DMOD"}
        />
        <div className="card-container">
          <div>
            <img
              src={require("../assets/logosharp.png").default}
              alt="domodyfi logo"
              className="logo-image"
            />
          </div>
          <h2>Seed/Private Vesting Info</h2>
          <h6>
            Please enter the vesting address provided by us. It will give you
            all the information related to the schedule and token amounts
          </h6>
          <input
            placeholder="Enter Vesting Address"
            type="text"
            onChange={this.updateVestingAddress}
            className="inputBuy"
          />

          <button className="buttonLink" onClick={this.goToVesting}>
            Get Vesting Info
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}
