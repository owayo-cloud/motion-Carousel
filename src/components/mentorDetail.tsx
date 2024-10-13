import React, { Component, CSSProperties } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";

interface State{
  goToSlide:number;
  offsetRadius:number;
  enableSwipe: boolean;
  showNavigation: boolean;
  config: any;
  xDown: number | null;
  yDown: number | null;
  slideDetails: Array<{ title: string; description: string}>;
}
const getTouches = (evt: TouchEvent): TouchList => {
  return evt.touches || (evt as any).originalEvent.touches
};

export default class Example extends Component<{}, State> {
  state: State = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    enableSwipe: true,
    config: config.gentle,
    xDown: 0,
    yDown: 0,
    slideDetails:[
      { title: "Image 1", description: "First Description"},
      { title: "Image 2", description: "Second Description"},
      { title: "Image 3", description: "Third Description"},
      { title: "Image 4", description: "Fourth Description"},
      { title: "Image 5", description: "Last Description"},
    ],
  };

  slides = this.state.slideDetails.map((slide, index) => ({
    key: uuidv4(),
    content: <img src={`https://picsum.photos/800/${800 + index}/?random`} alt={slide.title} style={styles.carouselImage} />
  }));
    
  handleWheel = (event: React.WheelEvent) =>{
    if (event.deltaY>0){
      this.setState(prevState => ({
        goToSlide: (prevState.goToSlide + 1) % this.slides.length
      }));
    } else{
      this.setState(prevState => ({
        goToSlide: (prevState.goToSlide - 1 + this.slides.length) % this.slides.length
      }));
    }
  }

  render() {
    const {slideDetails, goToSlide} = this.state;
    return (
      <div
        style={ styles.container } onWheel={this.handleWheel}>
        <nav style={styles.nav}>
          <span style={styles.navItem}>Home</span>
        </nav>
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
          <h3 style={styles.avengersLabel}>Avengers</h3>
          <h1 style={styles.characterName}>
            {slideDetails[this.state.goToSlide].title}
          </h1>
          <p style={styles.characterDescription}>
            {slideDetails[this.state.goToSlide].description}
          </p>
        </div>
        <button style={styles.closeButton}>x</button>
      </div>
    );
  }
}
const styles: Record<string, CSSProperties> ={
  container:{
    display: "flex",
    flexDirection: 'column',
    height: "500px", 
    margin: "0 auto",
    color:'white',
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  nav:{
    padding:"1rem 2rem",
  },
  navItem:{
    color:"rgba(255, 255, 255, 0.5)",
    fontSize: '16px'
  },
  carouselSection:{
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '80vh',
    flex: 1,
  },
  infoSection:{
    width: '45%',
    padding: '2rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  avengersLabel: {
    color: "#ff0000",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  characterName: {
    fontSize: "3rem", 
    fontWeight: "bold",
    margin: "0.5rem 0",
  },
  characterDescription: {
    fontSize: "1.2rem",
    lineHeight: 1.5,
    marginBottom: "2rem",
  },
  closeButton: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "transparent",
    border: "1px solid white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "1rem",
  }
}
 
