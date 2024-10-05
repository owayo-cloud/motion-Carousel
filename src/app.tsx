import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from "./components/carousel";
import MentorDetails from "./components/mentorDetails"; // Ensure this is the correct import
import Image3 from "./image/c.jpg"; 
import Image2 from "./image/b.jpg"; 
import Image1 from "./image/a.jpg"; 

const characters = [
  {
    id: 1,
    name: "Character 1",
    image: Image1,
  },
  {
    id: 2,
    name: "Character 2",
    image: Image2,
  },
  {
    id: 3,
    name: "Character 3",
    image: Image3,
  },
  // Add more character objects as needed
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Carousel characters={characters} />} />
        <Route path="/mentor/:id" element={<MentorDetails />} /> {/* Route for mentor details */}
      </Routes>
    </Router>
  );
};

export default App;
