import React from "react";
import { useParams } from "react-router-dom";

const MentorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch the mentor details based on the id, here we're using a static array for demonstration
  const characters = [
    { id: 1, name: "Character 1", image: "/path/to/image1.jpg", description: "Description 1" },
    { id: 2, name: "Character 2", image: "/path/to/image2.jpg", description: "Description 2" },
    { id: 3, name: "Character 3", image: "/path/to/image3.jpg", description: "Description 3" },
    // Add more character objects as needed
  ];

  const mentor = characters.find(character => character.id.toString() === id);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="mentor-details">
      <h1>{mentor.name}</h1>
      <img src={mentor.image} alt={mentor.name} />
      <p>{mentor.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MentorDetails;
