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
import Middle from "../images/Middlebg.png";
import logo from '../images/Logo.png';
import vector from '../images/Vector.png';
import content from '../images/Content.png';


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
      <div>
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
              src={logo}
              alt="domodyfi logo"
              className="logo-image"
            />
          </div>
          <h2 className="heading">Demodyfi Vesting Info</h2>
          <h6 className="sub-heading">In what round did you invest in demodyfi ?</h6>
          <div style={{ display: "flex", marginTop: "25px", paddingBottom: "2rem" }}>
            <button className="PrivateButton" onClick={this.goToInvestors}>
              Seed/Private
            </button>
            <button className="PublicButton" onClick={this.goToPublic}>
              Public
            </button>
          </div>
        </div>
        <div>
          <div className="vesting-info-table">
              <h4 style={{fontSize: 25}} className="heading">Investment Rounds Schedules</h4>
            <br />
            <Table striped bordered condensed>
              <tbody>
                <tr>
                  <th className="table-heading">Investment Round</th>
                  <th className="table-heading">Vesting Schedule</th>
                </tr>
                <tr>
                  <td className="heading-data">Seed</td>
                  <td className="heading-info">5% at TGE, rest vests over 12 months</td>
                </tr>
                <tr>
                  <td className="heading-data">Private</td>
                  <td className="heading-info">10% at TGE, rest vests over 12 months</td>
                </tr>
                <tr>
                  <td className="heading-data">Public</td>
                  <td className="heading-info">33% at TGE, rest vests over 33% monthly</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <br />
          </div>
           </div>
          <div className="Faq">
            <div style={{display: 'flex'}}>
              <img className="vector-img" src={vector} alt="vector" />
               <img style={{marginLeft: '16rem'}} className="vector-img" src={content} alt="vector" />
            {/* <h4 style={{fontSize: 25}} className="heading">FAQs</h4>
            <Accordion style={{ textAlign: "left", backgroundColor: 'transparent' }}>
              <Card className="accordian-card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h6>1. What is the Demodyfi ?</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="accordian-card">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <h6>2. How to get DMOD token ?</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
              </Accordion> */}
              </div>
          </div>
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
