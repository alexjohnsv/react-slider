import React from 'react';
import './Slider.css';

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

        // @todo
        const threshold = 30;

        if (diffRight < diffLeft && diffRight > threshold && mouseX > previousMouseX) {

          const currentMarkIndex = marks.indexOf(currentValue);

          if (currentMarkIndex < marks.length - 1) {
            this.setState({
              currentValue: marks[currentMarkIndex + 1],
              previousMouseX: mouseX,
            });
          }

        } else if (diffLeft < diffRight && diffLeft > threshold && mouseX < previousMouseX) {

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

  renderMark(mark) {
    const backgroundColor = mark <= this.state.currentValue ? '#F08981' : '#F6BDB7';

    const style = {
      left: (mark / this.state.maxValue) * 100 + '%',
      backgroundColor: backgroundColor,
    };

    return (
      <div key={mark.toString()} onClick={() => { this.handleOnMarkClick(mark)}} style={style} className="Slider-Mark"></div>
    );
  }

  render() {
    const marks = this.props.marks.map((mark) => this.renderMark(mark));

    const thumbRectition = {
      left: 'calc(' + (this.state.currentValue / this.state.maxValue) * 100 + '% - 10px)',
    }

    const trackPosition = {
      width: (this.state.currentValue / this.state.maxValue) * 100 + '%',
    }

    return (
      <div className="Slider">
        <div className="Slider-Track" style={trackPosition}></div>
        {marks}
        <div className="Slider-Thumb" ref={this.thumbRef} style={thumbRectition}
             onPointerDown={(e) => this.handleOnPointerDown(e)}
        >
             <div className="Slider-CurrentValue">{this.state.currentValue}</div>
        </div>
      </div>
    );
  }
}

export default Slider;
