import { 
  motion, 
  useMotionValue, 
  useSpring, 
  PanInfo 
} from "framer-motion";
import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./carousel.css";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CarouselProps {
  characters: Character[];
}

const Carousel: React.FC<CarouselProps> = ({ characters }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseVelocity = -0.07;
  const [isDragging, setIsDragging] = React.useState(false);
  const smoothVelocity = useSpring(0, {
    damping: 50,
    stiffness: 400
  });

  // Create an array that duplicates characters for continuous scrolling
  const duplicatedCharacters = [...characters, ...characters, ...characters];

  useEffect(() => {
    let timeoutId: number;

    function update() {
      const currentX = x.get();
      const moveBy = baseVelocity * 15;
      const containerWidth = containerRef.current?.scrollWidth || 0;

      // Reset position when it reaches the end of the duplicate
      if (currentX <= -containerWidth / 2) {
        x.set(0);
      } else {
        x.set(currentX + moveBy);
      }

      timeoutId = requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(timeoutId);
  }, [baseVelocity, x]);

  const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (!isDragging) {
        console.log('Navigating to:', `/mentor/${character.id}`);
        navigate(`/mentor/${character.id}`);
      }
    };

    return (
      <motion.div
        className="carousel-slide"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
          draggable="false"
        />
      </motion.div>
    );
  };

  return (
    <div className="carousel-root">
      <nav className="nav-home">
        <a href="#" className="nav-link">Home</a>
      </nav>

      <div className="carousel-container">
        <div className="header-container">
          <h1 className="carousel-title">CHOOSE MENTOR</h1>
          <div className="red-underline"></div>
          <h2 className="carousel-subtitle">MENTORS</h2>
        </div>

        <motion.div
          ref={containerRef}
          className="carousel-track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -1000, right: 1000 }}
          onDragStart={() => {
            setIsDragging(true);
            smoothVelocity.set(0);
          }}
          onDrag={(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            smoothVelocity.set(info.velocity.x);
          }}
          onDragEnd={() => {
            setIsDragging(false);
            smoothVelocity.set(baseVelocity * 15);
          }}
        >
          {duplicatedCharacters.map((character, index) => (
            <CharacterCard key={`${character.id}-${index}`} character={character} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
