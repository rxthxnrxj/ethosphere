import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Navbar, Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { createPost } from "../actions/postActions";
import { POST_NULL } from "../constants/postConstants";
import { GROUP_LIST_NULL } from "../constants/messageConstants";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    dispatch({
      type: POST_NULL,
    });
    return true;
  };

  const [isHovered, setIsHovered] = useState(false);

  const [postContent, setPostContent] = useState("");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const removeDiscussionsHandler = () => {
    console.log("Here");
    dispatch({
      type: GROUP_LIST_NULL,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ content: postContent }));
  };

  useEffect(() => {
    dispatch({
      type: GROUP_LIST_NULL,
    });
  }, [dispatch]);
  return (
    <Navbar className="bg-body-tertiary justify-content-around">
      <Form inline>
        <Row className="text-center">
          <Col>
            <LinkContainer
              to="/"
              className="m-auto justify-content-center"
              style={{ cursor: "pointer" }}
            >
              <img
                className="navBarLogo m-auto m-0"
                src={require("../images/logoWeb.png")}
                alt="dns_logo"
              />
            </LinkContainer>
          </Col>
        </Row>
        {userInfo ? (
          <Row className="text-center mt-3">
            <Col>
              <p className=" text-capitalize">
                Hey, <span>{`${userInfo.name}`}</span>
              </p>
            </Col>
          </Row>
        ) : (
          <Row className="text-center mt-3">
            <Col>
              <p className=" text-capitalize" style={{ fontWeight: "400" }}>
                Hi, Please login to continue
              </p>
            </Col>
          </Row>
        )}

        <Row className="d-flex">
          <Col>
            <span className="float-end">
              {" "}
              <p className="minimalIcon">
                {userInfo ? (
                  <i class="fa-solid fa-power-off" onClick={logoutHandler}></i>
                ) : (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      fontSize: "16px",
                      color: isHovered ? "#ff0000" : "#333",
                      fontWeight: isHovered ? "bold" : "normal",
                    }}
                  >
                    {isHovered ? (
                      <Link to="/login" className="minimalIcon">
                        <p
                          className="text-capitalize"
                          style={{ textTransform: "none !important" }}
                        >
                          Login
                        </p>
                      </Link>
                    ) : (
                      <Link to="/login" className="minimalIcon">
                        <i class="fa-solid fa-user"></i>
                      </Link>
                    )}
                  </div>
                )}
              </p>
            </span>
          </Col>
          <Col>
            <span className="float-start">
              {" "}
              <Link
                to="/chat"
                className="minimalIcon"
                onClick={removeDiscussionsHandler}
              >
                <i class="fa-solid fa-message"></i>
              </Link>
            </span>
          </Col>
        </Row>
        {userInfo ? (
          <InputGroup>
            <Row className="justify-content-between mt-2 text-center">
              <Col>
                <Form.Control
                  as="textarea"
                  resize="none"
                  placeholder={
                    userInfo
                      ? "Whatcha thinkin about..."
                      : "Please login to continue"
                  }
                  aria-label="Content"
                  aria-describedby="basic-addon1"
                  className="textBox mt-3"
                  id="review-text"
                  rows={3}
                  style={{
                    width: "40rem",
                    minHeight: "8rem",
                    maxHeight: "20rem",
                  }}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <Button
                  disabled={userInfo ? false : true}
                  type="submit"
                  className="noTextDecoration mt-2 primaryButton"
                  style={{
                    textDecoration: "capitalize !important",
                    width: "fit-content",
                    position: "absolute",
                    bottom: "5%",
                    right: "2%",
                  }}
                  onClick={submitHandler}
                >
                  <i class="fa-regular fa-paper-plane"></i>
                </Button>
              </Col>
            </Row>
          </InputGroup>
        ) : (
          <Row className="mt-5 text-center">
            <h3 className="text-capitalize">
              Welcome to <span className="blueFont">Ethos</span>phere
            </h3>
            <p className=" text-lowercase" style={{ fontWeight: "400" }}>
              A space for expressing your ideas and engaging with like-minded
              individuals
            </p>
          </Row>
        )}
      </Form>
    </Navbar>
  );
}

export default Header;
