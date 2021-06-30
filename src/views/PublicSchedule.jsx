import React from "react";
import VestingChart from "./VestingChart";
import Emoji from "./Emoji";
import PublicChart from "./PublicChart";

function PublicSchedule({ details }) {
  return (
    <div>
      <h4>Vesting schedule</h4>
      {!details.revoked ? (
        details.total > 0 ? (
          <PublicChart details={details} />
        ) : (
          <Empty />
        )
      ) : (
        <Revoked />
      )}
    </div>
  );
}

function Empty() {
  return (
    <div className="warning">
      <span className="warning-message">
        <Emoji e="⚠️" /> No funds in the contract
      </span>
      <PublicChart details={{}} />
    </div>
  );
}

function Revoked() {
  return (
    <div className="warning">
      <span className="warning-message">
        <Emoji e="⚠️" /> Revoked
      </span>
      <PublicChart details={{}} />
    </div>
  );
}

export default PublicSchedule;
