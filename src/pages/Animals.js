import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";
import { Image, Button } from "react-bootstrap";
import { animals_lessons } from "../utils";
import MainNavbar from "./MainNavbar";
import { useTheme } from "../ThemeContext";

const AnimalLayout = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from ThemeContext



  return (
      <div className={theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}>
        <MainNavbar theme={theme} toggleTheme={toggleTheme} />
        <div className="container my-5">
          {animals_lessons.map((animal, index) => (
            <div key={index} className={`mb-5 border p-4 shadow-sm rounded ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
              <h2 className="text-center">{animal.name}</h2>
              <div className="text-center">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  className="animal-image"
                  thumbnail
                  fluid
                  style={{ width: "300px", height: "300px", objectFit: "cover" }}
                />
              </div>
              <ul className="mt-3">
                {animal.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p>{animal.description}</p>
              <div className="text-center">
                <ReactPlayer
                  url={animal.video}
                  width="100%"
                  height="315px"
                  controls={true}
                  playing={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AnimalLayout;
