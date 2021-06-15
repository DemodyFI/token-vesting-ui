import React from "react";

function TxModal({ txhash, status }) {
  return (
    <div className="spinner">
      <div className="tx-modal">
        {status === "Pending" ? (
          <>
            <h5>Your Transaction is Pending, Please Wait...</h5>
            <img src={require("../assets/spinner.gif").default} alt="spinner" />
            <br />
            <a target="#" href={"https://etherscan.io/tx/" + txhash}>
              Etherscan Link
            </a>
          </>
        ) : null}
        {status === "Done" ? (
          <>
            <h5>Your Transaction Was Successful</h5>
            <a target="#" href={"https://etherscan.io/tx/" + txhash}>
              Etherscan Link
            </a>
          </>
        ) : null}
      </div>
      {/* <img src={require("../assets/spinner.gif").default} alt="spinner" /> */}
    </div>
  );
}

export default TxModal;
