import React, { Component, CSSProperties } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import styled from "styled-components";

interface State {
  goToSlide: number;
  offsetRadius: number;
  enableSwipe: boolean;
  showNavigation: boolean;
  config: any;
  xDown: number | null;
  yDown: number | null;
  slideDetails: Array<{ title: string; description: string; background: string }>;
}

const getTouches = (evt: TouchEvent): TouchList => {
  return evt.touches || (evt as any).originalEvent.touches;
};

const HomeLink = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    transition: width 0.5s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border: 1px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(-50%) scale(1.2);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default class Example extends Component<{}, State> {
  state: State = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: false,
    enableSwipe: true,
    config: config.gentle,
    xDown: 0,
    yDown: 0,
    slideDetails: [
      { title: "Image 1", description: "First Description", background: "#ffa500" },
      { title: "Image 2", description: "Second Description", background: "#ff0000" },
      { title: "Image 3", description: "Third Description", background: "#0000ff" },
      { title: "Image 4", description: "Fourth Description", background: "#0ef" },
      { title: "Image 5", description: "Last Description", background: "#9acd32" },
    ],
  };

  slides = this.state.slideDetails.map((slide, index) => ({
    key: uuidv4(),
    content: (
      <img
        src={`https://picsum.photos/800/${800 + index}/?random`}
        alt={slide.title}
        style={styles.carouselImage}
      />
    ),
  }));

  handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      this.setState((prevState) => ({
        goToSlide: (prevState.goToSlide + 1) % this.slides.length,
      }));
    } else {
      this.setState((prevState) => ({
        goToSlide: (prevState.goToSlide - 1 + this.slides.length) % this.slides.length,
      }));
    }
  };

  render() {
    const { slideDetails, goToSlide } = this.state;
    const currentSlide = slideDetails[goToSlide];

    return (
      <div style={{ ...styles.container, backgroundColor: "#1a2a4a"}} onWheel={this.handleWheel}>
        <nav style={styles.nav}>
          <HomeLink>Home</HomeLink>  
        </nav>
        <div style={styles.contentWrapper}>
          <div style={styles.carouselSection}>
            <Carousel
              slides={this.slides}
              goToSlide={this.state.goToSlide}
              offsetRadius={this.state.offsetRadius}
              showNavigation={this.state.showNavigation}
              animationConfig={this.state.config}
            />
          </div>
          <div style={styles.infoSection}>
            <div style={styles.horizontalLine}></div>
            <h3 style={styles.avengersLabel}>MENTORS</h3>
            <h1 style={styles.characterName}>{currentSlide.title}</h1>
            <div style={styles.horizontalLine2}></div>
            <p style={styles.characterDescription}>{currentSlide.description}</p>
          </div>
        </div>
        <CloseButton>x</CloseButton>
      </div>
    );
  }
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "0 auto",
    color: "white",
    fontFamily: "'Roboto', Arial, sans-serif",
    position: "relative",
  },
  nav: {
    padding: "1rem 2rem",
    zIndex: 1,
    textAlign:'left'
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
  },
  carouselSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoSection: {
    width: "40%",
    padding: "2rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  horizontalLine: {
    width: "250px",
    height: "2px",
    backgroundColor: "#ff0000",
    marginBottom: "1rem",
  },
  horizontalLine2: {
    width: "250px",
    height: "2px",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: "1rem",
  },
  avengersLabel: {
    color: "#ff0000",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    letterSpacing: "7px"
  },
  characterName: {
    fontSize: "4rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    textTransform: 'uppercase'
  },
  characterDescription: {
    fontSize: "1rem",
    lineHeight: 1.5,
    marginBottom: "2rem",
    maxWidth: "80%"
  },
};
