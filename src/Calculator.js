import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([]);
  const [lowerVal, setLowerVal] = useState('0'); // input state
  // const [operator, setOperator] = useState(null);
  const [isReadyForOperation, setIsReadyForOperation] = useState(true);
  const [isReadyForOperand, setIsReadyForOperand] = useState(false);
  const [wasEqual, setWasEqual] = useState(false);
  const [prevKey, setPrevKey] = useState(null);

  const handleDelete = () => {
    if (lowerVal !== '0') {
      setLowerVal((prev) => (
        prev.length === 1 ? '0' : prev.slice(0, -1)
      ))
    }
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    // setOperator(null)
    setIsReadyForOperation(true)
    setIsReadyForOperand(false)
    setWasEqual(false)
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setWasEqual(false)
    setPrevKey(null)
    // setIsReadyForOperation(true)
    // setIsReadyForOperand(false)
  }

  const handleOperator = () => ({target}) => {
    setWasEqual(false)
    // setLowerVal('0')
    // console.log(target.name)

    console.log(prevKey)
    
    const regex = new RegExp('\\+|-|\\*|\\/|%');
    console.log(prevKey.match(regex))
    console.log(regex.test(prevKey))
    if (regex.test(prevKey)) {
      
      setExpression((prev) => {
        const prevOperator = prev[-1]
        return (prev.pop, prevOperator)
      })
    } else {
      setExpression((prev) => [...prev, lowerVal, target.name])
    }

    if (isReadyForOperation) { // empty expression, so left and operator
      
      
    } else {
      // setExpression((prev) => prev + )
    }
    setPrevKey(target.name)
  }

  const handleDot = ({target}) => {
    if (!lowerVal.includes('.')) {
      setLowerVal((prev) => (prev + '.'))
    }
    setPrevKey('.')
  }

  const handleDigit = () => ({target}) => {
    setLowerVal((prev) => (
      prev === '0' ? target.name : prev + target.name
    ));
    setPrevKey(target.name)
  }

  useEffect(() => {
    if (isReadyForOperand) {
      console.log(expression)
      setLowerVal(evaluate(expression.join('')) + '')
      setIsReadyForOperand(false)
      setWasEqual(true)
      setPrevKey('=')
    }
  }, [isReadyForOperand, expression])

  const handleEqual = () => ({target}) => {
    // console.log('expression: ' + expression)
    if (prevKey !== '=') {
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

    setPrevKey('=')
  }

  return (
    <div className="calculator" >
      <div className="display">
        <CalcDisplay upperVal={expression} lowerVal={lowerVal} />
      </div>
      <div className="keyboard">
      </div>
      <div className="keyboard-bot">
        <CalcKey name="Del" onClick={handleDelete}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±"/><CalcKey name="√" onClick={handleOperator()}/><br/>
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperator()}/><CalcKey name="%" onClick={handleOperator()}/><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperator()}/><CalcKey name="1/x" onClick={handleOperator()}/><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperator()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator()}/><CalcKey name="=" onClick={handleEqual()}/>
      </div>
    </div>
  );
}
