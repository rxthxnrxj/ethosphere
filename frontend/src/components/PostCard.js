import React from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const similar = {
    backgroundColor: "#2c21fb",
    color: "white",
    borderRadius: "10px",
    width: "100%",
  };

  const mildlySimilar = {
    backgroundColor: "#2c21fb10",
    color: "black",
    borderRadius: "10px",
    width: "100%",
  };
  const baseSimilar = {
    backgroundColor: "#2c21fb10",
    color: "black",
    borderRadius: "10px",
    width: "100%",
  };

  return (
    <Card
      style={
        1 <= post.similarity < 0.8
          ? baseSimilar
          : 0.8 <= post.similarity < 0.4
          ? mildlySimilar
          : similar
      }
      className="my-3 p-1"
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title
          className="smallerTitleFont text-capitalize"
          style={{ textDecoration: "none !important" }}
        >
          @{post.post.user.name}
        </Card.Title>
        <Card.Text className="smallerFont">{post.post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
