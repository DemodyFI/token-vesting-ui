import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import InvestorsVesting from "./views/InvestorsVesting";
import PublicTokenVestingApp from "./views/PublicTokenVestingApp";
import PublicVesting from "./views/PublicVesting";

import TokenVestingApp from "./views/TokenVestingApp";
import Vesting from "./views/Vesting";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Vesting} />
      <Route path="/investors/:address/:token" component={InvestorsMain} />
      <Route path="/public/:address/:token" component={PublicMain} />
      <Route path="/investors" component={InvestorsVesting} />
      <Route path="/public" component={PublicVesting} />
      <Route component={MissingAddress} />
    </Switch>
  </Router>
);

const InvestorsMain = function ({ match }) {
  let web3 = new Web3();
  let { address, token } = match.params;

  // TODO validate TokenVesting address
  return web3.utils.isAddress(address) ? (
    <TokenVestingApp address={address} token={token} />
  ) : (
    <MissingAddress />
  );
};

const PublicMain = function ({ match }) {
  let web3 = new Web3();
  let { address, token } = match.params;

  // TODO validate TokenVesting address
  return web3.utils.isAddress(address) ? (
    <PublicTokenVestingApp address={address} token={token} />
  ) : (
    <MissingAddress />
  );
};

const MissingAddress = () => <p>This is not a TokenVesting address :(</p>;

export default App;
