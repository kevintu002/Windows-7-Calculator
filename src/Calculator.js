import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([]);
  // const [upperVal, setUpperVal] = useState(null); // display of expression
  const [lowerVal, setLowerVal] = useState('0'); // input state
  const [operator, setOperator] = useState(null);
  const [isReadyForOperation, setIsReadyForOperation] = useState(true);
  const [isReadyForOperand, setIsReadyForOperand] = useState(false);
  const [hasPressedEqual, setHasPressedEqual] = useState(false);

  const handleDelete = () => {
    if (lowerVal !== '0') {
      setLowerVal((prev) => (
        prev.length === 1 ? '0' : prev.slice(0, -1)
      ))
    }
  }

  const handleClear = () => {
    setExpression([])
    // setUpperVal(null)
    setLowerVal('0')
    setOperator(null)
    setIsReadyForOperation(true)
    setIsReadyForOperand(false)
    setHasPressedEqual(false)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
  }

  const stringToOperation =  {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
    '1/x': (x) => 1 / x,
    '√': (x) => Math.sqrt(x)
  }

  const handleOperation = () => ({target}) => {
    // setLowerVal('0')
    // console.log(target.name)
    
    setExpression((prev) => [...prev, lowerVal, target.name])
    // setOperator(target.name)

    if (isReadyForOperation) { // empty expression, so left and operator
      // setUpperVal(lowerVal + target.name)
      
      
      
    } else {
      // setExpression((prev) => prev + )
      // setUpperVal((prev) => (prev + lowerVal + target.name))
    }
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      setLowerVal((prev) => (prev + '.'))
    }
  }

  const handleDigit = () => ({target}) => {
    setLowerVal((prev) => (
      prev === '0' ? target.name : prev + target.name
    ));
  }

  useEffect(() => {
    if (isReadyForOperand) {
      console.log(expression)
      setLowerVal(evaluate(expression.join('')) + '')
      setIsReadyForOperand(false)
      setHasPressedEqual(true)
    }
  }, [isReadyForOperand, expression])

  const handleEqual = () => ({target}) => {
    // console.log('expression: ' + expression)
    if (!hasPressedEqual) {
      setExpression((prev) => (
        [...prev, lowerVal]
      ))
      setIsReadyForOperand(true)
    } else {
      setExpression((prev) => {
        const [a] = prev.slice(-1), [b] = prev.slice(-2)
        return [...prev, b, a]
      }
        
      )
      setIsReadyForOperand(true)
    }
    // setLowerVal(evaluate(expression.join('')) + '')
    
    
    // console.log(upperVal.split('+'))
    // setLowerVal(upperVal)
    // console.log('upperVal + lowerVal: ' + upperVal + ' ' + lowerVal)
    // console.log(eval(upperVal + ' ' + lowerVal))
    // setLowerVal(eval(upperVal + ' ' + lowerVal))
  }

  return (
    <div className="calculator" >
      <div className="display">
        <CalcDisplay upperVal={expression} lowerVal={lowerVal} />
      </div>
      <div className="keyboard">
      </div>
      <div className="keyboard-bot">
        <CalcKey name="Del" onClick={handleDelete}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±"/><CalcKey name="√" onClick={handleOperation()}/><br/>
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperation()}/><CalcKey name="%" onClick={handleOperation()}/><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperation()}/><CalcKey name="1/x" onClick={handleOperation()}/><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperation()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperation()}/><CalcKey name="=" onClick={handleEqual()}/>
      </div>
    </div>
  );
}
