import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useState } from 'react';

export default function Calculator() {
  const [upperVal, setUpperVal] = useState(null); // display of operator and operations
  const [lowerVal, setLowerVal] = useState('0'); // input state
  const [operator, setOperator] = useState(null);
  const [isOperandReady, setIsOperandReady] = useState(false); // flag for reporting operand

  const handleBackspace = () => {

  }

  const handleClear = ({target}) => {
    setUpperVal(null)
    setLowerVal('0')
    setOperator(null)
    setIsOperandReady(false)
  }

  const handleClearEntry = ({target}) => {
    setLowerVal('0')
  }

  const handleOperation = () => ({target}) => {
    console.log(target.name)
    if (upperVal == null) { // empty upper, so left and operator
      setUpperVal(lowerVal + target.name)
      setOperator(target.name)
    }
    
    setIsOperandReady(true)
  }

  const handleDot = ({target}) => {
    
  }

  const handleDigit = () => ({target}) => {
    if (isOperandReady) {
      setIsOperandReady(false)
    } else {
      setLowerVal((prev) => (
        prev === '0' // curr displayValue is 0?
          ? target.name // set to inputDigit
          : prev + target.name // append digit
      ));
    }
  }

  return (
    <div className="calculator" >
      <div className="display">
        <CalcDisplay upperVal={upperVal} lowerVal={lowerVal} />
      </div>
      <div className="keyboard">
      </div>
      <div className="keyboard-bot">
        <CalcKey name="&#9664;--" onClick={handleBackspace}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±"/><CalcKey name="√"/><br/>
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperation()}/><CalcKey name="%" onClick={handleOperation()}/><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperation()}/><CalcKey name="1/x"/><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperation()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperation()}/><CalcKey name="="/>
      </div>
    </div>
  );
}
