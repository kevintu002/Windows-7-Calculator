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
  const [history, setHistory] = useState(Array(5).fill([' ', ' ']))
  const [cursor, setCursor] = useState(null)
  const operRegEx = new RegExp('\\+|-|\\*|\\/')

  useEffect(() => {
    if (lowerVal === 'Infinity') {
      setExpression([])
      setLowerVal('0')
      setPrevKey(null)
      setErrorMsg('Cannot divide by zero')
    }
  }, [lowerVal])

  useEffect(() => {
    // document.addEventListener('keypress', document.getElementById('keypress').click())
  }, [])

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


    setPrevKey()
  }

  const handleInverse = () => {

    setPrevKey('inverse')
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

    if (!['=', 'MR', 'MS', 'hist'].includes(prevKey) && !operRegEx.test(prevKey)) {
      // overwrite 0. otherwise, append
      setLowerVal(prev => prev === '0' ? newDigit : prev + newDigit)
    } else {
      // next input overwrites lowerVal
      if (prevKey === '=' || (prevKey === 'hist' && lowerVal === '0'))
        setExpression([])
      
      setLowerVal(newDigit)
    }

    setPrevKey(newDigit)
  }

  const handleOperator = ({target}) => {
    const newOperator = target.name
    let newExpression = expression
    let newLowerVal = lowerVal
    
    if (operRegEx.test(prevKey)) {
      // replace operator
      newExpression = [...expression.slice(0,-1), newOperator]
    } else if (['.', 'CE', 'toggleSign', 'MR', 'hist'].includes(prevKey)) {
      // existing expression with last item as operator will append the lower value and the newOperator
      // otherwise replace the expression with the evaluation and the newOperator
      // remove dot
      if (lowerVal.slice(-1)[0] === '.')
        newLowerVal = lowerVal.slice(0,-1)

      if (operRegEx.test(expression.slice(-1))) {
        newExpression = [...expression, newLowerVal]
      } else {
        newExpression = [newLowerVal]
      }

      newLowerVal = myEval(newExpression)
      newExpression = newExpression.concat(newOperator)
    } else if (prevKey === '=') {
      // append to existing expression
      newLowerVal = myEval(expression)
      newExpression = [newLowerVal, newOperator]
    } else {
      // evaluate and display current expression with new operator
      const oldExpression = [...expression, lowerVal]

      newLowerVal = myEval(oldExpression)
      newExpression = oldExpression.concat(newOperator)
    }

    // state updates
    setExpression(newExpression)
    setLowerVal(newLowerVal)
    setPrevKey(newOperator)
  }

  const myEval = (stringArr) => {
    return evaluate(stringArr.join('')) + ''
  }

  const handleEqual = () => {
    // console.log('expression: ' + expression)
    // console.log('prevKey: ' + prevKey)
    let newExpression = expression
    let newLowerVal = lowerVal

    if (!operRegEx.test(expression)) {
      if (prevKey !== '.') {
        newExpression = [lowerVal]
      } else {
        // remove dot from expression and lowerVal
        newExpression = [lowerVal.slice(0,-1)]
        newLowerVal = lowerVal.slice(0,-1)
      }
    } else if (['.', 'CE', 'toggleSign', 'MR', 'hist'].includes(prevKey)) {
      // existing expression with last item as operator will append the lowerVal to expression 
      // otherwise repeat expression on the lowerVal
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

      newLowerVal = myEval(newExpression)
    } else if (prevKey === '=') {
      // repeat last operator and operand
      const [lastOperator, lastOperand] = expression.slice(-2)

      newExpression = [lowerVal, lastOperator, lastOperand]
      newLowerVal = myEval([...expression, lastOperator, lastOperand])
    } else {
      // just append
      newExpression = [...expression, lowerVal]
      newLowerVal = myEval(newExpression)
    }

    // state updates
    if (cursor !== null)
      setHistoryBGColorOf(cursor, 'transparent')
    
    // edit history directly until length is >5
    let allEmptyHistories = history.filter(i => i[0] === ' ' && i[1] === ' ')
    let newHistory = history
    if (allEmptyHistories.length !== 0) {
      newHistory[5 - allEmptyHistories.length] = [newExpression.join(''), newLowerVal]
      setCursor(5 - allEmptyHistories.length)
      setHistoryBGColorOf(5 - allEmptyHistories.length, 'lightblue')
    } else {
      newHistory = newHistory.concat([[newExpression.join(''), newLowerVal]])
      setCursor(4)
      setHistoryBGColorOf(4, 'lightblue')
    }
    setHistory(newHistory)
    setExpression(newExpression)
    setLowerVal(newLowerVal)
    setPrevKey('=')
  }

  const setHistoryBGColorOf = (index, color) => {
    return document.getElementsByClassName('history')[index].style.backgroundColor = color
  }

  const handleHistory = (val, index) => () => {
    if (val !== ' ') {
      setLowerVal(val)
      setPrevKey('hist')
      if (cursor !== null) {
        setHistoryBGColorOf(cursor, 'transparent')
        setHistoryBGColorOf(index, 'rgb(102, 132, 146)')
        setCursor(index)
      }
    }
  }

  const handleKeyPress = ({target}) => {

  }

  return (
    <main className="calculator" >
      <div className="menu"><span>V</span>iew&nbsp;&nbsp; <span>E</span>dit&nbsp;&nbsp; <span>H</span>elp</div>

      <div className="display">
        <div className="outer-div">
          {history.slice(-5).map((i, index) =>
            <div 
              key={index}
              className="history" 
              onClick={handleHistory(i[1], index)}
              style={{
                // all border-bottom should be 1px dotted except for the last one
                borderBottom: i[1] !== ' ' && i[0] !== ' ' && index !== 4 ? '1px dotted black': '1px solid transparent',
                color: cursor === index ? 'white' : 'black'
              }}
            >{i[0]}</div>
          )}
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
        <CalcKey name="1" onClick={handleDigit} onKeyPress={handleKeyPress}/><CalcKey name="2" onClick={handleDigit}/><CalcKey name="3" onClick={handleDigit}/><CalcKey name="-" onClick={handleOperator}/><br/>
        <CalcKey name="0" onClick={handleDigit}/><CalcKey name="." onClick={handleDot}/><CalcKey name="+" onClick={handleOperator}/><CalcKey name="=" onClick={handleEqual}/>
      </div>
    </main>
  );
}
