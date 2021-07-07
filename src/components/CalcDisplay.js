import React from 'react';

export default function CalcDisplay({upperVal, lowerVal}) {
  return (
    <div>
      <div className="outer-div expression">
        <label 
          id="expression" 
          className="inner-div small-text" 
          data-testid="expression">
            {upperVal}
        </label>
      </div>
      
      <div className="outer-div">
        <label 
          id="lowerVal" 
          className="inner-div large-text" 
          data-testid="lowerVal">
            {lowerVal}
        </label>
      </div>
    </div>
  )
}