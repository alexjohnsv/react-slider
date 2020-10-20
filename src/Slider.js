import React from 'react';
import './Slider.css';
import SliderMark from './SliderMark';
import SliderThumb from './SliderThumb';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
      currentValue: 10,
      previousMouseX: 0,
    };

    this.thumbRef = React.createRef();
  }

  componentDidMount() {
    const onPointerMove = (e) => {
      if (this.state.isMoving) {
        const thumbRect = this.thumbRef.current.getBoundingClientRect();

        const mouseX = e.pageX;
        const marks = this.props.marks;
        const currentValue = this.state.currentValue;
        const previousMouseX = this.state.previousMouseX;
        

        const diffRight = Math.abs(mouseX - thumbRect.right);
        const diffLeft = Math.abs(mouseX - thumbRect.left);

        const threshold = 5;

        if (diffRight < diffLeft && mouseX > thumbRect.right + threshold && mouseX > previousMouseX) {

          const currentMarkIndex = marks.indexOf(currentValue);

          if (currentMarkIndex < marks.length - 1) {
            this.setState({
              currentValue: marks[currentMarkIndex + 1],
              previousMouseX: mouseX,
            });
          }

        } else if (diffLeft < diffRight && mouseX < thumbRect.left + threshold && mouseX < previousMouseX) {

          const currentMarkIndex = marks.indexOf(currentValue);

          if (currentMarkIndex >= 1) {
            this.setState({
              currentValue: marks[currentMarkIndex - 1],
              previousMouseX: mouseX,
            });
          }
        }
        else {
          this.setState({ previousMouseX: e.pageX });
        }
      }
    };
    document.addEventListener('pointermove', onPointerMove);

    document.addEventListener('pointerup', (e) => {
      if (this.state.isMoving) {
        this.setState({ isMoving: false });
      }
    }, false);

    // @todo
    this.setState({
      maxValue: Math.max(...this.props.marks),
      minValue: Math.min(...this.props.marks),
    })
  }

  handleOnPointerDown = (e) => {
    this.setState({ isMoving: true, previousMouseX: e.pageX });
  };

  handleOnMarkClick = (mark) => {
    this.setState({
      currentValue: mark,
    })
  }

  render() {
    const marks = this.props.marks.map((mark) => 
      <SliderMark value={mark} 
                  current={this.state.currentValue}
                  max={this.state.maxValue}
                  handleClick={this.handleOnMarkClick} />
    );

    const trackPosition = {
      width: (this.state.currentValue / this.state.maxValue) * 100 + '%',
    }

    return (
      <div className="Slider">
        <div className="Slider-Track" style={trackPosition}></div>
        {marks}
        <SliderThumb thumbRef={this.thumbRef}
                     handleOnPointerDown={this.handleOnPointerDown}
                     current={this.state.currentValue}
                     max={this.state.maxValue}
        />
      </div>
    );
  }
}

export default Slider;
