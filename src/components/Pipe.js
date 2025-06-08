import React from 'react';
import './Pipe.css';

const Pipe = ({ x, topHeight, bottomY, width, gameHeight }) => {
  return (
    <>
      {/* Top pipe */}
      <div
        className="pipe pipe-top"
        style={{
          left: `${x}px`,
          width: `${width}px`,
          height: `${topHeight}px`
        }}
      >
        <div className="pipe-cap pipe-cap-top"></div>
      </div>

      {/* Bottom pipe */}
      <div
        className="pipe pipe-bottom"
        style={{
          left: `${x}px`,
          top: `${bottomY}px`,
          width: `${width}px`,
          height: `${gameHeight - bottomY}px`
        }}
      >
        <div className="pipe-cap pipe-cap-bottom"></div>
      </div>
    </>
  );
};

export default Pipe;