import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import PostCard from "../components/PostCard";

import { createGroup } from "../actions/messageActions";

function HomeScreen() {
  const [allPosts, setAllPosts] = useState([]);

  const postCreate = useSelector((state) => state.postCreate);
  const { error, loading, posts } = postCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const groupCreate = useSelector((state) => state.groupCreate);
  const {
    loading: loadingGroupCreate,
    success,
    error: errorGroupCreate,
  } = groupCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  const createDiscussionHandler = () => {
    const userIds = posts.map((post) => post.post.user.id);
    const uniqueUserIds = [...new Set(userIds)];
    const content = posts[0].post.content;
    console.log(uniqueUserIds, content);
    dispatch(createGroup(uniqueUserIds, content));
  };
  return (
    <div>
      {loadingGroupCreate ? (
        <Row className=" text-center mb-3">
          <Loader />
        </Row>
      ) : errorGroupCreate ? (
        <Message variant="danger">{errorGroupCreate}</Message>
      ) : success ? (
        <Row className="text-center">
          <p>
            Discussion successfully created. Go to{" "}
            <Link to="/chat">Discussions</Link>
          </p>
        </Row>
      ) : (
        <Row></Row>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          <Row>
            {allPosts && allPosts.length == 0 ? (
              <Row className="mt-3 text-center">
                <p>Hmm.. a new topic that the world hasn't discussed. Yet !</p>
              </Row>
            ) : allPosts && 3 < allPosts.length < 8 ? (
              <Row className="justify-content-center">
                <Button
                  className="discussBtn"
                  style={{ fontSize: "75%", maxWidth: "fit-content" }}
                  onClick={createDiscussionHandler}
                >
                  Start Discussion
                </Button>
              </Row>
            ) : (
              userInfo && (
                <Row className="text-center">
                  <p>Start by typing something...</p>
                </Row>
              )
            )}
            <Row className="px-1">
              {allPosts &&
                allPosts.map((post) => (
                  <Col
                    className="d-flex"
                    key={post.post._id}
                    sm={6}
                    md={6}
                    lg={3}
                    xl={3}
                  >
                    <PostCard post={post} />
                  </Col>
                ))}
            </Row>
          </Row>
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
