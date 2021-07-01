import './css/style.css';
import CalcDisplay from './components/CalcDisplay';
import CalcKey from './components/CalcKey';
import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';

export default function Calculator() {
  const [expression, setExpression] = useState([])
  const [lowerVal, setLowerVal] = useState('0')
  const [prevKey, setPrevKey] = useState(null)
  const [mem, setMem] = useState('0')
  const [errorMsg, setErrorMsg] = useState('')
  const [history, setHistory] = useState([ ['', ''], ['', ''], ['', ''], ['', ''], ['', '']])
  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  useEffect(() => {
    if (lowerVal === 'Infinity') {
      setExpression([])
      setLowerVal('0')
      setPrevKey(null)
      setErrorMsg('Cannot divide by zero')
    }
  }, [lowerVal])

  const MClear = () => {
    setMem('0')
  }

  const MRetrieve = () => {
    setLowerVal(mem)
    setPrevKey('MR')
  }

  const MStore = () => {
    setMem(lowerVal)
    if (!isNaN(prevKey))
      setPrevKey('MS')
  }

  const MAdd = () => {
    setMem(myEval([mem, '+', lowerVal]))
  }

  const MSubtract = () => {
    setMem(myEval([mem, '-', lowerVal]))
  }

  const handleClear = () => {
    setExpression([])
    setLowerVal('0')
    setPrevKey(null)
    setErrorMsg('')
  }

  const handleClearEntry = () => {
    setLowerVal('0')
    setPrevKey('CE')
  }

  const toggleSign = () => {
    setLowerVal(prev => (prev * -1) + '')
    setPrevKey('toggleSign')
  }

  const handleSqrt = () => {
    // sqrt and inverse are handled the same way
  }
  
  const handlePercent = () => {

  }

  const handleInverse = () => {

  }

  const handleDelete = () => {
    if (prevKey !== '=' && lowerVal !== '0') {
      setLowerVal(prev => prev.length === 1 ? '0' : prev.slice(0, -1))

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
        setLowerVal(prev => prev + '.')
      
      setPrevKey('.')
    }
  }

  const handleDigit = ({target}) => {
    const newDigit = target.name;

    if (!['=', 'MR', 'MS'].includes(prevKey) && !operRegEx.test(prevKey)) {
      // overwrite 0. otherwise, append
      setLowerVal(prev => prev === '0' ? newDigit : prev + newDigit)
    } else {
      // next input overwrites lowerVal
      if (prevKey === '=')
        setExpression([])
      setLowerVal(newDigit)
    }

    setPrevKey(newDigit)
  }

  const handleOperator = ({target}) => {
    const newOperator = target.name
    
    if (operRegEx.test(prevKey)) {
      // replace operator
      setExpression(prev => [...prev.slice(0,-1), newOperator])
    } else if (['.', 'CE', 'toggleSign', 'MR'].includes(prevKey)) {
      let newLowerVal = lowerVal
      let newExpression

      // remove dot
      if (lowerVal.slice(-1)[0] === '.')
        newLowerVal = lowerVal.slice(0,-1)

      if (operRegEx.test(expression.slice(-1))) {
        newExpression = [...expression, newLowerVal]
      } else {
        newExpression = [newLowerVal]
      }

      setExpression([...newExpression, newOperator])
      setLowerVal(myEval(newExpression))
    } else if (prevKey === '=') {
      // append to existing expression
      const newResult = myEval(expression)

      setExpression([newResult, newOperator])
      setLowerVal(newResult)
    } else {
      // evaluate and display current expression with new operator
      const newExpression = [...expression, lowerVal]

      setExpression([...newExpression, newOperator])
      setLowerVal(myEval(newExpression))
    }

    setPrevKey(newOperator)
  }

  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => {
    // console.log('expression: ' + expression)
    // console.log('prevKey: ' + prevKey)
    let newExpression

    if (!operRegEx.test(expression)) {
      if (prevKey !== '.') {
        setExpression([lowerVal])
      } else {
        // remove dot from expression and lowerVal
        setExpression([lowerVal.slice(0,-1)])
        setLowerVal(prev => prev.slice(0,-1))
      }
    } else if (['.', 'CE', 'toggleSign', 'MR'].includes(prevKey)) {
      let newLowerVal = lowerVal
      let newExpression

      // remove dot
      if (lowerVal.slice(-1)[0] === '.')
        newLowerVal = lowerVal.slice(0,-1)

      // was last item in expression was an operator?
      if (operRegEx.test(expression.slice(-1))) {
        newExpression = [...expression, newLowerVal]
      } else {
        // use last operator and operand on curr lowerVal
        const [lastOperator, lastOperand] = expression.slice(-2)

        newExpression = [newLowerVal, lastOperator, lastOperand]
      } 

      setExpression(newExpression)
      setLowerVal(myEval(newExpression))
    } else if (prevKey === '=') {
      // repeat last operator and operand
      const [lastOperator, lastOperand] = expression.slice(-2)
      const newResult = myEval([...expression, lastOperator, lastOperand])

      setExpression([lowerVal, lastOperator, lastOperand])
      setLowerVal(newResult)
    } else { // just append
      // console.log(`${history}`)
      setHistory([...history , [[...expression, lowerVal].join(''), myEval([...expression, lowerVal])] ])
      setExpression([...expression, lowerVal])
      setLowerVal(myEval([...expression, lowerVal]))
    }

    // setHistory(history.push({}))
    setPrevKey('=')
  }

  return (
    <main className="calculator" >
      <div className="menu"><span>V</span>iew&nbsp;&nbsp; <span>E</span>dit&nbsp;&nbsp; <span>H</span>elp</div>
      <div className="display">
        <div className="outer-div">
          {history.slice(-5).map((i, index) => {
            return <div key={index} className="history">{i[0]}</div>
          })}
        </div>
        
        <CalcDisplay upperVal={expression} lowerVal={lowerVal} />
        <div className="error">{errorMsg}</div>
        <div className="m-icon">{mem !== '0' ? 'M' : ''}</div>
      </div>
      <div className="keyboard">
      </div>
      <div className="keyboard-bot">
        <CalcKey name="MC" onClick={MClear}/><CalcKey name="MR" onClick={MRetrieve}/><CalcKey name="MS" onClick={MStore}/><CalcKey name="M+" onClick={MAdd}/><CalcKey name="M-" onClick={MSubtract}/><br/>
        <CalcKey name="Del" onClick={handleDelete}/><CalcKey name="CE" onClick={handleClearEntry}/><CalcKey name="C" onClick={handleClear}/><CalcKey name="±" onClick={toggleSign}/><CalcKey name="√" onClick={handleSqrt}/><br/>
        <CalcKey name="7" onClick={handleDigit}/><CalcKey name="8" onClick={handleDigit}/><CalcKey name="9" onClick={handleDigit}/><CalcKey name="/" onClick={handleOperator}/><CalcKey name="%" onClick={handlePercent} /><br/>
        <CalcKey name="4" onClick={handleDigit}/><CalcKey name="5" onClick={handleDigit}/><CalcKey name="6" onClick={handleDigit}/><CalcKey name="*" onClick={handleOperator}/><CalcKey name="1/x" onClick={handleInverse} /><br/>
        <CalcKey name="1" onClick={handleDigit}/><CalcKey name="2" onClick={handleDigit}/><CalcKey name="3" onClick={handleDigit}/><CalcKey name="-" onClick={handleOperator}/><br/>
        <CalcKey name="0" onClick={handleDigit}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator}/><CalcKey name="=" onClick={handleEqual}/>
      </div>
    </main>
  );
}
