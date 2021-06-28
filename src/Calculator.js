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
  const [prevKey, setPrevKey] = useState(null)

  const [isReadyForResult, setIsReadyForResult] = useState(false)
  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setPrevKey(null)
    setIsReadyForResult(false)
  }

  const handleClearEntry = () => {
    // console.log("asdfasdf:" + expression)
    setLowerVal('0')
    setPrevKey('CE')
  }

  const handleDelete = () => {
    if (prevKey !== '=' && lowerVal !== '0') {
      setLowerVal((prev) => prev.length === 1 ? '0' : prev.slice(0, -1))

      setPrevKey('del')
    }
  }

  const handleDot = () => {
    if (!lowerVal.includes('.')) {
      if (prevKey === '=' || operRegEx.test(prevKey) 
      || (expression.length === 0 && lowerVal === '0'))
      // prepend 0 under special cases
        setLowerVal('0.')
      else
        setLowerVal((prev) => prev + '.')
      
      setPrevKey('.')
    }
  }

  const handleDigit = () => ({target}) => {
    const newDigit = target.name;
      
    if (prevKey !== '=' && !operRegEx.test(prevKey)) {
      // overwrite 0. otherwise, append
      setLowerVal((prev) => prev === '0' ? newDigit : prev + newDigit)
    } else {
      // next input overwrites lowerVal
      if (prevKey === '=')
        setExpression([])
      setLowerVal(newDigit)
    }

    setPrevKey(newDigit)
  }

  const handleOperator = () => ({target}) => {
    const newOperator = target.name
    
    if (operRegEx.test(prevKey)) {
      // replace operator
      setExpression((prev) => [...prev.slice(0,-1), newOperator])
    } else if (prevKey === '.') {
      // remove dot
      const newLowerVal = lowerVal.slice(0,-1)

      setExpression((prev) => [...prev, newLowerVal, newOperator])
      setLowerVal(newLowerVal)
    } else if (prevKey === '=') {
      // append to existing expression
      setExpression((prev) => [...prev, newOperator])
    } else if (prevKey === 'CE' && !operRegEx.test(expression)) {
      // new expression
      setExpression((_) => [lowerVal, newOperator])
    } else {
      // evaluate and display current expression with new operator
      setExpression((prev) => [...prev, lowerVal, newOperator])
      // setLowerVal(evaluate([...expression, lowerVal].join('')) + '')
      setLowerVal(myEval([...expression, lowerVal]))
    }

    setPrevKey(newOperator)
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
  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => () => {
    // console.log('expression2: ' + expression)
    // console.log('prevKey: ' + prevKey)

    if (!operRegEx.test(expression)) {
      setExpression([lowerVal])
    } else if (prevKey === '.') {
      // 0+1.=
      // 0+.=
      // 0+1.1.=
      
      // console.log(`lastOp: ${lastOperator}`)

      // const newLowerVal = lowerVal
      // if (!lowerVal.includes('.'))
      const newLowerVal = lowerVal.slice(0,-1)

      // was last item in expression was an operator?
      if (operRegEx.test(expression.slice(-1))) {
        setExpression((prev) => [...prev, newLowerVal])
        setLowerVal(myEval([...expression, newLowerVal]))
      } else {
        const [lastOperator, lastOperand] = expression.slice(-2)
        setExpression((_) => [newLowerVal, lastOperator, lastOperand])
        setLowerVal(myEval([newLowerVal, lastOperator, lastOperand]))
      } 
    } else if (prevKey === '=') {
      // repeat last operator and operand
      const [lastOperator, lastOperand] = expression.slice(-2)
      const newResult = myEval([...expression, lastOperator, lastOperand])

      setExpression((_) => [lowerVal, lastOperator, lastOperand])
      setLowerVal(newResult)
    } else if (prevKey === 'CE') {
      // use last operator and operand on curr lowerVal
      const [lastOperator, lastOperand] = expression.slice(-2)
      const newResult = myEval([lowerVal, lastOperator, lastOperand])

      setExpression((_) => [lowerVal, lastOperator, lastOperand])
      setLowerVal(newResult)
    } else { // just append
      setExpression((_) => ([...expression, lowerVal]))
      setLowerVal(myEval([...expression, lowerVal]))
    }

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
