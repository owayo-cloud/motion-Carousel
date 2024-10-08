import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, Twitter, Github, Linkedin } from 'lucide-react';

interface Character {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
}

const MentorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Replace this with your actual data source
  const characters: Character[] = [
    {
      id: 1,
      name: "JANE DOE",
      image: "/image/a.jpg",
      category: "MENTOR",
      description: "Senior software engineer with over 10 years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Known for mentoring junior developers and leading technical teams through complex projects."
    },
    {
      id: 2,
      name: "JANE DOE",
      image: "image/b.jpg",
      category: "MENTOR",
      description: "Senior software engineer with over 10 years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Known for mentoring junior developers and leading technical teams through complex projects."
    }
  ];
  
  const mentor = id ? characters.find(char => char.id === Number(id)) : null;
  console.log(mentor);
  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 p-6">
        <Link to="/" className="text-white/80 hover:text-white">
          Home
        </Link>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-full h-auto object-cover"
            />
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full border border-white/20 hover:bg-white/10"
              title="Close"
              aria-label="Close" // Additional accessibility
            >
              <X size={24} className="text-white" />
            </button>


          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Red Line Decoration */}
            <div className="w-32 h-1 bg-red-600"></div>
            
            {/* Category */}
            <h2 className="text-lg tracking-wider">
              {mentor.category}
            </h2>

            {/* Name */}
            <h1 className="text-6xl font-bold tracking-tight leading-none">
              {mentor.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              {mentor.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-6 pt-8">
              <a href="#" className="text-white/60 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Github size={24} />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="fixed bottom-6 left-6 text-sm text-white/60">
        Portfolio 2024 - React | TypeScript | Tailwind
      </div>
    </div>
  );
};

export default MentorDetails;