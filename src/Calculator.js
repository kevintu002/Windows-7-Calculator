import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([]);
  const [lowerVal, setLowerVal] = useState('0'); // input state
  const [isReadyForResult, setIsReadyForResult] = useState(false);
  const [prevKey, setPrevKey] = useState(null);
  const operRegEx = new RegExp('\\+|-|\\*|\\/|%');

  const handleDelete = () => {
    if (lowerVal != '0') {
      setLowerVal((prev) => {
        console.log("lowerVal: " + lowerVal)
        console.log("prev.length: " + prev.length)
        return prev.length === 1 ? '0' : prev.slice(0, -1)
      })
    }
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setIsReadyForResult(false)
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey(null)
  }

  const handleOperator = () => ({target}) => {
    // if prevKey was an operator, replace operator
    if (operRegEx.test(prevKey)) {
      // edge case: operator, dot, equal
      setExpression((prev) => {
        if (operRegEx.test(prev.slice(-1))) 
          prev.pop()
        return [...prev, target.name]
      })
    // edge case for dot input
    } else if (prevKey === '.') {
      setLowerVal((prev) => prev.slice(0, -1))
      setExpression((prev) => [...prev, lowerVal.slice(0, -1), target.name])
    // otherwise, append lowerVal and operator to the expression
    } else {
      setExpression((prev) => (
        prevKey === '=' 
        ? [...prev, target.name] 
        : [...prev, lowerVal, target.name]
      ))
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
    // console.log(target.name, target.name + '')
    // console.log("prevKey: " + prevKey)
    // if prevKey was an operator, then next input should overwrite lowerVal
    if (operRegEx.test(prevKey)) {
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
    if (isReadyForResult) {
      console.log('expression: ' + expression)
      setLowerVal(evaluate(expression.join('')))
      setIsReadyForResult(false)
      setPrevKey('=')
    }
  }, [isReadyForResult, expression])

  const handleEqual = () => () => {
    // console.log('expression2: ' + expression)
    // repeat last expression if previous input was equals
    if (prevKey === '=' && expression.length < 2) {
      setExpression([lowerVal])
    } else if (prevKey === '=') {
      setExpression((prev) => {
        const [a] = prev.slice(-1), [b] = prev.slice(-2)
        // if (!a && !b)
          return [...prev, b, a]
        // return prev
      })
    // otherwise just append
    } else {
      setExpression((prev) => ([...prev, lowerVal]))
    }

    setIsReadyForResult(true)
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
        <CalcKey name="Del" onClick={handleDelete}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±"/><CalcKey name="√" /><br/>
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperator()}/><CalcKey name="%" onClick={handleOperator()}/><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperator()}/><CalcKey name="1/x" /><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperator()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator()}/><CalcKey name="=" onClick={handleEqual()}/>
      </div>
    </div>
  );
}
