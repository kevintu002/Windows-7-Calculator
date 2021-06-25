import React from 'react';

export default function CalcDisplay({upperVal, lowerVal}) {
  return (
    <div>
      <div className="outer-div">
        <div className="inner-div sm-text">{upperVal}</div>
      </div>
      <div className="outer-div">
        <div className="inner-div lg-text">{lowerVal}</div>
      </div>
    </div>
  )
}