import React from "react";
import { Col } from "react-bootstrap";
import { ContractLink, TokenLink } from "./Links";

function Header({ address, token, tokenName, contractName }) {
  return (
    <header className="header">
      <Col xs={12}>
        <a
          target="_blank"
          href="https://openzeppelin.org"
          rel="noopener noreferrer"
        >
          <img
            className="logo hidden-xs hidden-sm"
            src={require("../assets/logosharp.png").default}
            alt="OpenZeppelin logo"
          />
        </a>
        <div className="contracts">
          <h3>
            {contractName} address: <ContractLink address={address} />
          </h3>
          <span>
            For <TokenLink address={token} name={tokenName} />
          </span>
        </div>
      </Col>
    </header>
  );
}

export default Header;
