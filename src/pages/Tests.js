
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { categories } from "../utils";
import MainNavbar from "./MainNavbar";

// Function to get image source dynamically
const getImageSrc = (category) => {
  try {
    // Attempt to dynamically require image for the category
    return require(`../assets/categories/${category}.jpg`);
  } catch (error) {
    console.error(`Image for category ${category} not found`);
    return null; // Return null if image isn't found
  }
};

const Tests = () => {
  const { theme } = useTheme();

  const buttonClass = theme === "light" ? "btn-primary" : "btn-outline-light";

  const cardStyle = {
    backgroundColor: theme === "light" ? "#f8f9fa" : "#212529", // Light or dark background
    color: theme === "light" ? "#000" : "#fff", // Light or dark text
    borderRadius: "10px", // Rounded corners for the card
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for card depth
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "#343a40", color: "white", width: "100%" }}>
        <MainNavbar />
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          width: "100%",
          backgroundColor: theme === "light" ? "#f8f9fa" : "#212529",
        }}
      >
        <Container className="mt-4">
          {categories.length > 0 ? (
            <Row>
              {categories.map((category, index) => {
                return (
                  <Col md={4} mb={4} key={category} className="d-flex justify-content-center">
                    <Card style={{ ...cardStyle, width: "320px" }}>
                      {/* Dynamically set the image */}
                      <Card.Img
                        variant="top"
                        src={getImageSrc(category)}
                        alt={category}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                      <Card.Body>
                        <Card.Title className="text-capitalize">
                          {index + 1}. {String(category)}
                        </Card.Title>
                        <Card.Text>
                          Explore problems in the <strong>{String(category).substring(3)} Level</strong> category.
                        </Card.Text>
                        <Link to={`/quiz/${category}`}>
                          <Button className={buttonClass}>View {category}</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="text-center">No categories available.</div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Tests;
