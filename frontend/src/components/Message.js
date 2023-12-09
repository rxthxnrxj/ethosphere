import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} className="text-center mt-3 poppinsFont">
      {children}
    </Alert>
  );
}

export default Message;
