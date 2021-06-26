import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([]);
  const [lowerVal, setLowerVal] = useState('0'); // input state
  const [isReadyForOperand, setIsReadyForOperand] = useState(false);
  const [prevKey, setPrevKey] = useState(null);
  const opsRegexp = new RegExp('\\+|-|\\*|\\/|%');

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
    setIsReadyForOperand(false)
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey(null)
  }

  const handleOperator = () => ({target}) => {
    // if prevKey was an operator, replace operator
    if (opsRegexp.test(prevKey)) {
      // edge case: operator, dot, equal
      setExpression((prev) => {
        if (opsRegexp.test(prev.slice(-1))) 
          prev.pop()
        return [...prev, target.name]
      })
    // edge case for dot input
    } else if (prevKey === '.') {
      setLowerVal((prev) => prev.slice(0, -1))
      setExpression((prev) => [...prev, lowerVal.slice(0, -1), target.name])
    // otherwise, append lowerVal and operator to the expression
    } else {
      setExpression((prev) => [...prev, lowerVal, target.name])
    }
    setPrevKey(target.name)
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      setLowerVal((prev) => (prev + '.'))
    }
    setPrevKey('.')
  }

  const handleDigit = () => ({target}) => {
    // if prevKey was an operator, then next input should overwrite lowerVal
    if (opsRegexp.test(prevKey)) {
      setLowerVal(target.name)
    // otherwise, if 0, then overwrite otherwise append
    } else {
      setLowerVal((prev) => (
        prev === '0' ? target.name : prev + target.name
      ));
    }
    setPrevKey(target.name)
  }

  useEffect(() => {
    // rerenders the display and evaluates the expression when = is pressed
    if (isReadyForOperand) {
      console.log(expression)
      setLowerVal(evaluate(expression.join('')))
      setIsReadyForOperand(false)
      setPrevKey('=')
    }
  }, [isReadyForOperand, expression])

  const handleEqual = () => () => {
    // repeat last expression if previous input was equals
    if (prevKey === '=') {
      setExpression((prev) => {
        const [a] = prev.slice(-1), [b] = prev.slice(-2)
        return [...prev, b, a]
      })
    // otherwise just append
    } else {
      setExpression((prev) => ([...prev, lowerVal]))
    }

    setIsReadyForOperand(true)
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
