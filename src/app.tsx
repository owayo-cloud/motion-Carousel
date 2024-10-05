import React from "react";
import Carousel from "./components/carousel";
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
  return <Carousel characters={characters} />;
};

export default App;
