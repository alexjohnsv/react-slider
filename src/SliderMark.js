import React from 'react';

function SliderMark(props) {

  const style = {
    left: (props.value / props.max) * 100 + '%',
    backgroundColor: props.value < props.current ? '#F08981' : '#F6BDB7',
  };

  return (
    <div className="Slider-Mark"
         style={style}
         onClick={() => { props.handleClick(props.value)}}
    ></div>
  );

}

export default SliderMark;