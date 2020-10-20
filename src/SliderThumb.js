import React from 'react';

function SliderThumb(props) {

  const style = {
    left: 'calc(' + (props.current / props.max) * 100 + '% - 10px)',
  };

  return (
    <div className="Slider-Thumb"
         ref={props.thumbRef}
         style={style}
         onPointerDown={(e) => props.handleOnPointerDown(e)}
    >
      <div className="Slider-CurrentValue">{props.current}</div>
    </div>
  );

}

export default SliderThumb;