import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const states = {
    FIRST_ARG: 0,
    SECOND_ARG: 1,
    EQUAL: 2
  }

  const [expression, setExpression] = useState([])
  const [result, setResult] = useState()
  const [lowerVal, setLowerVal] = useState('0')
  const [currState, setCurrState] = useState(states.FIRST_ARG)
  const [oper, setOperator] = useState(null)
  const [prevKey, setPrevKey] = useState(null)

  const [isReadyForResult, setIsReadyForResult] = useState(false)
  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  useEffect(() => {

  }, [expression])

  const handleDelete = () => {
    if (prevKey !== '=' && lowerVal !== '0') {
      setLowerVal((prev) => {
        // console.log("lowerVal: " + lowerVal + ", typeof: " + typeof lowerVal)
        // console.log("prev.length: " + prev.length + ", typeof: " + typeof prev.length)
        return prev.length === 1 ? '0' : prev.slice(0, -1)
      })
    }
    setPrevKey('del')
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setIsReadyForResult(false)
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    // console.log("asdfasdf:" + expression)
    setLowerVal('0')
    setPrevKey('CE')
  }

  const handleOperator = () => ({target}) => {
    const operator = target.name
    
    // if prevKey was an operator, replace operator
    if (operRegEx.test(prevKey)) {
      setOperator(operator)
    }
    // if (operRegEx.test(prevKey)) {
    //   setExpression((prev) => { // edge case: operator, dot, equal
    //     if (operRegEx.test(prev.slice(-1))) 
    //       prev.pop()
    //     return [...prev, operator]
    //   })
    // } else if (prevKey === '.') { // edge case for dot input
    //   setLowerVal((prev) => prev.slice(0, -1))
    //   setExpression((prev) => [...prev, lowerVal.slice(0, -1), operator])
    // } else {
    //   setExpression((prev) => {
    //     if (prevKey === '=')
    //       return [...prev, operator]
    //     else if (prevKey === 'CE')
    //       return [lowerVal, operator]
    //     else
    //       return [...prev, lowerVal, operator]
    //   })
    // }
    // console.log("here@")
    // console.log('prevKey: ' + prevKey)

    setOperator(operator)
    setPrevKey(operator)
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      if (prevKey === '=' || operRegEx.test(prevKey) || expression.length === 0)
        setLowerVal('0.')
      else
        setLowerVal((prev) => prev + '.')
    }
    setPrevKey('.')
  }

  const handleDigit = () => ({target}) => {
    const newDigit = target.name;
      
    if (prevKey !== '=' && !operRegEx.test(prevKey)) { // overwrite 0. otherwise, append
      setLowerVal((prev) => prev === '0' ? newDigit : prev + newDigit)
    } else { // next input overwrites lowerVal
      if (prevKey === '=')
        setExpression([])
      setLowerVal(newDigit)
    }

    setPrevKey(newDigit)
  }

  // useEffect(() => {
  //   // rerenders the display and evaluates the expression when = is pressed
  //   if (isReadyForResult) {
  //     console.log('expression: ' + expression)
  //     setLowerVal(evaluate(expression.join('')) + '')
  //     setIsReadyForResult(false)
  //     setPrevKey('=')
  //   }
  // }, [isReadyForResult, expression])

  // const getOperator = () =>{
  //   return expression.slice(-2)[0]
  // }

  // const getOperand = () =>{
  //   return expression.slice(-1)[0]
  // }

  const handleEqual = () => () => {
    // console.log('expression2: ' + expression)
    // console.log('prevKey: ' + prevKey)

    // if (!operRegEx.test(expression)) {
    //   setExpression([lowerVal])
    // } else {
    //   if (prevKey === '=') {// repeat last operator and operand
    //     setExpression((prev) => [...prev, prev.slice(-2)[0], prev.slice(-1)[0]])
    //   } else if (prevKey === 'CE') { // use last operator and operand on curr lowerVal
    //     setExpression((prev) => [lowerVal, prev.slice(-2)[0], prev.slice(-1)[0]])
    //     console.log("here")

    //   } else { // just append
    //     setExpression((prev) => ([...prev, lowerVal]))
    //   }
    // }

    // setIsReadyForResult(true)
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
