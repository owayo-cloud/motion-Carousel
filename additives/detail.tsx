import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, Twitter, Github, Linkedin } from 'lucide-react';
import Image3 from "../image/c.jpg";
import Image2 from "../image/b.jpg";
import Image1 from "../image/a.jpg";
import "./mentorDetail.css";

interface Character {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
}

const MentorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const characters: Character[] = [
    {
      id: 1,
      name: "JANE DOE",
      image: Image1,
      category: "MENTOR",
      description: "Senior software engineer with over 10 years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Known for mentoring junior developers and leading technical teams through complex projects."
    },
    {
      id: 2,
      name: "JANE DOE",
      image: Image2,
      category: "MENTOR",
      description: "Senior software engineer with over 10 years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Known for mentoring junior developers and leading technical teams through complex projects."
    },
    {
      id: 3,
      name: "JANE DOE",
      image: Image3,
      category: "MENTOR",
      description: "Senior software engineer with over 10 years of experience in full-stack development. Specializing in React, Node.js, and cloud architecture. Known for mentoring junior developers and leading technical teams through complex projects."
    }
  ];

  const mentor = id ? characters.find(char => char.id === Number(id)) : null;

  // Use ref and effect for handling wheel scroll transition
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (contentRef.current) {
        contentRef.current.classList.add('transitioning');
        setTimeout(() => {
          contentRef.current?.classList.remove('transitioning');
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  if (!mentor) {
    return (
      <div className="not-found">
        <p>Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <nav className="navigation">
        <Link to="/" className="home-link">
          Home
        </Link>
      </nav>

      <div className="main-content">
        <div ref={contentRef} className="content-grid">
          <div className="image-container">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-image"
            />
            <button
              type="button"
              className="close-button"
              title="Close"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <div className="content-section">
            <div className="red-line"></div>
            
            <h2 className="category-title">
              {mentor.category}
            </h2>

            <h1 className="mentor-name">
              {mentor.name}
            </h1>

            <p className="mentor-description">
              {mentor.description}
            </p>

            <div className="social-links">
              <a href="#" className="social-link">
                <Twitter size={24} />
              </a>
              <a href="#" className="social-link">
                <Github size={24} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Portfolio 2024 - React | TypeScript | Tailwind
      </div>
    </div>
  );
};

export default MentorDetails;
