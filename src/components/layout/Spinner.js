import React, { Fragment } from "react";
import logo from "../../img/logo.png";

export default () => (
  <Fragment>
    <div
      className="lds-ripple"
      style={{
        width: "200px",
        margin: "250px auto",
        paddingTop: "100px",
        display: "block",
      }}
    >
      <img
        style={{
          width: "50px",
          position: "absolute",
          top: "50px",
          left: "50px",
        }}
        src={logo}
        alt="Loading..."
      />
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Fragment>
);
