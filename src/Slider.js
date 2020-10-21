import React from 'react';
import './Slider.css';
import SliderThumb from './SliderThumb';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMoving: false,
      currentIndex: 1,
      previousMouseX: 0,
    };
    this.marksRef = [];
    this.thumbRef = React.createRef();
  }

  componentDidMount() {
    this.marksRef = this.props.marks.map(() => React.createRef());

    this.setState({
      currentIndex: this.props.marks.indexOf(this.props.defaultValue)
    })

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

          const previous = this.props.marks[previousIndex];

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

          const next = this.props.marks[nextIndex];

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

  renderMark(mark, index, currentValue, maxValue) {
    const style = {
      left: (mark / maxValue) * 100 + '%',
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
    const currentValue = this.props.marks[this.state.currentIndex];
    const maxValue = Math.max(...this.props.marks);

    const marks = this.props.marks.map((mark, index) => this.renderMark(mark, index, currentValue, maxValue));

    const trackPosition = {
      width: (currentValue / maxValue) * 100 + '%',
    }


    return (
      <div className="Slider">
        <div className="Slider-Track" style={trackPosition}></div>
        {marks}
        <SliderThumb thumbRef={this.thumbRef}
                     handleOnPointerDown={this.handleOnPointerDown}
                     current={currentValue}
                     max={maxValue}
        />
      </div>
    );
  }
}

export default Slider;
