import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import {
  getTokenVesting,
  getSimpleToken,
  getPublicTokenVesting1,
  getPublicTokenVesting2,
} from "../contracts";

import Header from "./Header";
import VestingDetails from "./VestingDetails";
import VestingSchedule from "./VestingSchedule";
import Spinner from "./Spinner";

import "../stylesheets/TokenVestingApp.css";
import Network from "../network";
import Footer from "./Footer";
import TxModal from "./TxModal";
import PublicDetails from "./PublicDetails";
import PublicSchedule from "./PublicSchedule";
import { userData } from "../data";

class PublicTokenVestingApp extends Component {
  constructor() {
    super();
    this.state = { name: "Token", loading: true, txhash: "", txStatus: "" };

    this.setTxData = this.setTxData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  setTxData(hash, status) {
    this.setState({
      txhash: hash,
      txStatus: status,
    });
  }

  render() {
    const { address, token } = this.props;
    return (
      <div className="TokenVestingApp">
        {this.state.loading ? <Spinner /> : null}
        {this.state.txhash !== "" ? (
          <TxModal txhash={this.state.txhash} status={this.state.txStatus} />
        ) : null}
        <Header
          address={address}
          token={token}
          tokenName={this.state.name}
          contractName={"Vesting"}
        />
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <PublicDetails
                address={address}
                token={token}
                details={this.state}
                getData={() => this.getData()}
                setLoader={(x) => this.setLoader(x)}
                setTxData={this.setTxData}
              />
            </Col>

            <Col xs={12} md={6}>
              <PublicSchedule details={this.state} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }

  setLoader(loading) {
    this.setState({ loading });
  }

  async getData() {
    const { address, token } = this.props;

    const tokenVesting1 = await getPublicTokenVesting1(address);
    const tokenContract = await getSimpleToken(token);

    var vested = await tokenVesting1.whiteListedAddresses(address);

    const start = 1623293702;
    const cliff = 1625885702;
    const end = 1628564102;

    const data = userData.find((d) => d.address == address);

    const total = data.amount;

    this.setState({
      start,
      end,
      cliff,
      total,
      vested,
      beneficiary: address,
      decimals: await tokenContract.decimals(),
      name: await tokenContract.name(),
      symbol: await tokenContract.symbol(),
      loading: false,
    });
  }
}

export default PublicTokenVestingApp;
