import React from 'react';
import './Bird.css';

const Bird = ({ x, y, size, rotation }) => {
  return (
    <div
      className="bird"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <div className="bird-body">
        <div className="bird-eye"></div>
        <div className="bird-beak"></div>
        <div className="bird-wing"></div>
      </div>
    </div>
  );
};

export default Bird;