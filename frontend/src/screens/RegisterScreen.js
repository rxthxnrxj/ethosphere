import React from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegisterScreen() {
  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Row className="text-center">
          <h4
            className="text-capitalize"
            style={{ color: "#2c21fb", fontWeight: "600 !important" }}
          >
            Welcome
          </h4>
        </Row>
        <Row className="mt-3 justify-content-center text-center">
          <Col xl={6}>
            <InputGroup className="mb-3">
              <Form.Control
                className="curvedBorder"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                style={{ borderRadius: "25 0px 0px 25px " }}
              >
                <i class="fa-regular fa-envelope"></i>
              </InputGroup.Text>
              <Form.Control
                style={{ borderRadius: "0px 25px 25px 0" }}
                placeholder="Email as Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                className="curvedBorder"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                className="curvedBorder"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Button className="primaryButton mt-3">Register</Button>
          </Col>
        </Row>
        <Row className="text-center mt-1" style={{ fontSize: "80%" }}>
          <p>
            Already a User? <Link to={"/login"}>Login</Link>
          </p>
        </Row>
      </Row>
    </div>
  );
}

export default RegisterScreen;
