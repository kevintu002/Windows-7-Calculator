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
  const operRegEx = new RegExp('\\+|-|\\*|\\/');

  const handleDelete = () => {
    if (prevKey !== '=' && lowerVal !== '0') {
      setLowerVal((prev) => {
        // console.log("lowerVal: " + lowerVal + ", typeof: " + typeof lowerVal)
        // console.log("prev.length: " + prev.length + ", typeof: " + typeof prev.length)
        return prev.length === 1 ? '0' : prev.slice(0, -1)
      })
    }
    // setPrevKey('del')
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setIsReadyForResult(false)
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey('CE')
  }

  const handleOperator = () => ({target}) => {
    const operator = target.name

    // if prevKey was an operator, replace operator
    if (operRegEx.test(prevKey)) {
      setExpression((prev) => { // edge case: operator, dot, equal
        if (operRegEx.test(prev.slice(-1))) 
          prev.pop()
        return [...prev, operator]
      })
    } else if (prevKey === '.') { // edge case for dot input
      setLowerVal((prev) => prev.slice(0, -1))
      setExpression((prev) => [...prev, lowerVal.slice(0, -1), operator])
    } else {
      setExpression((prev) => {
        if (prevKey === '=')
          return [...prev, operator]
        else if (prevKey === 'CE')
          return [lowerVal, operator]
        else
          return [...prev, lowerVal, operator]
      })
    }
    setPrevKey(operator)
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      setLowerVal((prev) => (prev + '.'))
    }
    setPrevKey('.')
  }

  const handleDigit = () => ({target}) => {
    const newDigit = target.name;

    if (operRegEx.test(prevKey)) { // next input should overwrite lowerVal
      setLowerVal(newDigit)
    // otherwise, if 0, then overwrite otherwise append
    } else if (prevKey === '=') {
      setExpression([])
      setLowerVal(newDigit)
    } else {
      setLowerVal((prev) => (
        prev === '0' ? newDigit : prev + newDigit
      ));
    }
    setPrevKey(newDigit)
  }

  useEffect(() => {
    // rerenders the display and evaluates the expression when = is pressed
    if (isReadyForResult) {
      console.log('expression: ' + expression)
      setLowerVal(evaluate(expression.join('')) + '')
      setIsReadyForResult(false)
      setPrevKey('=')
    }
  }, [isReadyForResult, expression])

  const handleEqual = () => () => {
    // console.log('expression2: ' + expression)

    if (!operRegEx.test(expression)) {
      setExpression([lowerVal])
    } else {
      if (prevKey === '=') {
        if (expression.length < 2) { // expression is the current lowerVal
          setExpression([lowerVal])
        } else { // repeat last operator and operand
          setExpression((prev) => {
            return [...prev, prev.slice(-2)[0], prev.slice(-1)[0]]
          })
        }
      } else if (prevKey === 'CE') {
        if (expression.length < 2) {
          setExpression([lowerVal])
        } else { // use last operator and operand on curr lowerVal
          setExpression((prev) => {
            return [lowerVal, prev.slice(-2)[0], prev.slice(-1)[0]]
          })
        }
      } else { // just append
        setExpression((prev) => ([...prev, lowerVal]))
      }
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
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperator()}/><CalcKey name="%" /><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperator()}/><CalcKey name="1/x" /><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperator()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator()}/><CalcKey name="=" onClick={handleEqual()}/>
      </div>
    </div>
  );
}
