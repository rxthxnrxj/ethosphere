import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { listGroups } from "../actions/messageActions";


function ChatSideBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const groupList = useSelector((state) => state.groupList);
  const { listOfGroups } = groupList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGroups(userInfo.id));
  }, [dispatch]);

  return (
    <div>
      {userInfo ? (
        <div>
          <Row className="p-0 m-0">
            <p
              className="p-0 mb-3"
              style={{ fontWeight: "600", color: "black" }}
            >
              Recents
            </p>
          </Row>
          <Col
            style={{
              boxShadow:
                "box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            {listOfGroups &&
              listOfGroups.map((group) => (
                <Row className="mb-2" key={group._id}>
                  <LinkContainer to={`/chat/${group._id}`} style={{ cursor: "pointer" }}>
                    <Card
                      className="p-2 msgCard"
                      style={{
                        boxShadow:
                          "box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px !important",
                        borderRadius: "8px !important",
                      }}
                    >
                      <p
                        className="p-0 m-0"
                        style={{
                          fontWeight: "600",
                          color: "black",
                          fontSize: "85%",
                        }}
                      >
                        {group.name}
                      </p>
                      <p className="p-0 m-0" style={{ fontSize: "80%" }}>
                        Latest Message{" "}
                      </p>
                    </Card>
                  </LinkContainer>
                </Row>
              ))}
          </Col>
          <Col xl={9}></Col>
        </div>
      ) : (
        <Row>
          <p>Ah.. It'empty</p>
        </Row>
      )}
    </div>
  );
}

export default ChatSideBar;
