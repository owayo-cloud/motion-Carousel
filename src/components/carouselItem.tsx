import { motion } from "framer-motion"
import React, { FC } from "react"

interface CarouselItemProps{
    children: React.ReactNode;
}

const CarouselItem: FC<CarouselItemProps> = ({ children }) => {
    return (
      <motion.div
        className="carousel-item"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ flex: "0 0 100%" }} // Each item takes full width
      >
        {children}
      </motion.div>
    );
  };
  
  export default CarouselItem;