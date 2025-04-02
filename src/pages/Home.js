import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { categories } from "../utils";
import MainNavbar from "./MainNavbar";

import animals from "../assets/animals.jpg";

import aquatic from "../assets/aquatic.jpg";
import birds from "../assets/birds.webp";
import fruits from "../assets/fruits.jpg";
import vegetables from "../assets/vegetables.jpg";



const getImageSrc = (category) => {
  const formats = ["jpg", "jpeg", "png", "webp"]; // Possible image formats

  for (const format of formats) {
    try {
      return require(`../assets/${category}.${format}`);
    } catch (error) {
      continue; // Try the next format
    }
  }

  return null; // Return fallback image if none exist
};

const Home = () => {
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
      <MainNavbar/>
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
            <div className="row">
              {categories.map((category, index) => {
            
                return (
                  <div className="col-md-4 mb-4 d-flex justify-content-center" key={category}>
                    <Card style={{ ...cardStyle, width: "320px" }}> {/* Set consistent card width */}
                      <Card.Img variant="top"   src={getImageSrc(category)} alt={category}   style={{ width: "100%", height: "200px", objectFit: "cover" }} 
 />
                      <Card.Body>
                        <Card.Title className="text-capitalize">
                          {index + 1}. {String(category)}
                        </Card.Title>
                        <Card.Text>
                          Explore problems in the <strong>{String(category).substring(0)} Level</strong> category.
                        </Card.Text>
                        <Link to={`/${category}`}>
                          <Button className={buttonClass}>View {category}</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">No categories available.</div>
          )}
        </Container>
      </div>
    </div>
    
  );
};

export default Home;
