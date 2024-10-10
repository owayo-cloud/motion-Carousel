import React, { useEffect, useRef, useState } from "react";
import "./mentorDetail.css";
import Image3 from "../image/c.jpg";
import Image2 from "../image/b.jpg";
import Image1 from "../image/a.jpg";

interface Mentor {
  name: string;
  specialty: string;
  description: string;
  image: string;
}

const mentors: Mentor[] = [
  {
    name: "John Doe",
    specialty: "Web Development",
    description: "Expert in full-stack web development.",
    image: "https://via.placeholder.com/150", // replace with actual image URL
  },
  {
    name: "Jane Smith",
    specialty: "Data Science",
    description: "Specializes in machine learning and data analysis.",
    image: "https://via.placeholder.com/150", // replace with actual image URL
  },
  // Add more mentors as needed
];

const MentorDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeMentor, setActiveMentor] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMentorTransition = (index: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const currentMentor = document.querySelector('.mentor-item.visible');
    currentMentor?.classList.remove('visible');

    setTimeout(() => {
      setActiveMentor(index);
      const nextMentor = document.querySelectorAll('.mentor-item')[index];
      nextMentor?.classList.add('visible');
      setIsTransitioning(false);
    }, 500);
  };

  const nextMentor = () => {
    const nextIndex = (activeMentor + 1) % mentors.length;
    handleMentorTransition(nextIndex);
  };

  const prevMentor = () => {
    const prevIndex = (activeMentor - 1 + mentors.length) % mentors.length;
    handleMentorTransition(prevIndex);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <div className="loading-text">Loading amazing mentors...</div>
      </div>
    );
  }

  return (
    <div className="main" ref={mainRef}>
      <div className="gradient-background"></div>
      <div className="parallax-overlay" ref={parallaxRef}></div>

      <nav className="navigation">
        <a href="/" className="home-link">
          <span className="link-text">Home</span>
          <span className="link-underline"></span>
        </a>
        <h1 className="logo">Mojomentors</h1>
      </nav>

      <div className="content">
        <div className="mentor-grid">
          {mentors.map((mentor, index) => (
            <div 
              key={index} 
              className={`mentor-item ${index === activeMentor ? 'visible' : ''}`}
            >
              <div className="mentor-image-container">
                <div 
                  className="mentor-image"
                  style={{ backgroundImage: `url(${mentor.image})` }}
                >
                  <div className="image-overlay"></div>
                </div>
              </div>
              <div className="mentor-info">
                <div className="info-content">
                  <span className="specialty">{mentor.specialty}</span>
                  <h2 className="name">{mentor.name}</h2>
                  <p className="description">{mentor.description}</p>
                  <button className="contact-button">Contact Mentor</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-carousel">
          <button className="carousel-button" onClick={prevMentor}>←</button>
          <div className="carousel-content">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${activeMentor * 100}%)` }}
            >
              {mentors.map((mentor, index) => (
                <div key={index} className="carousel-item">
                  <div 
                    className="carousel-image"
                    style={{ backgroundImage: `url(${mentor.image})` }}
                  ></div>
                  <div className="carousel-info">
                    <h3>{mentor.name}</h3>
                    <p>{mentor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-button" onClick={nextMentor}>→</button>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
