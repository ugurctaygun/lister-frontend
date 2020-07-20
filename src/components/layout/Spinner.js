import React, { Fragment } from "react";
import logo from "../../img/logo.png";

export default () => (
  <Fragment>
    <img
      src={logo}
      style={{
        width: "200px",
        margin: "250px auto",
        paddingTop: "250px",
        display: "block",
      }}
      alt="Loading..."
    />
  </Fragment>
);
