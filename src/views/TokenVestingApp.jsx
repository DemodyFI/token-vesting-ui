import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { getTokenVesting, getSimpleToken } from "../contracts";

import Header from "./Header";
import VestingDetails from "./VestingDetails";
import VestingSchedule from "./VestingSchedule";
import Spinner from "./Spinner";

import "../stylesheets/TokenVestingApp.css";
import Network from "../network";

class TokenVestingApp extends Component {
  constructor() {
    super();
    this.state = { name: "Token", loading: true };
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { address, token } = this.props;
    return (
      <div className="TokenVestingApp">
        {this.state.loading ? <Spinner /> : null}

        <Header
          address={address}
          token={token}
          tokenName={this.state.name}
          contractName={"Vesting"}
        />
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <VestingDetails
                address={address}
                token={token}
                details={this.state}
                getData={() => this.getData()}
                setLoader={(x) => this.setLoader(x)}
              />
            </Col>

            <Col xs={12} md={6}>
              <VestingSchedule details={this.state} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  setLoader(loading) {
    this.setState({ loading });
  }

  async vestedAmount(total, now, start, cliffDuration, duration) {
    const web3 = await Network.web3();

    total = web3.utils.toBN(total);
    now = web3.utils.toBN(now);
    start = web3.utils.toBN(start);
    cliffDuration = web3.utils.toBN(cliffDuration);
    duration = web3.utils.toBN(duration);

    return now.lt(start.add(cliffDuration))
      ? 0
      : total.mul(now.sub(start)).div(duration).toString();
  }

  async getData() {
    const { address, token } = this.props;

    const tokenVesting = await getTokenVesting(address);
    const tokenContract = await getSimpleToken(token);

    const start = await tokenVesting.start();
    console.log(start);
    const duration = await tokenVesting.duration();
    const end = start.add(duration);

    const balance = await tokenContract.balanceOf(address);
    const released = await tokenVesting.released(token);
    const total = balance.add(released);
    const cliff = await tokenVesting.cliff();
    const nowDate = new Date();
    const now = Math.floor(
      new Date(nowDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })) /
        1000
    );

    const vested = await this.vestedAmount(total, now, start, 0, duration);
    console.log("vested", vested);

    this.setState({
      start,
      end,
      cliff,
      total,
      released,
      vested,
      // vested: await tokenVesting.vestedAmount(token),
      decimals: await tokenContract.decimals(),
      beneficiary: await tokenVesting.beneficiary(),
      owner: await tokenVesting.owner(),
      revocable: await tokenVesting.revocable(),
      revoked: await tokenVesting.revoked(token),
      name: await tokenContract.name(),
      symbol: await tokenContract.symbol(),
      loading: false,
    });
  }
}

export default TokenVestingApp;
