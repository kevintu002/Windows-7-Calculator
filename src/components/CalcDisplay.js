import React from 'react';

export default function CalcDisplay({upperVal, lowerVal}) {
  return (
    <div>
      <div className="outer-div expression">
        <div id="expression" className="inner-div sm-text" data-testid="expression">{upperVal}</div>
      </div>
      
      <div className="outer-div">
        <div id="lowerVal" className="inner-div lg-text" data-testid="lowerVal">{lowerVal}</div>
      </div>
    </div>
  )
}