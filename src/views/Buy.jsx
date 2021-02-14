import React, { Component } from "react";

import { getDmodCrowdsale, getAggregatorV3 } from "../contracts";

import Network from "../network";
import Header from "./Header";

import Spinner from "./Spinner";
import Footer from "./Footer";
import "../stylesheets/Buy.css";

export default class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAmount: 0,
      dmodAmount: 0,
      ethPrice: 0,
      dmodCost: "500000000000000000",
      web3: null,
      loading: false,
    };

    console.log(props);

    this.calculateDMODforETH = this.calculateDMODforETH.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.buyTokens = this.buyTokens.bind(this);
    this.goToVesting = this.goToVesting.bind(this);
  }

  async componentDidMount() {
    const addr = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
    const priceFeed = await getAggregatorV3(addr);
    const roundData = await priceFeed.latestRoundData();
    const web3 = await Network.web3();
    console.log(roundData[1].toString());
    console.log(roundData[1]);
    console.log("181846138858", new web3.utils.toBN("181846138858"));
    const ethPrice = roundData[1].mul(
      new web3.utils.toBN(10).pow(new web3.utils.toBN(10))
    );
    console.log(ethPrice.toString());
    this.setState({ loading: false });

    this.setState({ ethPrice, web3 });
  }

  calculateDMODforETH(ethAmount) {
    const nETH = this.state.ethPrice.mul(ethAmount);
    return nETH.div(new this.state.web3.utils.toBN(this.state.dmodCost));
  }

  async updateAmount(e) {
    const inputValue = e.target.value;

    try {
      new this.state.web3.utils.toBN(
        this.state.web3.utils.toWei(e.target.value)
      );
    } catch (error) {
      return;
    }

    if (this.state.web3 && e.target.value !== "") {
      const dmodAmount = this.calculateDMODforETH(
        new this.state.web3.utils.toBN(
          this.state.web3.utils.toWei(e.target.value)
        )
      );

      this.setState({
        dmodAmount: dmodAmount,
        ethAmount: inputValue,
      });
    }
  }

  async buyTokens(e) {
    if (this.state.ethAmount) {
      try {
        await Network.connectToWallet();
        const dmodCrowdsaleInstance = await getDmodCrowdsale(
          "0x0A0C6D96EffD4F0c6b921FB3cD46a0d64b052988"
        );
        const accounts = await Network.getAccounts();
        this.setState({ loading: true, accounts });
        console.log(this.state.accounts);
        console.log(dmodCrowdsaleInstance);
        const tx = await dmodCrowdsaleInstance.buyTokens(
          this.state.accounts[0],
          {
            value: this.state.web3.utils.toWei(this.state.ethAmount),
            from: this.state.accounts[0],
          }
        );

        const log = tx.logs.find((l) => l.event === "VestingCreated");
        const vestingContractAddress = log.args.vestingContract;

        this.setState({
          vestingContractAddress,
          loading: false,
        });
      } catch (error) {
        console.log(error);
        alert("Error! Please try again");
        this.setState({ loading: false });
      }
    }
  }

  async goToVesting() {
    this.props.history.push(
      `/${this.state.vestingContractAddress}/0x8025B11AF54309ce4571d1E0a02f9d4a5389592A`
    );
  }

  render() {
    return (
      <div className="BuyComponent">
        {this.state.loading ? <Spinner /> : null}

        <Header
          address={"0x0A0C6D96EffD4F0c6b921FB3cD46a0d64b052988"}
          token={"0x8025B11AF54309ce4571d1E0a02f9d4a5389592A"}
          tokenName={"DemodyFi Token"}
          contractName={"Crowdsale"}
        />
        <div className="card-container">
          <div>
            <img src={require("../assets/logosharp.png").default} alt="domodyfi logo" className="logo-image"/>
          </div>
          <h2>DemodyFi Seed Round Sale</h2>
          <h4>Buy $DMOD token with ETH</h4>
          <input
            placeholder="Enter ETH amount"
            type="text"
            onChange={this.updateAmount}
            className="inputBuy"
          />
          {this.state.web3 ? (
            <span>
              DMOD Tokens You Will Get (Approx) -{" "}
              {this.state.web3.utils.fromWei(this.state.dmodAmount.toString())}
            </span>
          ) : null}
          <button className="buttonBuy" onClick={this.buyTokens}>
            Buy Now
          </button>
          {this.state.vestingContractAddress ? (
            <span className="vesting-done">
              Click on the link for you vesting information. Please save it for
              future reference.{" "}
              <a
                href={
                  "/" +
                  this.state.vestingContractAddress +
                  "/0x8025B11AF54309ce4571d1E0a02f9d4a5389592A"
                }
                onClick={this.goToVesting}
              >
                Your Vesting Link
              </a>
            </span>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}
