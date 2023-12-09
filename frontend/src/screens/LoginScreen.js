import React, { useState, useEffect } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { location } = useLocation();
  const redirect = location ? location.split("=")[1] : "/";
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row></Row>
        )}
      </Row>
      <Row className="justify-content-center mt-5">
        <Row className="text-center">
          <h4
            className="text-capitalize"
            style={{ color: "#2c21fb", fontWeight: "600 !important" }}
          >
            Hello
          </h4>
        </Row>
        <Row className="mt-3 justify-content-center text-center">
          <Col xl={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                style={{ borderRadius: "25 0px 0px 25px " }}
              >
                <i class="fa-regular fa-envelope"></i>
              </InputGroup.Text>
              <Form.Control
                style={{ borderRadius: "0px 25px 25px 0" }}
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                className="curvedBorder"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Button className="primaryButton mt-3" onClick={submitHandler}>
              Login
            </Button>
          </Col>
        </Row>
        <Row className="text-center mt-1" style={{ fontSize: "80%" }}>
          <p>
            New User? <Link to={"/register"}>Register</Link>
          </p>
        </Row>
      </Row>
    </div>
  );
}

export default LoginScreen;
