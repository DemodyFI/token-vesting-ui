import React, { Component } from "react";

import { getDmodCrowdsale, getAggregatorV3 } from "../contracts";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";

import Network from "../network";
import Header from "./Header";

import Spinner from "./Spinner";
import Footer from "./Footer";
import "../stylesheets/Buy.css";
import { Button, Card } from "react-bootstrap";

export default class Vesting extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.goToInvestors = this.goToInvestors.bind(this);
    this.goToPublic = this.goToPublic.bind(this);
  }

  async goToInvestors() {
    this.props.history.push("/investors");
  }

  async goToPublic() {
    this.props.history.push("/public");
  }

  render() {
    // const Item = Accordion.Item;
    // const Item1 = Accordion.Header;
    // const Item2 = Accordion.Body;
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
          <h2>Demodyfi Vesting Info</h2>
          <h6>In what round did you invest in demodyfi ?</h6>
          <div style={{ display: "flex", marginTop: "25px" }}>
            <button className="buttonLink" onClick={this.goToInvestors}>
              Seed/Private
            </button>
            <button className="buttonLink" onClick={this.goToPublic}>
              Public
            </button>
          </div>
        </div>
        <div className="vesting-info-table">
          <h4>Investment Rounds Schedules</h4>
          <br />
          <Table striped bordered condensed>
            <tbody>
              <tr>
                <th>Investment Round</th>
                <th>Vesting Schedule</th>
              </tr>
              <tr>
                <td>Seed</td>
                <td>5% at TGE, rest vests over 12 months</td>
              </tr>
              <tr>
                <td>Private</td>
                <td>10% at TGE, rest vests over 12 months</td>
              </tr>
              <tr>
                <td>Public</td>
                <td>33% at TGE, rest vests over 33% monthly</td>
              </tr>
            </tbody>
          </Table>
          <br />
          <br />
        </div>
        <div className="vesting-info-table">
          <h4>FAQs</h4>
          <Accordion style={{ textAlign: "left" }}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <h6>1. What is the Demodyfi ?</h6>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <h6>2. How to get DMOD token ?</h6>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

function TableRow({ title, children }) {
  return (
    <tr>
      <th>{title}</th>
      <td>{children}</td>
    </tr>
  );
}
