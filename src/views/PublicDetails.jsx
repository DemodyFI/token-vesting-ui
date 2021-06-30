import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

import { getPublicTokenVesting1, getTokenVesting } from "../contracts";
import { displayAmount } from "../utils";
import Network from "../network";

import { ContractLink } from "./Links";
import Emoji from "./Emoji";
import TxModal from "./TxModal";

class PublicDetails extends Component {
  constructor() {
    super();
    this.state = { canRevoke: false };
    this.onRelease = this.onRelease.bind(this);
  }

  render() {
    const { start, end, cliff, total, vested, beneficiary } =
      this.props.details;

    return (
      <div className="details">
        <h4>Vesting details</h4>
        <Table striped bordered condensed>
          <tbody>
            <TableRow title="Beneficiary">
              <ContractLink address={beneficiary} />
            </TableRow>

            <TableRow title="Start date">{this.formatDate(start)}</TableRow>

            <TableRow title="Release 1">{this.formatDate(cliff)}</TableRow>

            <TableRow title="Release 2">{this.formatDate(end)}</TableRow>

            <TableRow title="Total vesting">{total} DMOD</TableRow>

            {/* <TableRow title="Already vested">
              {this.formatTokens(vested)}
            </TableRow>

            <TableRow title="Already released">
              {this.formatTokens(released)}
            </TableRow> */}

            <TableRow title="Releasable">
              <Releasable
                releasable={vested}
                onRelease={() => this.onRelease()}
              >
                {this.formatTokens(vested)}
              </Releasable>
            </TableRow>
          </tbody>
        </Table>
      </div>
    );
  }

  formatDate(date) {
    if (!date) return;
    const milliseconds = date * 1000;
    return moment(milliseconds).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  formatTokens(amount) {
    if (amount == null) return;
    const { decimals, symbol } = this.props.details;
    const display = displayAmount(amount, decimals);

    return `${display} ${symbol}`;
  }

  startLoader() {
    this.props.setLoader(true);
  }

  stopLoader() {
    this.props.setLoader(false);
  }

  async getTokenVesting() {
    return getTokenVesting(this.props.address);
  }

  async onRelease() {
    await Network.connectToWallet();
    const accounts = await Network.getAccounts();

    const { token } = this.props;
    const tokenVesting = await getPublicTokenVesting1(this.props.address);

    try {
      this.startLoader();
      tokenVesting
        .claimAirdrop({ from: accounts[0] })
        .on("transactionHash", (hash) => {
          this.props.setTxData(hash, "Pending");
        })
        .on("confirmation", (_, receipt) => {
          console.log(receipt);
        })
        .on("receipt", (receipt) => {
          console.log(
            "%cMyProject%cline:138%creceipt",
            "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
            "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
            "color:#fff;background:rgb(217, 104, 49);padding:3px;border-radius:2px",
            receipt
          );
          this.props.setTxData(receipt.transactionHash, "Done");
        })
        .on("error", function (error) {
          console.log(
            "%cMyProject%cline:140%cerror",
            "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
            "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
            "color:#fff;background:rgb(248, 214, 110);padding:3px;border-radius:2px",
            error
          );
        });
      // const tx = await tokenVesting.beneficiary({ from: accounts[0] });
      this.props.getData();
    } catch (e) {
      console.log(e);
      this.stopLoader();
    }
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

function Revocable({ revocable, onRevoke, canRevoke }) {
  if (!revocable) return <Emoji e="❌" />;

  return (
    <span>
      <Emoji e="✅" />
      {canRevoke ? (
        <a className="action" onClick={onRevoke}>
          Revoke
        </a>
      ) : null}
    </span>
  );
}

function Releasable({ releasable, onRelease, children }) {
  return (
    <span>
      {children}
      {releasable > 0 ? (
        <a className="action" onClick={onRelease}>
          Release
        </a>
      ) : null}
    </span>
  );
}

export default PublicDetails;
