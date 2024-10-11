import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import { title } from "process";

interface State{
  goTOSlide:number;
  offsetRadius:number;
  showNavigation: boolean;
  enableSwipe: boolean;
  config: any;
  xDown: number | null;
  yDown: number | null;
}
const getTouches = (evt: TouchEvent): TouchList => {
  return evt.touches || (evt as any).originalEvent.touches
};

export default class Example extends Component {
  state = {
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

  slides = [
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/801/?random" alt="1" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/802/?random" alt="2" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/600/803/?random" alt="3" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/500/?random" alt="4" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/804/?random" alt="5" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/500/800/?random" alt="6" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/600/?random" alt="7" />
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/805/800/?random" alt="8" />
    }
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  handleTouchStart = (evt: React.TouchEvent<HTMLDivElement>) => {
    if (!this.state.enableSwipe) {
      return;
    }

    const firstTouch = evt.touches[0];
    this.setState({
      ...this.state,
      xDown: firstTouch.clientX,
      yDown: firstTouch.clientY
    });
  };

  handleTouchMove = (evt: React.TouchEvent) => {
    if (!this.state.enableSwipe || (!this.state.xDown === null && !this.state.yDown)) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        this.setState({
          goToSlide: this.state.goToSlide + 1,
          xDown: null,
          yDown: null
        });
      } else {
        /* right swipe */
        this.setState({
          goToSlide: this.state.goToSlide - 1,
          xDown: null,
          yDown: null
        });
      }
    }
  };

  render() {
    const {slideDetails, goToSlide} = this.state;
    return (
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "500px", margin: "0 auto" }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        <div
          style={{
            margin: "0 auto",
            padding: "1rem",
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <div style={{padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", borderLeft: "2px solid #ddd"}}></div>
          <h2> {slideDetails[goToSlide]?.title}</h2>
          <p>{slideDetails[goToSlide]?.description}</p>

          {/*Close Button*/}
          <button style={{
              padding: "10px 20px",
              backgroundColor: "#ff5c5c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "1rem",
            }} onClick={() => this.setState({ goToSlide:0})}>Close</button>
          <div>
            <label>Go to slide: </label>
            <input name="goToSlide" onChange={this.onChangeInput} placeholder="Enter slide Number" />
          </div>
          <div>
            <label>Offset Radius: </label>
            <input name="offsetRadius" onChange={this.onChangeInput} placeholder="Offset Radius"/>
          </div>
          <div>
            <label>Show navigation: </label>
            <input
              type="checkbox"
              checked={this.state.showNavigation}
              name="showNavigation"
              onChange={(e) => {
                this.setState({ showNavigation: e.target.checked });
              }}
              placeholder="Navigation"
            />
          </div>
          <div>
            <label>Enable swipe: </label>
            <input
              type="checkbox"
              checked={this.state.enableSwipe}
              name="enableSwipe"
              onChange={(e) => {
                this.setState({ enableSwipe: e.target.checked });
              }}
              placeholder="Enable Swipe"
            />
          </div>
          <div>
            <button
              onClick={() => {
                this.setState({ config: config.gentle });
              }}
              disabled={this.state.config === config.gentle}
            >
              Gentle Transition
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.setState({ config: config.slow });
              }}
              disabled={this.state.config === config.slow}
            >
              Slow Transition
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.setState({ config: config.wobbly });
              }}
              disabled={this.state.config === config.wobbly}
            >
              Wobbly Transition
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.setState({ config: config.stiff });
              }}
              disabled={this.state.config === config.stiff}
            >
              Stiff Transition
            </button>
          </div>
        </div>
      </div>
    );
  }
}
