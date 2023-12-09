import React from "react";

import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "block",
        color: "#2c21fb",
      }}
    >
      <span className="sr-only visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
