import React from 'react'

function Spinner() {
  return <div className="spinner">
    <img src={require("../assets/spinner.gif").default} alt="spinner" />
  </div>
}

export default Spinner