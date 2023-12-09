import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import ChatSideBar from "../components/ChatSideBar";
import { GROUP_LIST_NULL } from "../constants/messageConstants";

import { messageCreate, listMessages } from "../actions/messageActions";

function AllChatScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, messages } = messageList;

  const [grpId, setGrpId] = useState("");

  const groupId = useParams().id;

  const [newMessage, setNewMessage] = useState("");

  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    dispatch(messageCreate({ grpId: groupId, content: newMessage }));
    setNewMessage("");
    if (groupId) {
      dispatch(listMessages(groupId));
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      dispatch(listMessages(groupId));
    };

    // Fetch messages initially
    fetchMessages();
    scrollToBottom();

    // Set up interval to fetch messages every 1 second
    const intervalId = setInterval(fetchMessages, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [groupId]);

  return (
    <div>
      <Row>
        <Col xl={3} sm={3} md={3} xs={3}>
          <ChatSideBar />
        </Col>
        <Col xl={9} sm={9} md={9} xs={9}>
          <Row className="p-0 m-0">
            <p
              className="p-0 mb-3"
              style={{ fontWeight: "600", color: "black" }}
            >
              Chat
            </p>
          </Row>
          <Row>
            <Col>
              <div className="chat-box">
                {messages &&
                  messages.map((message) => (
                    <Row
                      key={message._id}
                      className={
                        message.sender === userInfo._id
                          ? "user-message"
                          : "other-message"
                      }
                    >
                      <Col>
                        <Row>
                          <p style={{ fontSize: "70%" }} className="m-0 p-0">
                            @{message.user.name}
                          </p>
                        </Row>
                        <Row
                          style={{
                            backgroundColor:
                              message.sender === userInfo._id
                                ? "#007bff"
                                : "#f0f0f0",
                            color:
                              message.sender === userInfo._id ? "#fff" : "",
                            float:
                              message.sender === userInfo._id
                                ? "right"
                                : "left",
                            maxWidth: "fit-content",
                            borderRadius: "8px",
                            marginBottom: "0px",
                            padding: "5px 10px",
                          }}
                        >
                          {message.content}
                        </Row>
                      </Col>
                    </Row>
                  ))}
              </div>
              <div ref={messagesEndRef}></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ borderRadius: "0px 0px 0px 15px" }}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleSendMessage}
                    className="ml-2"
                    style={{ borderRadius: "0px 0px 15px 0px" }}
                  >
                    Send
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AllChatScreen;
