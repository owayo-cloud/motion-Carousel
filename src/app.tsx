import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from "./components/carousel";
import Image3 from "./image/c.jpg";
import Image2 from "./image/b.jpg";
import Image1 from "./image/a.jpg";
import MentorDetails from "./components/mentorDetail";

// Define the Character interface
export interface Character {
  id: number;
  name: string;
  image: string;
  title?: string;
  description?: string;
}

// Create the characters array with more detailed information
const characters: Character[] = [
  {
    id: 1,
    name: "Character 1",
    image: Image1,
    title: "MENTOR",
    description: "Description for Character 1. Add your character's story and details here."
  },
  {
    id: 2,
    name: "Character 2",
    image: Image2,
    title: "MENTOR",
    description: "Description for Character 2. Add your character's story and details here."
  },
  {
    id: 3,
    name: "Character 3",
    image: Image3,
    title: "MENTOR",
    description: "Description for Character 3. Add your character's story and details here."
  }
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Carousel characters={characters} />} />
        <Route path="/mentor/:id" element={<MentorDetails />} />
      </Routes>
    </Router>
  );
};

export default App;