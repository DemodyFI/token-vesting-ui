import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

import { getTokenVesting } from "../contracts";
import { displayAmount } from "../utils";
import Network from "../network";

import { ContractLink } from "./Links";
import Emoji from "./Emoji";
import TxModal from "./TxModal";

class VestingDetails extends Component {
  constructor() {
    super();
    this.state = { canRevoke: false };
    this.onRelease = this.onRelease.bind(this);
  }

  render() {
    const {
      start,
      cliff,
      end,
      total,
      released,
      vested,
      revocable,
      beneficiary,
    } = this.props.details;
    const releasable = vested ? vested - released : 0;
    const cliffPast = cliff < new Date() / 1000 ? true : false;

    return (
      <div className="details">
        <h4>Vesting details</h4>
        <Table striped bordered condensed>
          <tbody>
            <TableRow title="Beneficiary">
              <ContractLink address={beneficiary} />
            </TableRow>

            <TableRow title="Start date">{this.formatDate(start)}</TableRow>

            <TableRow title="Cliff">{this.formatDate(cliff)}</TableRow>

            <TableRow title="End date">{this.formatDate(end)}</TableRow>

            <TableRow title="Total vesting">
              {this.formatTokens(total)}
            </TableRow>

            <TableRow title="Already vested">
              {this.formatTokens(vested)}
            </TableRow>

            <TableRow title="Already released">
              {this.formatTokens(released)}
            </TableRow>

            {cliffPast ? (
              <TableRow title="Releasable">
                <Releasable
                  releasable={releasable}
                  onRelease={() => this.onRelease()}
                >
                  {this.formatTokens(releasable)}
                </Releasable>
              </TableRow>
            ) : (
              <TableRow title="Releasable">
                <Releasable
                  releasable={releasable}
                  onRelease={() => this.onRelease()}
                >
                  0 DMOD
                </Releasable>
              </TableRow>
            )}

            <TableRow title="Revocable">
              <Revocable
                revocable={revocable}
                canRevoke={this.state.canRevoke}
                onRevoke={() => this.onRevoke()}
              />
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
    const { owner, revoked } = this.props.details;
    await Network.connectToWallet();
    const accounts = await Network.getAccounts();

    const isOwner = accounts[0]
      ? owner === accounts[0].toLowerCase()
      : undefined;

    this.setState({ canRevoke: isOwner && !revoked, accounts });

    const { token } = this.props;
    const tokenVesting = await this.getTokenVesting();

    try {
      // this.startLoader();
      tokenVesting
        .release(token, { from: accounts[0] })
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

  async onRevoke() {
    const { owner, revoked } = this.props.details;
    await Network.connectToWallet();
    const accounts = await Network.getAccounts();

    const isOwner = accounts[0]
      ? owner === accounts[0].toLowerCase()
      : undefined;

    this.setState({ canRevoke: isOwner && !revoked, accounts });

    const { token } = this.props;
    const tokenVesting = await this.getTokenVesting();

    try {
      // this.startLoader();
      await tokenVesting.revoke(token, { from: accounts[0] });
      this.props.getData();
    } catch (e) {
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

export default VestingDetails;
