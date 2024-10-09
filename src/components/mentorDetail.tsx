import React, { useEffect, useRef, useState } from "react";
import Image3 from "../image/c.jpg";
import Image2 from "../image/b.jpg";
import Image1 from "../image/a.jpg";
import "./mentorDetail.css";

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
    description: "Expert in full-stack development with 10 years of experience in building scalable applications.",
    image: Image1
  },
  {
    name: "Jane Smith",
    specialty: "UI/UX Design",
    description: "Creative designer with a passion for crafting intuitive user experiences.",
    image: Image2
  },
  {
    name: "Mike Johnson",
    specialty: "Mobile Development",
    description: "Specialized in creating native mobile applications for iOS and Android platforms.",
    image: Image3
  },
  {
    name: "Sarah Wilson",
    specialty: "Cloud Architecture",
    description: "Expert in designing and implementing scalable cloud solutions.",
    image: Image2
  }
];

const MentorDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.mentor-item').forEach((item) => {
      observerRef.current?.observe(item);
    });

    // Parallax effect
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
      observerRef.current?.disconnect();
    };
  }, []);

  const nextMentor = () => {
    setActiveIndex((prev) => (prev + 1) % mentors.length);
  };

  const prevMentor = () => {
    setActiveIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
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

      <div className="hero-section">
        <h1 className="hero-title">Meet Our Expert Mentors</h1>
        <p className="hero-subtitle">Learn from the best in the industry</p>
      </div>

      <div className="content">
        <div className="mentor-grid">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-item">
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
      </div>

      <div className="mobile-carousel">
        <button className="carousel-button prev" onClick={prevMentor}>←</button>
        <div className="carousel-content">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
        <button className="carousel-button next" onClick={nextMentor}>→</button>
      </div>
    </div>
  );
};

export default MentorDetails;