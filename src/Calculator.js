import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([])
  const [lowerVal, setLowerVal] = useState('0')
  const [prevKey, setPrevKey] = useState(null)

  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setPrevKey(null)
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey('CE')
  }

  const toggleSign = () => () => {
    setLowerVal((prev) => (prev * -1) + '')
  }

  const handleSqrt = () => {

  }
  
  const handlePercent = () => {

  }

  const handleInverse = () => {

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
      setExpression([lowerVal, newOperator])
    } else {
      // evaluate and display current expression with new operator
      setExpression((prev) => [...prev, lowerVal, newOperator])
      setLowerVal(myEval([...expression, lowerVal]))
    }

    setPrevKey(newOperator)
  }

  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => () => {
    // console.log('expression: ' + expression)
    // console.log('prevKey: ' + prevKey)

    if (!operRegEx.test(expression)) {
      setExpression([lowerVal])
    } else if (prevKey === '.') {
      // safe to always slice b/c >1 dot in lowerVal does not exist,
      // so last key is never . when a dot already exists
      const newLowerVal = lowerVal.slice(0,-1)

      // was last item in expression was an operator?
      if (operRegEx.test(expression.slice(-1))) {
        setExpression([...expression, newLowerVal])
        setLowerVal(myEval([...expression, newLowerVal]))
      } else {
        const [lastOperator, lastOperand] = expression.slice(-2)
        setExpression([newLowerVal, lastOperator, lastOperand])
        setLowerVal(myEval([newLowerVal, lastOperator, lastOperand]))
      } 
    } else if (prevKey === '=') {
      // repeat last operator and operand
      const [lastOperator, lastOperand] = expression.slice(-2)
      const newResult = myEval([...expression, lastOperator, lastOperand])

      setExpression([lowerVal, lastOperator, lastOperand])
      setLowerVal(newResult)
    } else if (prevKey === 'CE') {
      // use last operator and operand on curr lowerVal
      const [lastOperator, lastOperand] = expression.slice(-2)
      const newResult = myEval([lowerVal, lastOperator, lastOperand])

      setExpression([lowerVal, lastOperator, lastOperand])
      setLowerVal(newResult)
    } else { // just append
      setExpression([...expression, lowerVal])
      setLowerVal(myEval([...expression, lowerVal]))
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
        <CalcKey name="Del" onClick={handleDelete}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±" onClick={toggleSign()}/><CalcKey name="√" onClick={handleSqrt()}/><br/>
        <CalcKey name="7" onClick={handleDigit()}/><CalcKey name="8" onClick={handleDigit()}/><CalcKey name="9" onClick={handleDigit()}/><CalcKey name="/" onClick={handleOperator()}/><CalcKey name="%" onClick={handlePercent()} /><br/>
        <CalcKey name="4" onClick={handleDigit()}/><CalcKey name="5" onClick={handleDigit()}/><CalcKey name="6" onClick={handleDigit()}/><CalcKey name="*" onClick={handleOperator()}/><CalcKey name="1/x" onClick={handleInverse()} /><br/>
        <CalcKey name="1" onClick={handleDigit()}/><CalcKey name="2" onClick={handleDigit()}/><CalcKey name="3" onClick={handleDigit()}/><CalcKey name="-" onClick={handleOperator()}/><br/>
        <CalcKey name="0" onClick={handleDigit()}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator()}/><CalcKey name="=" onClick={handleEqual()}/>
      </div>
    </div>
  );
}
