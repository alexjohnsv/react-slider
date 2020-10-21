import React from 'react';
import './Slider.css';
import SliderThumb from './SliderThumb';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMoving: false,
      currentValue: 1,
      currentIndex: 1,
      previousMouseX: 0,
      marks: [0, 10, 20, 30, 40, 50, 100],
      maxValue: 100,
      minValue: 0,
    };

    this.marksRef = this.state.marks.map(() => React.createRef());

    this.thumbRef = React.createRef();
  }

  componentDidMount() {
    const onPointerMove = (e) => {
      if (this.state.isMoving) {
        const mouseX = e.pageX;
        const previousMouseX = this.state.previousMouseX;

        const currentIndex = this.state.currentIndex;
        const currentRef = this.marksRef[currentIndex].current;
        const currentPos = currentRef.getBoundingClientRect();
      
        // Left
        if (mouseX < previousMouseX) {

          const previousIndex = currentIndex - 1;

          const previous = this.state.marks[previousIndex];

          if (previous !== undefined) {

            const previousPos = this.marksRef[previousIndex].current.getBoundingClientRect();

            const previousDelta = Math.abs(previousPos.right - mouseX);
            const currentDelta = Math.abs(currentPos.left - mouseX);

            if (previousDelta < currentDelta) {
              this.setState({
                currentIndex: previousIndex,
                previousMouseX: mouseX,
              })
            }

          }

        } else if (mouseX > previousMouseX) {

          const nextIndex = currentIndex + 1;

          const next = this.state.marks[nextIndex];

          if (next !== undefined) {

            const nextPos = this.marksRef[nextIndex].current.getBoundingClientRect();

            const nextDelta = Math.abs(nextPos.left - mouseX);
            const currentDelta = Math.abs(currentPos.right - mouseX);

            if (nextDelta < currentDelta) {
              this.setState({
                currentIndex: nextIndex,
                previousMouseX: mouseX,
              })
            }
          }

        }
      }
    };
    document.addEventListener('pointermove', onPointerMove);

    document.addEventListener('pointerup', (e) => {
      if (this.state.isMoving) {
        this.setState({ isMoving: false });
      }
    }, false);
  }

  handleOnPointerDown = (e) => {
    this.setState({ isMoving: true, previousMouseX: e.pageX });
  };

  handleOnMarkClick = (mark) => {
    this.setState({
      currentValue: mark,
    })
  }

  renderMark(mark, index) {
    const currentValue = this.state.marks[this.state.currentIndex];
    
    const style = {
      left: (mark / this.state.maxValue) * 100 + '%',
      backgroundColor: mark < currentValue ? '#F08981' : '#F6BDB7',
    };
  
    return (
      <div className="Slider-Mark"
           key={mark.toString()}
           style={style}
           ref={this.marksRef[index]}
      ></div>
    );
  }

  render() {
    const marks = this.state.marks.map((mark, index) => this.renderMark(mark, index));

    const currentValue = this.state.marks[this.state.currentIndex];

    const trackPosition = {
      width: (currentValue / this.state.maxValue) * 100 + '%',
    }


    return (
      <div className="Slider">
        <div className="Slider-Track" style={trackPosition}></div>
        {marks}
        <SliderThumb thumbRef={this.thumbRef}
                     handleOnPointerDown={this.handleOnPointerDown}
                     current={currentValue}
                     max={this.state.maxValue}
        />
      </div>
    );
  }
}

export default Slider;
